# archiver-webpack-plugin

[![npm version](https://img.shields.io/npm/v/@tanem/archiver-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/archiver-webpack-plugin)
[![build status](https://img.shields.io/travis/tanem/archiver-webpack-plugin/master.svg?style=flat-square)](https://travis-ci.org/tanem/archiver-webpack-plugin)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/archiver-webpack-plugin.svg?style=flat-square)](https://codecov.io/gh/tanem/archiver-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@tanem/archiver-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/archiver-webpack-plugin)

> A webpack plugin that generates zip archives.

## The problem

We want to create archives in a way that plays nicely with other plugins and doesn't require a seperate build.

## This solution

This webpack plugin creates archives from files in the output path when the build is [`done`](https://webpack.js.org/api/compiler-hooks#done).

## Basic Usage

```js
const ArchiverWebpackPlugin = require('@tanem/archiver-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  plugins: [new ArchiverWebpackPlugin()]
}
```

## API

**Arguments**

- `options` - _Optional_ An object containing the optional arguments defined below. Defaults to `{}`.
  - `destpath` - _Optional_ The destination path within the archive. Defaults to `''`, which means files are output to the root of the archive.
  - `filename` - _Optional_ The name of the zip archive. `'.zip'` is appended to the filename. Defaults to the basename of the webpack output path.
  - `globOptions` - _Optional_ The [glob options](https://github.com/isaacs/node-glob#options) that will change pattern matching behaviour. Defaults to the `node-glob` defaults, but sets `cwd` to the output path. Any `globOptions` passed will take precedence.
  - `globPattern` - _Optional_ The [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that determines what will be included in the archive. Defaults to `'**/*'` which will include all files in the output path.

**Example**

```js
const ArchiverWebpackPlugin = require('@tanem/archiver-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  plugins: [
    new ArchiverWebpackPlugin({
      destpath: 'foo',
      filename: 'bar-baz',
      globOptions: { dot: true, ignore: '*.map' },
      globPattern: '*'
    })
  ]
}
```

## Installation

> ⚠️This library requires Node.js 8 or greater.

```
$ npm install @tanem/archiver-webpack-plugin --save-dev
```

## License

MIT
