import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptoapp.app',
  appName: 'CryptoApp',
  webDir: 'dist',
  server: {
    url: 'http://localhost:8080',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    contentInset: 'always'
  }
};

export default config;