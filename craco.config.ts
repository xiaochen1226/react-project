const path = require('path')

const resolve = (dir: string) => path.resolve(__dirname, dir)

const config = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components')
    }
  }
}

export default config
