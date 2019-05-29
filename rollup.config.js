import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/index.js',
    plugins: [terser()],
    output: {
      format: 'iife',
      name: 'VueLivr',
    },
    plugins: [
      terser(),
      commonjs(),
      resolve()
    ],
  },
  {
    input: {
      index: 'src/index.js'
    },
    output: [
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
