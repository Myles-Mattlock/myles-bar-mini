import { Chip } from '@myles-zebar/ui';
import { Zap } from 'lucide-react';
import { useState } from 'react';
import Slider from '../volume/components/Slider';

const getEnergyColor = (value: number) => {
  if (value <= 30) return 'var(--danger)';
  if (value <= 65) return 'var(--warning)';
  return 'var(--success)';
};

export function EnergyScore() {
  const [energy, setEnergy] = useState(50);
  const color = getEnergyColor(energy);

  return (
    <Chip as="div" className="gap-1.5" title="Myles Energy Score">
      <Zap className="h-3.5 w-3.5" style={{ color }} strokeWidth={3} />
      <span className="text-xs text-icon">Myles Energy</span>
      <Slider value={energy} setValue={setEnergy} rangeColor={color} />
      <span className="text-xs tabular-nums" style={{ color }}>
        {energy}%
      </span>
    </Chip>
  );
}