import * as zebar from 'zebar';
import { AllWidgetSettings, RootConfig } from './types';
import { defaultConfig } from './defaults/default-config';
import { deepMerge } from './utils/deepMerge';
import { logger } from './utils/logger';

const STORAGE_KEY = 'myles-zebar-config';

let cachedConfig: RootConfig | null = null;

import { generateId } from './utils/generateId';

function loadConfig(forceReload = false): RootConfig {
  if (cachedConfig && !forceReload) {
    logger.log('Returning cached config');
    return cachedConfig;
  }

  logger.log(forceReload ? 'Force reloading config' : 'Loading config');

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    logger.log('No config found in storage, using default config');
    cachedConfig = defaultConfig;
    saveConfig(cachedConfig);
    return cachedConfig;
  }

  try {
    const parsed = JSON.parse(stored) as RootConfig;
    logger.log('Successfully parsed config from storage');

    // Ensure all themes have an ID
    parsed.app.themes.forEach((theme) => {
      if (!theme.id) {
        theme.id = generateId();
        logger.log(`Generated new ID for theme: ${theme.name}`);
      }
    });

    // if (parsed.version < CURRENT_VERSION) parsed = migrate(parsed);

    cachedConfig = deepMerge(defaultConfig, parsed);

    const mainWidget = cachedConfig.widgets.main;
    const batteryThresholds = mainWidget?.batteryThresholds;
    const hasLegacyBatteryDefaults =
      batteryThresholds?.some(
        (threshold) =>
          threshold.id === 'battery-6' ||
          (threshold.id === 'battery-2' && threshold.max === 30) ||
          (threshold.id === 'battery-3' && threshold.min === 31) ||
          (threshold.id === 'battery-4' && threshold.min === 80)
      ) ?? false;

    if (mainWidget && hasLegacyBatteryDefaults) {
      mainWidget.batteryThresholds =
        defaultConfig.widgets.main?.batteryThresholds ?? [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedConfig));
      logger.log('Migrated legacy battery thresholds to current defaults');
    }

    logger.log('Successfully merged default config with user config');

    return cachedConfig;
  } catch (e) {
    logger.error('Failed to parse config, using default config', e);
    cachedConfig = defaultConfig;
    saveConfig(cachedConfig);
    return cachedConfig;
  }
}

function saveConfig(config: RootConfig) {
  cachedConfig = config;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  logger.log('Successfully saved config to storage');
  zebar.currentWidget().tauriWindow.emit('config-changed');
}

function updateAppSetting<K extends keyof RootConfig['app']>(
  key: K,
  value: RootConfig['app'][K]
) {
  const config = loadConfig();
  config.app[key] = value;
  saveConfig(config);
}

function updateWidgetSetting(
  widgetName: keyof AllWidgetSettings,
  key: string,
  value: unknown
) {
  const config = loadConfig();
  const widgets = config.widgets as Record<string, unknown>;
  if (!widgets[widgetName]) {
    widgets[widgetName] = {};
  }
  (widgets[widgetName] as Record<string, unknown>)[key] = value;
  saveConfig(config);
}

function getAppSetting<K extends keyof RootConfig['app']>(
  key: K
): RootConfig['app'][K] {
  return loadConfig().app[key];
}

function getWidgetSetting(widgetName: string, key: string): unknown {
  const widgets = loadConfig().widgets as Record<string, unknown>;
  return (widgets[widgetName] as Record<string, unknown>)?.[key];
}

export const configService = {
  loadConfig,
  saveConfig,
  updateAppSetting,
  updateWidgetSetting,
  getAppSetting,
  getWidgetSetting,
};
