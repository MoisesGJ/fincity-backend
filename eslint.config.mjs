import globals from 'globals'
import { recommended } from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  recommended,
  {
    extends: 'eslint:recommended'
  }
]
