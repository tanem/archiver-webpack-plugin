import archiver from 'archiver'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import webpack from 'webpack'

class ArchiverWebpackPlugin implements webpack.Plugin {
  destpath: string
  filename?: string
  globOptions?: glob.IOptions
  globPattern: string

  constructor({
    destpath = '',
    filename,
    globOptions,
    globPattern = '**/*'
  }: {
    destpath?: string
    filename?: string
    globOptions?: glob.IOptions
    globPattern?: string
  } = {}) {
    this.destpath = destpath
    this.filename = filename
    this.globOptions = globOptions
    this.globPattern = globPattern
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapAsync('ArchiverWebpackPlugin', (stats, done) => {
      const outputPath = stats.compilation.outputOptions.path
      const filename = `${this.filename || path.basename(outputPath)}.zip`

      const output = fs.createWriteStream(path.resolve(outputPath, filename))
      output.on('close', done)

      const archive = archiver('zip')
      archive.pipe(output)
      archive.glob(
        this.globPattern,
        { cwd: outputPath, ...this.globOptions },
        { prefix: this.destpath }
      )
      archive.finalize()
    })
  }
}

export default ArchiverWebpackPlugin
