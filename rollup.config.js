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
        exports: 'named',
        dir: 'dist/umd',
        format: 'umd',
        name: 'vue-livr',
      },
      {
        exports: 'named',
        name: 'VueLIVR',
        dir: 'dist/',
        format: 'iife',
      },
      {
        dir: 'dist/esm',
        format: 'es',
        name: 'vue-livr',
      },
      {
        dir: 'dist/cjs',
        format: 'cjs'
      }
    ],
    plugins: [
      terser(),
      commonjs({
        ignoreGlobal: true
      }),
      resolve({
        mainFields: ['module', 'main', 'jsnext', 'browser'],
      })
    ],
  }
];
