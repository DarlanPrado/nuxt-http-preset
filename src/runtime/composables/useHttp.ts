import type { FetchOptions } from 'ofetch'
import type { AppConfigInput } from 'nuxt/schema'
import type { HttpEndpoints } from '../types/httpEndpoints'
import { createError, ref, useAppConfig, useState } from '#imports'

export function useHttp() {
  const httpEndpoints = useState<HttpEndpoints[]>('http-endpoints', () => {
    const appConfig = useAppConfig() as unknown as AppConfigInput
    return appConfig.http?.endpoints || []
  })

  const endpoints = ref(httpEndpoints.value.map(endpoint => endpoint.name))

  function add(name: string, fetchOptions: FetchOptions) {
    const index = httpEndpoints.value.findIndex(endpoint => endpoint.name === name)

    if (index === -1) {
      httpEndpoints.value.push({ name, fetchOptions } as HttpEndpoints)
    }
    else {
      httpEndpoints.value[index] = { name, fetchOptions } as HttpEndpoints
    }
    return fetchOptions
  }

  function request(endpointName: HttpEndpoints['name']) {
    const endpointOptions = httpEndpoints.value.find(endpoint => endpoint.name === endpointName)?.fetchOptions

    if (!endpointOptions) {
      throw createError(`Endpoint "${endpointName}" not exist.`)
    }

    return {
      fetch: $fetch.create(endpointOptions),
    }
  }

  return {
    add,
    endpoints,
    request,
  }
}
