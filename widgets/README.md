# Creating a New Widget

This document outlines the process of creating a new widget for myles-zebar using the provided `example-widget` boilerplate.

## 1. Scaffolding a New Widget

To create a new widget, follow these steps:

1.  **Copy the Boilerplate**: Duplicate the `example-widget` directory and rename it to match your new widget's name (e.g., `my-new-widget`).
2.  **Update `package.json`**: Open the `package.json` file in your new widget's directory and change the `name` field to reflect the new widget's name (e.g., `@myles-zebar/my-new-widget`).
3.  **Install Dependencies**: Run `pnpm install` from the root of the monorepo. This will link the new widget as a workspace and install its dependencies.

## 2. Shared Packages

All widgets in this monorepo have access to a set of shared packages that provide common functionality, such as configuration management and a component library.

### `@myles-zebar/config`

This package is responsible for managing the state of all widgets. It ensures that settings are persisted and can be accessed globally.

#### `ConfigProvider`

The `ConfigProvider` is a React context provider that should wrap the root of your widget's component tree. It is already included in the `main.tsx` of the `example-widget` boilerplate.

```tsx
// src/main.tsx
import { ConfigProvider } from '@myles-zebar/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
```

This provider is essential for the configuration hooks to function correctly.

#### Global Settings (`useAppSetting`)

The `useAppSetting` hook allows you to access and modify app-level settings that are shared across all widgets. These settings are defined in `packages/config/src/zod-types.ts` under `appSettingsSchema`.

**Example: Accessing the `radius` setting**

```tsx
import { useAppSetting } from '@myles-zebar/config';

function MyComponent() {
  const [radius, setRadius] = useAppSetting('radius');

  // ...
}
```

#### Widget-Specific Settings (`useWidgetSetting`)

The `useWidgetSetting` hook is used for settings that are specific to a single widget. It takes the widget's name as the first argument and the setting name as the second.

When adding a new widget with settings, you need to update **three files**:

1. **Define the schema** in `packages/config/src/zod-types.ts`:

   ```ts
   // Add a new schema
   export const myNewWidgetSettingsSchema = z.object({
     mySetting: z.string().default('default-value'),
   });

   // Add to AllWidgetSettingsSchema
   export const AllWidgetSettingsSchema = z.object({
     main: MainWidgetSettingsSchema,
     'script-launcher': ScriptLauncherWidgetSettingsSchema,
     'config-widget': z.object({}),
     'my-new-widget': myNewWidgetSettingsSchema, // Add this
   });
   ```

2. **Add to type map** in `packages/config/src/types.ts`:

   ```ts
   export type WidgetSettingsMap = {
     main: MainWidgetSettings;
     'script-launcher': ScriptLauncherWidgetSettings;
     'config-widget': Record<string, unknown>;
     'my-new-widget': z.infer<typeof myNewWidgetSettingsSchema>; // Add this
   };
   ```

3. **Add defaults** in `packages/config/src/defaults/default-config.ts`:

   ```ts
   widgets: {
     main: { /* ... */ },
     'script-launcher': { /* ... */ },
     'my-new-widget': {  // Add this
       mySetting: 'default-value',
     },
   },
   ```

4. **Use the setting in your widget**:

   ```tsx
   import { useWidgetSetting } from '@myles-zebar/config';

   function MyWidgetComponent() {
     const [mySetting, setMySetting] = useWidgetSetting(
       'my-new-widget',
       'mySetting'
     );

     // ...
   }
   ```

### `@myles-zebar/ui`

This package contains a library of shared React components that can be used across all widgets to maintain a consistent look and feel.

To use a component from the UI library, simply import it:

```tsx
import { Button, Card } from '@myles-zebar/ui';

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

The UI components are styled using Tailwind CSS, and the theme is managed by the `@myles-zebar/tailwind` package, which is also shared across all widgets. This ensures that all widgets will automatically adopt the currently active theme.

### `@myles-zebar/tailwind`

This package provides the shared Tailwind CSS configuration, including the design system (colors, spacing, etc.) and theme variables. Your widget's `tailwind.config.ts` should extend this shared configuration.

```ts
// widgets/my-new-widget/tailwind.config.ts
import type { Config } from 'tailwindcss';
import sharedConfig from '@myles-zebar/tailwind';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: ['./src/**/*.tsx', '../../packages/ui/src/**/*.tsx'],
  presets: [sharedConfig],
};

export default config;
```

## 3. Interacting with the Zebar Backend

The `zebar` package provides a set of functions for interacting with the underlying Zebar backend. This allows you to access system information, control windows, and more.

**Example: Creating a provider group**

```tsx
import * as zebar from 'zebar';

const providers = zebar.createProviderGroup({
  cpu: { type: 'cpu' },
  memory: { type: 'memory' },
});

function MyWidget() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  // ...
}
```
