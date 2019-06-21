import archiver from 'archiver'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import webpack from 'webpack'

class ArchiverWebpackPlugin implements webpack.Plugin {
  destpath: string
  filename?: string
  format: archiver.Format
  formatOptions?: archiver.ArchiverOptions
  globOptions?: glob.IOptions
  globPattern: string

  constructor(
    format: archiver.Format,
    {
      destpath = '',
      filename,
      formatOptions,
      globOptions,
      globPattern = '**/*'
    }: {
      destpath?: string
      filename?: string
      formatOptions?: archiver.ArchiverOptions
      globOptions?: glob.IOptions
      globPattern?: string
    } = {}
  ) {
    this.destpath = destpath
    this.filename = filename
    this.format = format
    this.formatOptions = formatOptions
    this.globOptions = globOptions
    this.globPattern = globPattern
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapAsync('ArchiverWebpackPlugin', (stats, done) => {
      const outputPath = stats.compilation.outputOptions.path
      const extension =
        (this.formatOptions &&
          this.formatOptions.gzip &&
          `${this.format}.gz`) ||
        this.format
      const filename = `${this.filename ||
        path.basename(outputPath)}.${extension}`

      const output = fs.createWriteStream(path.resolve(outputPath, filename))
      output.on('close', done)

      const archive = archiver(this.format, this.formatOptions)
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
