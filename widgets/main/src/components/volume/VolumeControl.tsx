import { Chip } from '@myles-zebar/ui';
import { Volume, Volume1, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { AudioOutput } from 'zebar';
import Slider from './components/Slider';

export default function VolumeControl({
  iconClassnames,
  audio,
}: {
  iconClassnames: string;
  audio: AudioOutput | null;
}) {
  const [preMuteVolume, setPreMuteVolume] = useState(50);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  if (!audio) return;

  const { setVolume, defaultPlaybackDevice: playbackDevice } = audio;

  if (!playbackDevice) return;

  const handleWheel = (e: React.WheelEvent<HTMLButtonElement>) => {
    if (!playbackDevice) return;

    const delta = e.deltaY > 0 ? -3 : 3;
    setVolume(Math.min(Math.max(playbackDevice.volume + delta, 0), 100));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!playbackDevice) return;

    if (e.shiftKey) {
      if (playbackDevice.volume > 0) {
        setPreMuteVolume(playbackDevice.volume);
        setVolume(0);
      } else {
        setVolume(preMuteVolume);
      }
      return;
    }

    setIsSliderOpen((isOpen) => !isOpen);
  };

  const handleDoubleClick = () => {
    if (!playbackDevice) return;
    setVolume(100);
  };

  const renderIcon = () => {
    if (playbackDevice.volume === 0) {
      return <Volume className={iconClassnames} strokeWidth={3} />;
    } else if (playbackDevice.volume > 0 && playbackDevice.volume < 60) {
      return <Volume1 className={iconClassnames} strokeWidth={3} />;
    } else {
      return <Volume2 className={iconClassnames} strokeWidth={3} />;
    }
  };

  return (
    <Chip
      as="button"
      onClick={handleClick}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      className="outline-none"
    >
      <div className="flex items-center">
        <div>{renderIcon()}</div>

        <div
          className={`ml-1.5 overflow-hidden transition-[width] duration-200 ${
            isSliderOpen ? 'w-[8rem]' : 'w-0'
          }`}
        >
          <Slider value={playbackDevice.volume} setValue={setVolume} />
        </div>
        <span className="ml-1 text-xs tabular-nums text-icon">
          {Math.round(playbackDevice.volume)}%
        </span>
      </div>
    </Chip>
  );
}
