import { cn } from '../../utils/cn';
import Ring from './components/Ring';
import { systemStatThresholds } from './defaults/systemStatThresholds';
import { Threshold } from '@myles-zebar/config';

interface StatRingProps {
  Icon: React.ReactNode;
  stat: string;
  threshold?: Threshold[];
}

export function StatRing({
  Icon,
  stat,
  threshold = systemStatThresholds,
}: StatRingProps) {
  function getNumbersFromString(str: string): number {
    const match = str.match(/-?\d+/g);
    if (match && match.length > 0) {
      const num = Number(match[0]);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  }

  function getThresholdColor(value: number) {
    const range = threshold.find((r) => value >= r.min && value <= r.max);
    return range ? range.labelColor : '--text';
  }

  const statAsInt = getNumbersFromString(stat);
  const thresholdColor = getThresholdColor(statAsInt);

  const colorClassMap: Record<string, { text: string; stroke: string }> = {
    '--text': { text: 'text-text', stroke: 'stroke-success' },
    '--warning': { text: 'text-warning', stroke: 'stroke-warning' },
    '--danger': { text: 'text-danger', stroke: 'stroke-danger' },
  };

  const colors = colorClassMap[thresholdColor] || colorClassMap['--text'];

  if (!colors) {
    return null;
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-1.5', colors.text)}
    >
      {Icon}
      <Ring
        percentage={statAsInt}
        className="h-3.5 w-3.5"
        strokeColor={cn(colors.stroke)}
      />
    </div>
  );
}
