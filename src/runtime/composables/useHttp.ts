import type { FetchOptions } from 'ofetch'
import { createError, useAppConfig, useState } from '#imports'

declare module 'nuxt/schema' {
  interface AppConfigInput {
    http?: {
      endpoints: HttpEndpoints[]
    }
  }
}

export interface HttpEndpoints {
  name: string
  fetchOptions: FetchOptions
}

export interface UseHttpReturn {
  add: (name: string, fetchOptions: FetchOptions) => FetchOptions
  endpoints: string[]
  request: (endpointName: string) => { fetch: ReturnType<typeof $fetch.create> }
}

export function useHttp(): UseHttpReturn {
  const httpEndpoints = useState<HttpEndpoints[]>('http-endpoints', () => {
    // @ts-expect-error: AppConfig type is a relationship of a key being a string with an unknown value, which causes an error when trying to use http.endpoints
    return useAppConfig().http?.endpoints || []
  })

  const endpoints = httpEndpoints.value.map(endpoint => endpoint.name)

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
