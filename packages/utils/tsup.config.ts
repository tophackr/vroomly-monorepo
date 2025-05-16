import { defineConfig } from 'tsup'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    entry: ['src/**/*.ts'],
    format: ['esm', 'cjs'],
    target: 'node18',
    outDir: 'dist',
    sourcemap: true,
    dts: true,
    splitting: false,
    clean: true,
    minify: false,
    shims: false
})
