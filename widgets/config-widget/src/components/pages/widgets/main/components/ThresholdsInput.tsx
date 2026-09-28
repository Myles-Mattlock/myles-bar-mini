import {
  LabelColor,
  useWidgetSetting,
  Threshold,
} from '@myles-zebar/config';
import {
  FieldTitle,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@myles-zebar/ui';
import { NumberInput } from '../../../../NumberInput';

interface ThresholdsInputProps {
  thresholds?: Threshold[];
  onChange?: (thresholds: Threshold[]) => void;
  settingKey?:
    | 'weatherThresholds'
    | 'systemStatThresholds'
    | 'batteryThresholds';
}

export function ThresholdsInput({
  thresholds: thresholdsProp,
  onChange: onChangeProp,
  settingKey = 'weatherThresholds',
}: ThresholdsInputProps = {}) {
  const [thresholdsInternal, setThresholdsInternal] = useWidgetSetting(
    'main',
    settingKey
  );

  const thresholds = thresholdsProp ?? thresholdsInternal;
  const setThresholds = onChangeProp ?? setThresholdsInternal;

  return (
    <div className="w-full space-y-3">
      {(thresholds ?? []).map((t: Threshold) => (
        <div className="flex items-center gap-4 w-full" key={t.id}>
          <ThresholdInput
            threshold={t}
            minOrMax="min"
            thresholds={thresholds}
            setThresholds={setThresholds}
          />
          <ThresholdInput
            threshold={t}
            minOrMax="max"
            thresholds={thresholds}
            setThresholds={setThresholds}
          />
          <ThresholdColorSelect
            threshold={t}
            thresholds={thresholds}
            setThresholds={setThresholds}
          />
        </div>
      ))}
    </div>
  );
}

type ThresholdInputProps = {
  threshold: Threshold;
  minOrMax: 'min' | 'max';
  thresholds: Threshold[];
  setThresholds: (thresholds: Threshold[]) => void;
};

function ThresholdInput({
  threshold,
  minOrMax,
  thresholds,
  setThresholds,
}: ThresholdInputProps) {
  const handleChange = (newValue: number) => {
    const newThresholds = thresholds.map((t) =>
      t.id === threshold.id ? { ...t, [minOrMax]: newValue } : t
    );
    setThresholds(newThresholds);
  };

  const title = minOrMax.charAt(0).toUpperCase() + minOrMax.slice(1);

  return (
    <FormField className="w-full">
      <FieldTitle>{title}</FieldTitle>
      <NumberInput value={threshold[minOrMax]} onChange={handleChange} />
    </FormField>
  );
}

type ThresholdColorSelectProps = {
  threshold: Threshold;
  thresholds: Threshold[];
  setThresholds: (thresholds: Threshold[]) => void;
};

function ThresholdColorSelect({
  threshold,
  thresholds,
  setThresholds,
}: ThresholdColorSelectProps) {
  const handleColorChange = (newValue: unknown) => {
    const newThresholds = thresholds.map((t) =>
      t.id === threshold.id ? { ...t, labelColor: newValue as LabelColor } : t
    );
    setThresholds(newThresholds);
  };

  return (
    <FormField className="w-full">
      <FieldTitle>Color</FieldTitle>
      <Select onValueChange={handleColorChange} value={threshold.labelColor}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="--danger">Danger</SelectItem>
          <SelectItem value="--warning">Warning</SelectItem>
          <SelectItem value="--text">Text</SelectItem>
          <SelectItem value="--success">Success</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  );
}

export default ThresholdsInput;
