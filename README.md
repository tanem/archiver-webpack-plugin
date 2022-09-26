# archiver-webpack-plugin

[![npm version](https://img.shields.io/npm/v/@tanem/archiver-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/archiver-webpack-plugin)
[![build status](https://img.shields.io/github/workflow/status/tanem/archiver-webpack-plugin/CI?style=flat-square)](https://github.com/tanem/archiver-webpack-plugin/actions?query=workflow%3ACI)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/archiver-webpack-plugin.svg?style=flat-square)](https://codecov.io/gh/tanem/archiver-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@tanem/archiver-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/archiver-webpack-plugin)

> A webpack plugin that uses [node-archiver](https://github.com/archiverjs/node-archiver) to generate `.zip`, `.tar`, `.tar.gz`, or `jar` archives when the build is [`done`](https://webpack.js.org/api/compiler-hooks#done).

## Basic Usage

```js
const { ArchiverWebpackPlugin } = require('@tanem/archiver-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
  plugins: [new ArchiverWebpackPlugin('zip')],
}
```

## API

**Arguments**

- `format` - The archive format. One of `zip`, `tar` or `jar`.
- `options` - _Optional_ An object containing the optional arguments defined below. Defaults to `{}`.
  - `destpath` - _Optional_ The destination path within the archive. Defaults to `''`, which means files are output to the root of the archive.
  - `filename` - _Optional_ The name of the archive. `'.zip'`, `'.tar'`, `'.tar.gz'` or `'.jar'` will be appended where appropriate. Defaults to the basename of the webpack output path.
  - `formatOptions` - _Optional_ Allows fine-tuning of archiving. Defaults to [the archiver defaults](https://www.archiverjs.com/archiver).
  - `globOptions` - _Optional_ The [glob options](https://github.com/isaacs/node-glob#options) that will change pattern matching behaviour. Defaults to the `node-glob` defaults, but sets `cwd` to the output path. Any `globOptions` passed will take precedence.
  - `globPattern` - _Optional_ The [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that determines what will be included in the archive. Defaults to `'**/*'` which will include all files in the output path.

**Example**

```js
const { ArchiverWebpackPlugin } = require('@tanem/archiver-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
  plugins: [
    new ArchiverWebpackPlugin('tar', {
      destpath: 'foo',
      filename: 'bar-baz',
      formatOptions: { gzip: true },
      globOptions: { dot: true, ignore: '*.map' },
      globPattern: '*',
    }),
  ],
}
```

## Installation

> ⚠️ This library requires webpack 4 and Node.js >=14 and <18.

```
$ npm install @tanem/archiver-webpack-plugin --save-dev
```

## License

MIT
