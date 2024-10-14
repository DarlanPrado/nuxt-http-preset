import type { FetchOptions } from 'ofetch'
import { createError, useAppConfig } from '#imports'

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
  request: (endpointName: string) => { fetch: ReturnType<typeof $fetch.create> }
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
    }
  }

  return {
    add,
    endpoints: endpointsNames,
    request,
  }
}
