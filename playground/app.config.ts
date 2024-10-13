export default defineAppConfig({
  http: {
    endpoints: [
      { name: 'example',
        fetchOptions: {
          baseURL: 'https://api.example.com',
        },
      },
      { name: 'another',
        fetchOptions: {
          baseURL: 'https://api.another.com',
        },
      },
    ],
  },
})
