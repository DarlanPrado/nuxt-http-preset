import type { FetchOptions } from 'ofetch'
import { useState } from '#imports'

interface HttpEndpoints {
  name: string
  fetchOptions: FetchOptions
}

export function useHttp() {
  const httpEndpoints = useState<HttpEndpoints[]>('http-endpoints', () => [])

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
      throw new Error(`Endpoints not found`)
    }

    return {
      fetch: $fetch.create(endpointOptions),
    }
  }

  return {
    add,
    endpoints: httpEndpoints.value.map(endpoint => endpoint.name),
    request: request,
  }
}
