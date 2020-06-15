import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';

const {name} = require('./package.json');
const globals = {};
const external = [];

const cjs = [
  {
    input: 'src/is-emoji-supported.ts',
    output: {
      file: `dist/cjs/${name}.js`,
      sourcemap: true,
      format: 'cjs',
      esModule: false
    },
    external,
    plugins: [typescript()]
  },
  {
    input: 'src/is-emoji-supported.ts',
    output: {
      file: `dist/cjs/${name}.min.js`,
      sourcemap: true,
      format: 'cjs'
    },
    external,
    plugins: [
      typescript(),
      terser({
        toplevel: true,
        compress: {
          unsafe: true
        }
      })
    ]
  }
];

const esm = [
  {
    input: 'src/is-emoji-supported.ts',
    output: {file: `dist/esm/${name}.js`, sourcemap: true, format: 'esm'},
    external,
    plugins: [typescript()]
  }
];

const umd = [
  {
    input: 'src/is-emoji-supported.ts',
    output: {
      file: `dist/umd/${name}.js`,
      sourcemap: true,
      format: 'umd',
      name: 'isSupportedEmoji',
      globals
    },
    external,
    plugins: [typescript()]
  },
  {
    input: 'src/is-emoji-supported.ts',
    output: {
      file: `dist/umd/${name}.min.js`,
      sourcemap: true,
      format: 'umd',
      name: 'isSupportedEmoji',
      globals
    },
    external,
    plugins: [
      typescript(),
      terser({
        toplevel: true,
        compress: {
          unsafe: true
        }
      })
    ]
  }
];

module.exports = [...cjs, ...esm, ...umd];
