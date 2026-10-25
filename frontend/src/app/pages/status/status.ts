import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface SystemStatus {
  hostname: string;
  bootTime: string | null;
  uptimeSeconds: number | null;
  cpu: {
    temperatureC: number | null;
    loadAverage: [number, number, number] | null;
  };
  memory: {
    totalMB: number;
    usedMB: number;
    availableMB: number;
    usedPercent: number | null;
  };
  swap: {
    totalMB: number;
    usedMB: number;
    usedPercent: number | null;
  };
  disk: {
    totalGB: number;
    usedGB: number;
    freeGB: number;
    usedPercent: number;
  };
  network: {
    interface: string;
    rxBytes: number;
    txBytes: number;
  } | null;
}

@Component({
  imports: [DatePipe],
  selector: 'app-status',
  styleUrl: './status.scss',
  templateUrl: './status.html',
})
export class Status implements OnInit {
  readonly status = signal<SystemStatus | null>(null);
  readonly error = signal<string | null>(null);
  readonly loading = signal(true);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatus();
  }

  fetchStatus(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<SystemStatus>('/api/status').subscribe({
      next: (data) => {
        this.status.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Impossible de joindre Protos.");
        this.loading.set(false);
      },
    });
  }

  formatUptime(seconds: number | null): string {
    if (seconds === null) {
      return '—';
    }

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}j ${hours}h ${minutes}min`;
  }

  formatBytes(bytes: number): string {
    const gb = bytes / 1024 ** 3;
    if (gb >= 1) {
      return `${gb.toFixed(2)} Go`;
    }
    return `${(bytes / 1024 ** 2).toFixed(1)} Mo`;
  }
}
