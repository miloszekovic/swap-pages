<script setup lang="ts">
useHead({
  title: 'Solflare Swap - Convert Solana Tokens',
  meta: [
    { name: 'description', content: 'Convert between popular Solana tokens. Real-time exchange rates and conversion tables.' }
  ]
})
</script>

<template>
  <div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
    <h1 style="font-size: 48px; margin-bottom: 20px;">Solana Token Swap</h1>
    <p style="font-size: 18px; color: #666; margin-bottom: 40px;">
      Convert between popular Solana tokens with real-time exchange rates
    </p>

    <RelatedSwaps :limit="12" />
  </div>
</template>