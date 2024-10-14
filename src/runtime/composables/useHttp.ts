import type { FetchError, FetchOptions } from 'ofetch'
import { createError, useAppConfig, useFetch } from '#imports'
import type { AsyncData, UseFetchOptions } from '#app'

interface HttpEndpoints {
  name: string
  fetchOptions: FetchOptions
}

interface HttpSchema {
  endpoints: HttpEndpoints[]
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    http?: HttpSchema
  }
}

interface UseHttpReturn {
  add: (name: string, fetchOptions: FetchOptions) => FetchOptions
  endpoints: string[]
  request: (endpointName: HttpEndpoints['name']) => {
    fetch: ReturnType<typeof $fetch.create>
    useFetch: <T>(url: string | (() => string), options?: UseFetchOptions<T>) => AsyncData<T, FetchError | null>
  }
}

export function useHttp(): UseHttpReturn {
  const httpEndpoints = (useAppConfig().http as HttpSchema || null)?.endpoints || []
  const endpointsNames = httpEndpoints.map(endpoint => endpoint.name)

  function add(name: string, fetchOptions: FetchOptions) {
    const index = httpEndpoints.findIndex(endpoint => endpoint.name === name)

    if (index === -1) {
      httpEndpoints.push({ name, fetchOptions } as HttpEndpoints)
    }
    else {
      httpEndpoints[index] = { name, fetchOptions } as HttpEndpoints
    }
    return fetchOptions
  }

  function request(endpointName: HttpEndpoints['name']) {
    const endpointOptions = httpEndpoints.find(endpoint => endpoint.name === endpointName)?.fetchOptions

    if (!endpointOptions) {
      throw createError(`Endpoint "${endpointName}" not exist.`)
    }

    return {
      fetch: $fetch.create(endpointOptions),
      useFetch: <T>(url: string | (() => string), options?: UseFetchOptions<T>) => {
        return useFetch(url, {
          ...options,
          $fetch: $fetch.create(endpointOptions),
        }) as AsyncData<T, FetchError | null>
      },
    }
  }

  return {
    add,
    endpoints: endpointsNames,
    request,
  }
}
