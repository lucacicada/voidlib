import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,

  entries: [
    'src/index',

    'src/common/index',
    'src/common/fs/index',
    'src/common/math/index',
    'src/common/path/index',
    'src/common/url/index',

    'src/runtime/node/index',
    'src/runtime/node/fs/index',

    'src/runtime/tauri/index',
    'src/runtime/tauri/fs/index',
  ],

  externals: [],

  rollup: {
    inlineDependencies: true,
  },
})
