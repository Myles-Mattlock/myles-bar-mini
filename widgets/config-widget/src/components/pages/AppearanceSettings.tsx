import {
  FieldDescription,
  FieldInput,
  FieldTitle,
  FormField,
  PanelLayout,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@myles-zebar/ui';
import { useAppSetting, useWidgetSetting } from '@myles-zebar/config';
import PanelHeading from '../PanelHeading';
import { ThemeEditor } from '../theme/ThemeEditor';
import { Separator } from '../common/Separator';

function AppearanceSettings() {
  const [radius, setRadius] = useAppSetting('radius');
  const [windowEffect, setWindowEffect] = useAppSetting('windowEffect');
  const [roundedCorners, setRoundedCorners] = useWidgetSetting(
    'main',
    'roundedCorners'
  );
  const [barRadius, setBarRadius] = useWidgetSetting('main', 'barRadius');

  const radiusOptions = [
    { label: 'None', value: '0rem' },
    { label: 'Small', value: '0.25rem' },
    { label: 'Medium', value: '0.5rem' },
    { label: 'Large', value: '0.75rem' },
    { label: 'X-Large', value: '1rem' },
  ];

  const effectOptions = [
    { label: 'Acrylic', value: 'acrylic' },
    { label: 'Blur', value: 'blur' },
    { label: 'Mica', value: 'mica' },
    { label: 'None', value: 'none' },
  ];

  return (
    <PanelLayout title="Appearance">
      <div className="px-3 py-1 flex-grow flex flex-col">
        <PanelHeading
          title="Apperance"
          description="Customise your myles-zebar widgets to suit you."
        />
        <div className="h-full">
          <FormField>
            <FieldTitle>Border Radius</FieldTitle>
            <FieldInput>
              <Select
                onValueChange={(value) => setRadius(value as string)}
                defaultValue={radius}
                items={radiusOptions}
              >
                <SelectTrigger>
                  <SelectValue>
                    {(value: string) => {
                      const option = radiusOptions.find(
                        (opt) => opt.value === value
                      );
                      return option ? option.label : '';
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {radiusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldInput>
            <FieldDescription>
              Changes how "rounded" elements are.
            </FieldDescription>
          </FormField>
          <Separator />
          <FormField switch>
            <FieldTitle>Rounded Bar Corners</FieldTitle>
            <FieldInput>
              <Switch
                checked={roundedCorners}
                onCheckedChange={setRoundedCorners}
              />
            </FieldInput>
            <FieldDescription>
              Enable rounded corners on the main topbar without changing item
              corners.
            </FieldDescription>
          </FormField>
          <Separator />
          <FormField>
            <FieldTitle>Bar Border Radius</FieldTitle>
            <FieldInput>
              <Select
                onValueChange={(value) => setBarRadius(value as string)}
                defaultValue={barRadius}
                items={radiusOptions}
              >
                <SelectTrigger>
                  <SelectValue>
                    {(value: string) => {
                      const option = radiusOptions.find(
                        (opt) => opt.value === value
                      );
                      return option ? option.label : '';
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {radiusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldInput>
            <FieldDescription>
              Controls the main topbar corners independently from its items.
            </FieldDescription>
          </FormField>
          <Separator />
          <FormField>
            <FieldTitle>Window Effect</FieldTitle>
            <FieldInput>
              <Select
                onValueChange={(value) => setWindowEffect(value as string)}
                defaultValue={windowEffect}
                items={effectOptions}
              >
                <SelectTrigger>
                  <SelectValue>
                    {(value: string) => {
                      const option = effectOptions.find(
                        (opt) => opt.value === value
                      );
                      return option ? option.label : '';
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {effectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldInput>
            <FieldDescription>
              Sets the window transparency/blurring effect.
            </FieldDescription>
          </FormField>
          <Separator />
          <FormField>
            <FieldTitle>Theme</FieldTitle>
            <FieldInput>
              <ThemeEditor />
            </FieldInput>
          </FormField>
        </div>
      </div>
    </PanelLayout>
  );
}

export default AppearanceSettings;
