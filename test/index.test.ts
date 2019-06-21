import path from 'path'
import rimraf from 'rimraf'
import tar from 'tar'
import webpack from 'webpack'
import merge from 'webpack-merge'
import yauzl from 'yauzl'
import ArchiverWebpackPlugin from '../src'
import baseConfig from './fixtures/webpack.config'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const defaultOutputPath = baseConfig.output!.path!

afterEach(done => {
  rimraf(defaultOutputPath, done)
})

test('defaults', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [new ArchiverWebpackPlugin('zip')]
    }),
    () => {
      yauzl.open(
        path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.zip`
        ),
        (_, zip) => {
          if (zip) {
            const fileNames: string[] = []
            zip.on('entry', entry => {
              fileNames.push(entry.fileName)
            })
            zip.on('close', () => {
              expect(fileNames).toHaveLength(5)
              expect(fileNames).toEqual(
                expect.arrayContaining([
                  'dist.zip',
                  'main.css',
                  'main.css.map',
                  'main.js',
                  'main.js.map'
                ])
              )
              done()
            })
          } else {
            done()
          }
        }
      )
    }
  )
})

test('destpath', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [new ArchiverWebpackPlugin('zip', { destpath: 'foo' })]
    }),
    () => {
      yauzl.open(
        path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.zip`
        ),
        (_, zip) => {
          if (zip) {
            const fileNames: string[] = []
            zip.on('entry', entry => {
              fileNames.push(entry.fileName)
            })
            zip.on('close', () => {
              expect(fileNames).toHaveLength(5)
              expect(fileNames).toEqual(
                expect.arrayContaining([
                  'foo/dist.zip',
                  'foo/main.css',
                  'foo/main.css.map',
                  'foo/main.js',
                  'foo/main.js.map'
                ])
              )
              done()
            })
          } else {
            done()
          }
        }
      )
    }
  )
})

test('filename', done => {
  expect.assertions(2)
  const filename = 'foo'
  webpack(
    merge(baseConfig, {
      plugins: [new ArchiverWebpackPlugin('zip', { filename })]
    }),
    () => {
      yauzl.open(
        path.resolve(defaultOutputPath, `${filename}.zip`),
        (_, zip) => {
          if (zip) {
            const fileNames: string[] = []
            zip.on('entry', entry => {
              fileNames.push(entry.fileName)
            })
            zip.on('close', () => {
              expect(fileNames).toHaveLength(5)
              expect(fileNames).toEqual(
                expect.arrayContaining([
                  'foo.zip',
                  'main.css.map',
                  'main.js',
                  'main.css',
                  'main.js.map'
                ])
              )
              done()
            })
          } else {
            done()
          }
        }
      )
    }
  )
})

test('globOptions', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [
        new ArchiverWebpackPlugin('zip', {
          globOptions: { ignore: '*.+(map|zip)' }
        })
      ]
    }),
    () => {
      yauzl.open(
        path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.zip`
        ),
        (_, zip) => {
          if (zip) {
            const fileNames: string[] = []
            zip.on('entry', entry => {
              fileNames.push(entry.fileName)
            })
            zip.on('close', () => {
              expect(fileNames).toHaveLength(2)
              expect(fileNames).toEqual(
                expect.arrayContaining(['main.css', 'main.js'])
              )
              done()
            })
          } else {
            done()
          }
        }
      )
    }
  )
})

test('globPattern', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [
        new ArchiverWebpackPlugin('zip', { globPattern: '*.+(css|js)' })
      ]
    }),
    () => {
      yauzl.open(
        path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.zip`
        ),
        (_, zip) => {
          if (zip) {
            const fileNames: string[] = []
            zip.on('entry', entry => {
              fileNames.push(entry.fileName)
            })
            zip.on('close', () => {
              expect(fileNames).toHaveLength(2)
              expect(fileNames).toEqual(
                expect.arrayContaining(['main.js', 'main.css'])
              )
              done()
            })
          } else {
            done()
          }
        }
      )
    }
  )
})

test('tar', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [
        new ArchiverWebpackPlugin('tar', { globPattern: '*.+(css|js)' })
      ]
    }),
    () => {
      const fileNames: string[] = []
      tar.t({
        file: path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.tar`
        ),
        onentry: entry => {
          fileNames.push((entry.path as unknown) as string)
        },
        sync: true
      })
      expect(fileNames).toHaveLength(2)
      expect(fileNames).toEqual(expect.arrayContaining(['main.js', 'main.css']))
      done()
    }
  )
})

test('tgz', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [
        new ArchiverWebpackPlugin('tar', {
          formatOptions: {
            gzip: true
          },
          globPattern: '*.+(css|js)'
        })
      ]
    }),
    () => {
      const fileNames: string[] = []
      tar.t({
        file: path.resolve(
          defaultOutputPath,
          `${path.basename(defaultOutputPath)}.tar.gz`
        ),
        onentry: entry => {
          fileNames.push((entry.path as unknown) as string)
        },
        sync: true
      })
      expect(fileNames).toHaveLength(2)
      expect(fileNames).toEqual(expect.arrayContaining(['main.js', 'main.css']))
      done()
    }
  )
})
