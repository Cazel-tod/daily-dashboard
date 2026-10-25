<?php

namespace App\Service;

class SystemStatusService
{
    public function getStatus(): array
    {
        return [
            'hostname' => gethostname(),
            'bootTime' => $this->getBootTime()?->format(\DateTimeInterface::ATOM),
            'uptimeSeconds' => $this->getUptimeSeconds(),
            'cpu' => [
                'temperatureC' => $this->getCpuTemperature(),
                'loadAverage' => function_exists('sys_getloadavg') ? sys_getloadavg() : null,
            ],
            'memory' => $this->getMemory(),
            'swap' => $this->getSwap(),
            'disk' => $this->getDisk(),
            'network' => $this->getNetwork(),
        ];
    }

    private function getUptimeSeconds(): ?float
    {
        $content = @file_get_contents('/proc/uptime');
        if ($content === false) {
            return null;
        }

        return (float) explode(' ', trim($content))[0];
    }

    private function getBootTime(): ?\DateTimeImmutable
    {
        $uptime = $this->getUptimeSeconds();
        if ($uptime === null) {
            return null;
        }

        return (new \DateTimeImmutable())->modify(sprintf('-%d seconds', (int) $uptime));
    }

    private function getCpuTemperature(): ?float
    {
        $content = @file_get_contents('/sys/class/thermal/thermal_zone0/temp');
        if ($content === false) {
            return null;
        }

        return round(((int) trim($content)) / 1000, 1);
    }

    private function parseMeminfo(): array
    {
        $content = @file_get_contents('/proc/meminfo');
        if ($content === false) {
            return [];
        }

        $values = [];
        foreach (explode("\n", $content) as $line) {
            if (preg_match('/^(\w+):\s+(\d+)/', $line, $matches)) {
                $values[$matches[1]] = (int) $matches[2]; // kB
            }
        }

        return $values;
    }

    private function getMemory(): array
    {
        $meminfo = $this->parseMeminfo();
        $totalKb = $meminfo['MemTotal'] ?? 0;
        $availableKb = $meminfo['MemAvailable'] ?? 0;
        $usedKb = max(0, $totalKb - $availableKb);

        return [
            'totalMB' => round($totalKb / 1024, 1),
            'usedMB' => round($usedKb / 1024, 1),
            'availableMB' => round($availableKb / 1024, 1),
            'usedPercent' => $totalKb > 0 ? round($usedKb / $totalKb * 100, 1) : null,
        ];
    }

    private function getSwap(): array
    {
        $meminfo = $this->parseMeminfo();
        $totalKb = $meminfo['SwapTotal'] ?? 0;
        $freeKb = $meminfo['SwapFree'] ?? 0;
        $usedKb = max(0, $totalKb - $freeKb);

        return [
            'totalMB' => round($totalKb / 1024, 1),
            'usedMB' => round($usedKb / 1024, 1),
            'usedPercent' => $totalKb > 0 ? round($usedKb / $totalKb * 100, 1) : null,
        ];
    }

    private function getDisk(): array
    {
        $total = @disk_total_space('/');
        $free = @disk_free_space('/');

        if ($total === false || $free === false) {
            return [];
        }

        $used = $total - $free;

        return [
            'totalGB' => round($total / 1024 ** 3, 1),
            'usedGB' => round($used / 1024 ** 3, 1),
            'freeGB' => round($free / 1024 ** 3, 1),
            'usedPercent' => round($used / $total * 100, 1),
        ];
    }

    private function getNetwork(): ?array
    {
        $content = @file_get_contents('/proc/net/dev');
        if ($content === false) {
            return null;
        }

        foreach (explode("\n", $content) as $line) {
            if (!str_contains($line, ':')) {
                continue;
            }

            [$name, $data] = explode(':', $line, 2);
            $name = trim($name);

            if ($name === 'lo' || !preg_match('/^(eth|wlan|en|wl)/', $name)) {
                continue;
            }

            $fields = preg_split('/\s+/', trim($data));

            return [
                'interface' => $name,
                'rxBytes' => (int) $fields[0],
                'txBytes' => (int) $fields[8],
            ];
        }

        return null;
    }
}
