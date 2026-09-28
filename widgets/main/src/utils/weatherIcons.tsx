import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from 'lucide-react';
import { WeatherOutput } from 'zebar';

export const getWeatherIcon = (
  weatherOutput: WeatherOutput,
  iconClass: string
) => {
  switch (weatherOutput.status) {
    case 'clear_day':
      return <Sun strokeWidth={2.5} className={iconClass} />;
    case 'clear_night':
      return <Moon strokeWidth={2.5} className={iconClass} />;
    case 'cloudy_day':
      return <CloudSun strokeWidth={2.5} className={iconClass} />;
    case 'cloudy_night':
      return <CloudMoon strokeWidth={2.5} className={iconClass} />;
    case 'light_rain_day':
    case 'light_rain_night':
    case 'thunder_night':
      return <CloudDrizzle strokeWidth={2.5} className={iconClass} />;
    case 'heavy_rain_day':
      return <CloudRain strokeWidth={2.5} className={iconClass} />;
    case 'heavy_rain_night':
      return <CloudRain strokeWidth={2.5} className={iconClass} />;
    case 'snow_day':
      return <CloudSnow strokeWidth={2.5} className={iconClass} />;
    case 'snow_night':
      return <CloudSnow strokeWidth={2.5} className={iconClass} />;
    case 'thunder_day':
      return <CloudLightning strokeWidth={2.5} className={iconClass} />;
    default:
      return <Cloud strokeWidth={2.5} className={iconClass} />;
  }
};
