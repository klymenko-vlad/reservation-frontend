import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/vue-options-api-only',
    files: ['**/*.vue'],
    rules: {
      // Disallow Composition API
      'vue/no-setup-props-reactivity-loss': 'off',
      'vue/prefer-import-from-vue': 'off',

      // Enforce Options API style
      'vue/component-api-style': ['error', ['options']], // Only allow Options API
      'vue/no-ref-object-reactivity-loss': 'off',
      'vue/no-setup-props-destructure': 'off',

      // Additional rules to prevent Composition API usage
      'vue/no-lifecycle-after-await': 'off', // Only relevant for Composition API
      'vue/no-watch-after-await': 'off', // Only relevant for Composition API

      // Enforce component definition style
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/no-deprecated-destroyed-lifecycle': 'error',
      'vue/no-deprecated-dollar-listeners-api': 'error',
      'vue/no-deprecated-dollar-scopedslots-api': 'error',
    }
  }
)
