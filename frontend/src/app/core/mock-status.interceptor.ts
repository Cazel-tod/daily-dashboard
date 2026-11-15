import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCK_STATUS = {
  hostname: 'templier.local',
  bootTime: '2026-11-10T08:00:00Z',
  uptimeSeconds: 432_000,
  cpu: { temperatureC: 52.3, loadAverage: [0.42, 0.51, 0.63] as [number, number, number] },
  memory: { totalMB: 16384, usedMB: 9830, availableMB: 6554, usedPercent: 60 },
  swap: { totalMB: 2048, usedMB: 128, usedPercent: 6 },
  disk: { totalGB: 512, usedGB: 338, freeGB: 174, usedPercent: 66 },
  network: { interface: 'eth0', rxBytes: 12_400_000_000, txBytes: 3_100_000_000 },
};

// Dev local uniquement (branché via isDevMode() dans app.config.ts) : le vrai backend lit templier, pas de sens à le lancer ici.
export const mockStatusInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/status') {
    return of(new HttpResponse({ status: 200, body: MOCK_STATUS })).pipe(delay(300));
  }
  return next(req);
};
