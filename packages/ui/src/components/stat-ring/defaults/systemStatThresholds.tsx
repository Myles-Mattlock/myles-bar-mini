import { Threshold } from '@myles-zebar/config';

export const systemStatThresholds: Threshold[] = [
  { id: 'stat-1', min: 0, max: 70, labelColor: '--text' },
  { id: 'stat-2', min: 70, max: 85, labelColor: '--warning' },
  { id: 'stat-3', min: 85, max: 100, labelColor: '--danger' },
];
