import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit'
import { name, version } from '../package.json'
import type { HttpEndpoints } from './runtime/composables/useHttp'

// Module options TypeScript interface definition
// export interface ModuleOptions {}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    http?: {
      endpoints: HttpEndpoints[]
    }
  }
}

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: name,
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    const runtimeDir = resolver.resolve('./runtime')
    _nuxt.options.build.transpile.push(runtimeDir)
    addImportsDir(resolver.resolve(runtimeDir, 'composables'))
  },
})
