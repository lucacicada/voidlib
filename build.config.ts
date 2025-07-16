import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,

  entries: [
    'src/index',
    'src/runtime/node/index',
  ],
})
