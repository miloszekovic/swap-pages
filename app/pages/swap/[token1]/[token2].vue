<script setup lang="ts">
import { tokensData } from '../../../../data/tokens'

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

const route = useRoute()
const token1 = (route.params.token1 as string).toLowerCase()
const token2 = (route.params.token2 as string).toLowerCase()

const token1Data = tokensData[token1]
const token2Data = tokensData[token2]

if (!token1Data || !token2Data) {
  throw createError({
    statusCode: 404,
    message: 'Token not found'
  })
}

const { data: token1Info } = await useFetch<TokenApiResponse>(`/api/token/${token1Data.mint}`, {
  key: `token1-${token1Data.mint}`
})
const { data: token2Info } = await useFetch<TokenApiResponse>(`/api/token/${token2Data.mint}`, {
  key: `token2-${token2Data.mint}`
})

const conversionRate = computed(() => {
  if (token1Info.value?.token?.price?.price && token2Info.value?.token?.price?.price) {
    return token1Info.value.token.price.price / token2Info.value.token.price.price
  }
  return 0
})

const token1Price = computed(() => token1Info.value?.token?.price?.price || 0)
const token2Price = computed(() => token2Info.value?.token?.price?.price || 0)

const conversionAmounts = [1, 5, 10, 50, 100, 500, 1000, 5000]

const relatedSwaps = computed(() => {
  const swaps: Array<{ from: string, to: string, url: string }> = []
  
  Object.keys(tokensData).forEach(tokenKey => {
    const tokenData = tokensData[tokenKey]
    if (tokenKey !== token1 && tokenKey !== token2 && tokenData) {
      swaps.push({
        from: token1Data.ticker,
        to: tokenData.ticker,
        url: `/swap/${token1}/${tokenKey}`
      })
    }
  })
  
  return swaps.slice(0, 6)
})

// SEO Meta Tags
const pageTitle = `Swap ${token1Data.name} (${token1Data.ticker}) to ${token2Data.name} (${token2Data.ticker}) | Solflare`
const pageDescription = `Convert ${token1Data.ticker} to ${token2Data.ticker}. Current rate: 1 ${token1Data.ticker} = ${conversionRate.value.toFixed(6)} ${token2Data.ticker}. Real-time conversion rates and tables.`

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
  ]
})
</script>

<template>
  <div :key="`${token1}-${token2}`" style="padding: 40px; max-width: 1200px; margin: 0 auto;">
    <h1 style="font-size: 32px; margin-bottom: 30px;">
      Swap {{ token1Data.name }} to {{ token2Data.name }}
    </h1>
    
    <div style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; margin-bottom: 15px;">Current Prices</h2>
      <p>{{ token1Data.ticker }}: ${{ token1Price.toFixed(2) }}</p>
      <p>{{ token2Data.ticker }}: ${{ token2Price.toFixed(2) }}</p>
      <p style="font-weight: bold; margin-top: 10px;">
        1 {{ token1Data.ticker }} = {{ conversionRate.toFixed(6) }} {{ token2Data.ticker }}
      </p>
    </div>

    <div style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; margin-bottom: 15px;">
        {{ token1Data.ticker }} to {{ token2Data.ticker }} Conversion Table
      </h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">{{ token1Data.ticker }}</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">{{ token2Data.ticker }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="amount in conversionAmounts" :key="amount">
            <td style="padding: 10px; border: 1px solid #ddd;">{{ amount }} {{ token1Data.ticker }}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{ (amount * conversionRate).toFixed(6) }} {{ token2Data.ticker }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; margin-bottom: 15px;">
        {{ token2Data.ticker }} to {{ token1Data.ticker }} Conversion Table
      </h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">{{ token2Data.ticker }}</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">{{ token1Data.ticker }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="amount in conversionAmounts" :key="amount">
            <td style="padding: 10px; border: 1px solid #ddd;">{{ amount }} {{ token2Data.ticker }}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{ (amount / conversionRate).toFixed(6) }} {{ token1Data.ticker }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 style="font-size: 24px; margin-bottom: 15px;">Related Conversions</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <NuxtLink 
          v-for="swap in relatedSwaps" 
          :key="swap.url"
          :to="swap.url"
          style="padding: 10px 20px; background-color: #f0f0f0; border-radius: 5px; text-decoration: none; color: #333;"
        >
          {{ swap.from }} to {{ swap.to }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>