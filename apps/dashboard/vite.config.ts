import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    optimizeDeps: {
        include: ['@vroomly/prisma', '@vroomly/utils']
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern'
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                './src'
            ),
        }
    },
    plugins: [
        tailwindcss(),
        // Allows using React dev server along with building a React application with Vite.
        // https://npmjs.com/package/@vitejs/plugin-react-swc
        react(),
        // Allows using the compilerOptions.paths property in tsconfig.json.
        // https://www.npmjs.com/package/vite-tsconfig-paths
        tsconfigPaths(),
        // Creates a custom SSL certificate valid for the local machine.
        // Using this plugin requires admin rights on the first dev-mode launch.
        // https://www.npmjs.com/package/vite-plugin-mkcert
        // eslint-disable-next-line no-undef
        process.env['HTTPS'] ? mkcert() : null
    ],
    build: {
        target: 'esnext',
        commonjsOptions: {
            include: [/packages/, /node_modules/]
        }
    },
    publicDir: './public',
    server: {
        // Exposes your dev server and makes it accessible for the devices in the same network.
        host: true
    }
})
