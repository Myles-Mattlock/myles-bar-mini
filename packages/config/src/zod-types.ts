import { z } from 'zod';

const SystrayIconSchema = z.string();

export const ThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  colors: z.record(z.string(), z.string()),
});

export const LabelColorSchema = z.union([
  z.literal('--danger'),
  z.literal('--warning'),
  z.literal('--text'),
  z.literal('--success'),
]);

export const BaseWidgetSettingsSchema = z.object({});

export const ThresholdSchema = z.object({
  id: z.string(),
  min: z.number(),
  max: z.number(),
  labelColor: LabelColorSchema,
});

export const AppSettingsSchema = z.object({
  useAutoTiling: z.boolean(),
  zebarWebsocketUri: z.string(),
  themes: z.array(ThemeSchema),
  currentThemeId: z.string(),
  radius: z.string(),
  windowEffect: z.string().default('acrylic'),
});

export const ProviderSettingsSchema = z.object({
  cpu: z.boolean().default(true),
  memory: z.boolean().default(true),
  weather: z.boolean().default(true),
  battery: z.boolean().default(true),
});

export const MainWidgetSettingsSchema = BaseWidgetSettingsSchema.extend({
  flowLauncherPath: z.string().default(''),
  mediaMaxWidth: z.string().default('400'),
  weatherThresholds: z.array(ThresholdSchema).default([]),
  weatherUnit: z
    .union([z.literal('celsius'), z.literal('fahrenheit')])
    .default('celsius'),
  pinnedSystrayIcons: z.array(SystrayIconSchema).default([]),
  marginX: z.number().default(0),
  paddingLeft: z.number().default(4),
  paddingRight: z.number().default(4),
  roundedCorners: z.boolean().default(false),
  barRadius: z.string().default('0.5rem'),
  dynamicWorkspaceIndicator: z.boolean().default(false),
  timeFormat: z.string().default('EEE d MMM t'),
  timeLocale: z.string().default('en-GB'),
  providers: ProviderSettingsSchema.default({
    cpu: true,
    memory: true,
    weather: true,
    battery: true,
  }),
  systemStatThresholds: z.array(ThresholdSchema).default([]),
  batteryThresholds: z.array(ThresholdSchema).default([]),
  useInlineStats: z.boolean().default(false),
});

export const AllWidgetSettingsSchema = z.object({
  main: MainWidgetSettingsSchema,
  'config-widget': z.object({}),
});

export const RootConfigSchema = z.object({
  version: z.number(),
  app: AppSettingsSchema,
  widgets: AllWidgetSettingsSchema.partial(),
});
