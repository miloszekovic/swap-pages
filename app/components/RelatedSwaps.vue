<script setup lang="ts">
import { tokensData } from '../../data/tokens'

interface Props {
  currentToken1?: string
  currentToken2?: string
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  currentToken1: '',
  currentToken2: '',
  limit: 12
})

// Generiši sve moguće swap kombinacije dinamički
const swaps = computed(() => {
  const allSwaps: Array<{ from: string, to: string, url: string, fromName: string, toName: string }> = []
  
  const tokenKeys = Object.keys(tokensData)
  
  // Generiši sve kombinacije token1 -> token2
  tokenKeys.forEach(fromKey => {
    tokenKeys.forEach(toKey => {
      // Preskoči ako su isti tokeni
      if (fromKey === toKey) return
      
      // Preskoči trenutnu kombinaciju
      if (fromKey === props.currentToken1 && toKey === props.currentToken2) return
      
      const fromToken = tokensData[fromKey]
      const toToken = tokensData[toKey]
      
      if (fromToken && toToken) {
        allSwaps.push({
          from: fromToken.ticker,
          to: toToken.ticker,
          fromName: fromToken.name,
          toName: toToken.name,
          url: `/swap/${fromKey}/${toKey}`
        })
      }
    })
  })

  return allSwaps.slice(0, props.limit)
})
</script>

<template>
  <div>
    <h2 style="font-size: 24px; margin-bottom: 20px;">Popular Conversions</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
      <NuxtLink
        v-for="swap in swaps"
        :key="swap.url"
        :to="swap.url"
        style="padding: 20px; background-color: #f5f5f5; border-radius: 8px; text-decoration: none; color: #333; border: 1px solid #ddd; transition: all 0.2s;"
      >
        <div style="font-weight: bold; font-size: 16px;">
          {{ swap.from }} → {{ swap.to }}
        </div>
        <div style="font-size: 14px; color: #666; margin-top: 5px;">
          {{ swap.fromName }} to {{ swap.toName }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>