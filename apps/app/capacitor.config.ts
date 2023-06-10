import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.antoinek.patcam.app',
  appName: 'patcam',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
