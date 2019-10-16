import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'lib/main.common.js',
      format: 'cjs'
    },
    plugins: [typescript(), resolve(), commonjs()]
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'lib/main.esm.js',
      format: 'esm'
    },
    plugins: [typescript(), resolve(), commonjs()]
  }
];
