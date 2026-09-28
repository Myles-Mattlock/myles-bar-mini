import { logger } from '@myles-zebar/config/src/utils/logger';
import { Button } from '@myles-zebar/ui';
import { Power, Settings } from 'lucide-react';
import * as zebar from 'zebar';
import { cn } from '../../utils/cn';

export default function RightButtons() {
  return (
    <div className="flex items-center gap-2 h-full">
      <SettingsButton />
      <PowerOffButton />
    </div>
  );
}

function SettingsButton() {
  const handleOpenSettings = async () => {
    try {
      await zebar.startWidgetPreset('config-widget', 'default');
    } catch (error) {
      logger.error('Error opening config widget');
      logger.error(error);
    }
  };

  return (
    <Button
      size="icon-sm"
      onClick={handleOpenSettings}
      className="h-full"
      title="Open settings"
    >
      <Settings className="h-3.5 w-3.5" strokeWidth={2.5} />
    </Button>
  );
}

function PowerOffButton() {
  const handlePowerOff = async () => {
    await zebar
      .shellSpawn('powershell.exe', [
        '-Command',
        '(New-Object -ComObject Shell.Application).ShutdownWindows()',
      ])
      .then((shellProcess) => {
        logger.log('Opened Windows shutdown dialog');
        shellProcess.onStderr((line) => logger.log(line));
      })
      .catch((err) => {
        logger.error('Error opening Windows shutdown dialog');
        logger.error(err);
      });
  };

  return (
    <Button
      size="icon-sm"
      onClick={handlePowerOff}
      className={cn('h-full')}
    >
      <Power strokeWidth={3} className="text-danger" />
    </Button>
  );
}
