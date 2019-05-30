import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: {
      index: 'src/index.js'
    },
    output: [
      {
        dir: 'dist',
        format: 'iife',
        name: 'VueLivr',
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        esModule: false,
        name: 'VueLivr',
      },
      {
        dir: 'dist/cjs',
        format: 'cjs'
      }
    ],
    plugins: [
      terser(),
      commonjs(),
      resolve()
    ],
  }
];
