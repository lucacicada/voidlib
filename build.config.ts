import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  declaration: true,

  entries: [
    'src/index',

    'src/common/index',
    'src/common/fs/index',
    'src/common/path/index',

    'src/runtime/node/index',
    'src/runtime/node/fs/index',

    'src/runtime/tauri/index',
    'src/runtime/tauri/fs/index',
  ],
})
