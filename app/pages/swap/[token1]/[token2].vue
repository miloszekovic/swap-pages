<script setup lang="ts">
const { tokensData } = useTokens()

// API response type definition for token data
interface TokenApiResponse {
  id: string
  token: {
    name: string
    symbol: string
    decimals: number
    mint: string
    price: {
      price: number
      change: number
      usdPrice: number
      usdChange: number
    }
  }
  tokenInfo?: any
}

// Get route params and normalize to lowercase
const route = useRoute()
const token1 = (route.params.token1 as string).toLowerCase()
const token2 = (route.params.token2 as string).toLowerCase()

// Validate tokens exist in our data
const token1Data = tokensData[token1]
const token2Data = tokensData[token2]

if (!token1Data || !token2Data) {
  throw createError({
    statusCode: 404,
    message: 'Token not found'
  })
}

// Fetch token data from API with unique cache keys
const { data: token1Info } = await useFetch<TokenApiResponse>(`/api/token/${token1Data.mint}`, {
  key: `token1-${token1Data.mint}`
})
const { data: token2Info } = await useFetch<TokenApiResponse>(`/api/token/${token2Data.mint}`, {
  key: `token2-${token2Data.mint}`
})

// Calculate conversion rate between two tokens
const conversionRate = computed(() => {
  if (token1Info.value?.token?.price?.price && token2Info.value?.token?.price?.price) {
    return token1Info.value.token.price.price / token2Info.value.token.price.price
  }
  return 0
})

// Extract token prices for display
const token1Price = computed(() => token1Info.value?.token?.price?.price || 0)
const token2Price = computed(() => token2Info.value?.token?.price?.price || 0)

// Predefined amounts for conversion tables
const conversionAmounts = [1, 5, 10, 50, 100, 500, 1000, 5000]

// Generate SEO meta tags
const pageTitle = `Swap ${token1Data.name} (${token1Data.ticker}) to ${token2Data.name} (${token2Data.ticker}) | Solflare`
const pageDescription = `Convert ${token1Data.ticker} to ${token2Data.ticker}. Current rate: 1 ${token1Data.ticker} = ${conversionRate.value.toFixed(6)} ${token2Data.ticker}. Real-time conversion rates and tables.`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})
</script>

<template>
  <div :key="`${token1}-${token2}`" class="p-10 max-w-7xl mx-auto">
    <h1 class="text-xxl mb-8 font-bold">
      Swap {{ token1Data.name }} to {{ token2Data.name }}
    </h1>
    
    <div class="mb-10">
      <h2 class="mb-4 text-lg font-bold">Current Prices</h2>
      <p>{{ token1Data.ticker }}: ${{ token1Price.toFixed(2) }}</p>
      <p>{{ token2Data.ticker }}: ${{ token2Price.toFixed(2) }}</p>
      <p class="font-bold mt-2.5">
        1 {{ token1Data.ticker }} = {{ conversionRate.toFixed(6) }} {{ token2Data.ticker }}
      </p>
    </div>

    <div class="mb-10">
      <h2 class="mb-4 text-lg font-bold">
        {{ token1Data.ticker }} to {{ token2Data.ticker }} Conversion Table
      </h2>
      <div class="overflow-x-auto md:overflow-visible">
        <table class="w-full border-collapse border min-w-[500px] md:min-w-0">
          <thead>
            <tr class="bg-dark">
              <th class="p-3 text-left border border-dark text-base-light">{{ token1Data.ticker }}</th>
              <th class="p-3 text-left border border-dark text-base-light">{{ token2Data.ticker }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="amount in conversionAmounts" :key="amount" class="group">
              <td class="p-2.5 border border-dark text-gray group-hover:bg-yellow group-hover:text-dark transition-all">{{ amount }} {{ token1Data.ticker }}</td>
              <td class="p-2.5 border border-dark text-gray group-hover:bg-yellow group-hover:text-dark transition-all">{{ (amount * conversionRate).toFixed(6) }} {{ token2Data.ticker }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mb-10">
      <h2 class="mb-4 text-lg font-bold">
        {{ token2Data.ticker }} to {{ token1Data.ticker }} Conversion Table
      </h2>
      <div class="overflow-x-auto md:overflow-visible">
        <table class="w-full border-collapse border min-w-[500px] md:min-w-0">
          <thead>
            <tr class="bg-dark">
              <th class="p-3 text-left border border-dark text-base-light">{{ token2Data.ticker }}</th>
              <th class="p-3 text-left border border-dark text-base-light">{{ token1Data.ticker }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="amount in conversionAmounts" :key="amount" class="group">
              <td class="p-2.5 border border-dark text-gray group-hover:bg-yellow group-hover:text-dark transition-all">{{ amount }} {{ token2Data.ticker }}</td>
              <td class="p-2.5 border border-dark text-gray group-hover:bg-yellow group-hover:text-dark transition-all">{{ (amount / conversionRate).toFixed(6) }} {{ token1Data.ticker }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <RelatedSwaps :current-token1="token1" :current-token2="token2" :limit="6" />
  </div>
</template>
