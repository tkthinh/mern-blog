import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './');

  return {
    server: {
      define: {
        __APP_MODE__: JSON.stringify(env.VITE_APP_MODE),
        __API_URL__: JSON.stringify(env.VITE_API_URL),
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: mode === 'development' ? false : true,
        },
      },
    },
    plugins: [react()],
  };
});
