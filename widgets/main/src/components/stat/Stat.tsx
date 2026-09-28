import { Threshold } from '@myles-zebar/config';
import { StatRing } from '@myles-zebar/ui';
import { StatInline } from './components/StatInline';

interface BaseStatProps {
  Icon: React.ReactNode;
  stat: string;
}

type StatProps = BaseStatProps & {
  type: 'ring' | 'inline';
  threshold?: Threshold[];
};

export default function Stat(props: StatProps) {
  switch (props.type) {
    case 'ring':
      return (
        <StatRing
          Icon={props.Icon}
          stat={props.stat}
          threshold={props.threshold}
        />
      );
    case 'inline':
      return (
        <StatInline
          Icon={props.Icon}
          stat={props.stat}
          threshold={props.threshold}
        />
      );
    default:
      return null;
  }
}
