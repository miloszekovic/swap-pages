export default defineCachedEventHandler(async (event) => {
  const mint = getRouterParam(event, 'mint')
  
  if (!mint) {
    throw createError({
      statusCode: 400,
      message: 'Mint address is required'
    })
  }

  const apiUrl = `https://wallet-api.solflare.com/v2/portfolio/token/${mint}/full-info`
  const apiKey = '2e82135a-08a5-44d7-9726-61ab0cd6e36a'

  try {
    const response = await $fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch token data'
    })
  }
}, {
  maxAge: 60 // 60 sekundi = 1 minut cache
})