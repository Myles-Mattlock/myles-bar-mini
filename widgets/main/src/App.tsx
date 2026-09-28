import { useEffect, useState } from 'react';
import * as zebar from 'zebar';
import NetworkStatus from './components/network/NetworkStatus';
import StatProviders from './components/statProviders';
import { useAutoTiling } from './utils/useAutoTiling';

const providers = zebar.createProviderGroup({
  network: { type: 'network' },
  cpu: { type: 'cpu' },
  memory: { type: 'memory' },
  weather: { type: 'weather' },
  battery: { type: 'battery', refreshInterval: 5 * 1000 },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  useAutoTiling();

  return (
    <div
      className="relative flex items-center py-1 bg-background backdrop-blur-xl text-text h-screen antialiased select-none font-mono rounded-lg"
    >
      <div className="flex items-center h-full">
        <NetworkStatus network={output.network} />
        <StatProviders
          weather={output.weather}
          battery={output.battery}
          cpu={output.cpu}
          memory={output.memory}
        />
      </div>
    </div>
  );
}

export default App;
