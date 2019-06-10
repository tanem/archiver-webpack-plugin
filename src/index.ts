import archiver from 'archiver'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

class ArchiverWebpackPlugin implements webpack.Plugin {
  destpath: string
  filename?: string
  glob: string

  constructor({
    destpath = '',
    filename,
    glob = '**/*'
  }: { destpath?: string; filename?: string; glob?: string } = {}) {
    this.destpath = destpath
    this.filename = filename
    this.glob = glob
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapAsync('ArchiverWebpackPlugin', (stats, done) => {
      const outputPath = stats.compilation.outputOptions.path
      const filename = `${this.filename || path.basename(outputPath)}.zip`

      const output = fs.createWriteStream(path.resolve(outputPath, filename))
      output.on('close', done)

      const archive = archiver('zip')
      archive.pipe(output)
      archive.glob(this.glob, { cwd: outputPath }, { prefix: this.destpath })
      archive.finalize()
    })
  }
}

export default ArchiverWebpackPlugin
