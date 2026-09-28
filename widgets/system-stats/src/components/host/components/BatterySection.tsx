import { Battery, Cable, Heart, PlugZap, RefreshCcw, Zap } from 'lucide-react';
import { BatteryOutput } from 'zebar';
import { formatMsToHumanDuration } from '@/utils/time';
import { Threshold, useWidgetSetting } from '@myles-zebar/config';

type BatteryProps = {
  battery: BatteryOutput;
  thresholds?: Threshold[];
};
export function BatterySection({ battery, thresholds }: BatteryProps) {
  const [configThresholds] = useWidgetSetting('main', 'batteryThresholds');
  const configuredThresholds = thresholds ?? configThresholds;
  const hasLegacyThresholds = configuredThresholds.some(
    (threshold) =>
      threshold.id === 'battery-6' ||
      (threshold.id === 'battery-2' && threshold.max === 30) ||
      (threshold.id === 'battery-3' && threshold.min === 31) ||
      (threshold.id === 'battery-4' && threshold.min === 80)
  );
  const batteryThresholds = hasLegacyThresholds
    ? [
        { id: 'battery-1', min: 0, max: 20, labelColor: '--danger' as const },
        {
          id: 'battery-2',
          min: 21,
          max: 74,
          labelColor: '--warning' as const,
        },
        {
          id: 'battery-3',
          min: 75,
          max: 80,
          labelColor: '--success' as const,
        },
        {
          id: 'battery-4',
          min: 81,
          max: 90,
          labelColor: '--warning' as const,
        },
        { id: 'battery-5', min: 91, max: 100, labelColor: '--danger' as const },
      ]
    : configuredThresholds;

  const timeTillFullOrEmpty = battery.isCharging
    ? battery.timeTillFull
    : battery.timeTillEmpty;
  const status = battery.isCharging ? 'until full' : 'until empty';
  const formatTimeTillFullOrEmpty = timeTillFullOrEmpty
    ? `${formatMsToHumanDuration(timeTillFullOrEmpty)} ${status}`
    : null;

  function getThresholdLabel(value: number) {
    if (!batteryThresholds) return '--text';
    const range = batteryThresholds.find(
      (r) => value >= r.min && value <= r.max
    );
    return range ? range.labelColor : '--text';
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {battery.isCharging ? (
              <Zap
                className="h-4 w-4 text-icon animate-pulse"
                strokeWidth={2.6}
              />
            ) : (
              <Battery className="h-4 w-4 text-icon" />
            )}
            <p
              className="text-text"
              style={{
                color: `var(${getThresholdLabel(battery.chargePercent)})`,
              }}
            >
              {battery.chargePercent}%
            </p>
          </div>
          {formatTimeTillFullOrEmpty && (
            <p>{`~ ${formatTimeTillFullOrEmpty}`}</p>
          )}
        </div>
        <div className="h-2 w-full bg-background border-border border overflow-clip rounded">
          <div
            title={`${battery.chargePercent}%`}
            className="h-full"
            style={{
              width: battery.chargePercent + '%',
              backgroundColor: `var(${getThresholdLabel(battery.chargePercent)})`,
            }}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-3">
        <IconSection title="Health Percentage">
          <IconContainer>
            <Heart className="h-4 w-4" strokeWidth={2.5} />
          </IconContainer>
          <p>{battery.healthPercent}%</p>
        </IconSection>
        <IconSection title="Cycle Count">
          <IconContainer>
            <RefreshCcw className="h-4 w-4" strokeWidth={2.5} />
          </IconContainer>
          <p>{battery.cycleCount}</p>
        </IconSection>
        <IconSection title="Voltage">
          <IconContainer>
            <Cable className="h-4 w-4" />
          </IconContainer>
          <p>{battery.powerConsumption}V</p>
        </IconSection>
        <IconSection title="Power Consumption">
          <IconContainer>
            <PlugZap className="h-4 w-4" />
          </IconContainer>
          <p>{battery.voltage}W</p>
        </IconSection>
      </div>
    </div>
  );
}

function IconContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-4 w-4 text-icon flex items-center justify-center">
      {children}
    </div>
  );
}

function IconSection({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-1 items-center justify-center hover:text-text transition-colors ease-in-out duration-200 cursor-default"
      title={title}
    >
      {children}
    </div>
  );
}

export default BatterySection;
