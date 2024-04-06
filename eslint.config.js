// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
      'docs/**/*',
      'index.d.ts',
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
