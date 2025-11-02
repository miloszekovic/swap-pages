<script setup lang="ts">
const { tokensData } = useTokens()

// Component props definition
interface Props {
  currentToken1?: string
  currentToken2?: string
  limit?: number
}

// Set default values for props
const props = withDefaults(defineProps<Props>(), {
  currentToken1: '',
  currentToken2: '',
  limit: 12
})

// Generate all possible swap combinations dynamically
const swaps = computed(() => {
  const allSwaps: Array<{ from: string, to: string, url: string, fromName: string, toName: string }> = []
  
  const tokenKeys = Object.keys(tokensData)
  
  // Generate all token pair combinations
  tokenKeys.forEach(fromKey => {
    tokenKeys.forEach(toKey => {
      // Skip if same token
      if (fromKey === toKey) return
      
      // Skip current combination to avoid duplicate
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

  // Return limited number of swaps based on prop
  return allSwaps.slice(0, props.limit)
})
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-5">Popular Conversions</h2>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      <NuxtLink
        v-for="swap in swaps"
        :key="swap.url"
        :to="swap.url"
        class="flex flex-col justify-center p-5 bg-dark rounded-lg no-underline transition-all hover:bg-yellow hover:text-dark"
      >
        <span class="block font-bold text-base">
          {{ swap.from }} → {{ swap.to }}
        </span>
        <span class="block text-sm mt-1">
          {{ swap.fromName }} to {{ swap.toName }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
