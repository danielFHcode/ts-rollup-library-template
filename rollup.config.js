import { defineConfig } from 'rollup';
import packageConfig from './package.json' assert { type: 'json' };
// transpile
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
// compatibility with older packages
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// types
import dts from 'rollup-plugin-dts';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [
            {
                format: 'esm',
                file: 'dist/index.mjs',
            },
            {
                format: 'commonjs',
                file: 'dist/index.cjs',
            },
            {
                format: 'umd',
                file: 'dist/index.js',
                name: packageConfig.name
                    .replaceAll('@', '')
                    .replaceAll('.', '_')
                    .replace(/[-/][A-z]/g, (word) => word[1].toUpperCase()), // convert "@some/package-name@1.0.0" to more js friendly "somePackageName1_0_0"
            },
        ],
        plugins: [typescript(), babel(), resolve(), commonjs(), json()],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
        },
        plugins: [dts()],
    },
]);
