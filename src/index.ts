import archiver from 'archiver'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import webpack from 'webpack'

export class ArchiverWebpackPlugin implements webpack.Plugin {
  destpath: string
  filename?: string
  extension?: string
  format: archiver.Format
  formatOptions?: archiver.ArchiverOptions
  globOptions?: glob.IOptions
  globPattern: string

  constructor(
    format: archiver.Format,
    {
      destpath = '',
      filename,
      extension,
      formatOptions,
      globOptions,
      globPattern = '**/*',
    }: {
      destpath?: string
      filename?: string
      extension?: string
      formatOptions?: archiver.ArchiverOptions
      globOptions?: glob.IOptions
      globPattern?: string
    } = {}
  ) {
    this.destpath = destpath
    this.filename = filename
    this.extension = extension
    this.format = format
    this.formatOptions = formatOptions
    this.globOptions = globOptions
    this.globPattern = globPattern
  }

  apply(compiler: webpack.Compiler): void {
    compiler.hooks.done.tapAsync('ArchiverWebpackPlugin', (stats, done) => {
      const outputPath = stats.compilation.outputOptions.path
      const extension =
        this.extension ||
        (this.formatOptions &&
          this.formatOptions.gzip &&
          `${this.format}.gz`) ||
        this.format
      const filename = `${
        this.filename || path.basename(outputPath)
      }.${extension}`

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
