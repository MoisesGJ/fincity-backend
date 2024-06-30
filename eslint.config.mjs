import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module', // Habilita módulos ES6
      ecmaVersion: 2022, // Especifica la versión de ECMAScript a usar
      globals: globals.browser // Puedes agregar más globals si es necesario
    },
    plugins: {
      'eslint-plugin-import': require('eslint-plugin-import')
    },
    extends: [
      'plugin:@eslint/recommended', // Usa las reglas recomendadas de ESLint
      'airbnb-base' // Configuración base de Airbnb para JavaScript
    ],
    rules: {
      'import/extensions': ['error', 'always', { js: 'never' }], // Asegúrate de que las extensiones de importación sean correctas
      'import/no-unresolved': 'error', // Asegúrate de que las importaciones sean válidas
      'no-console': 'warn', // Puedes cambiar esto a 'off' si prefieres no tener advertencias sobre console.log
      'no-unused-vars': 'warn' // Puedes cambiar esto a 'error' si prefieres tratar las variables no usadas como errores
    }
  },
  pluginJs.configs.recommended
]
