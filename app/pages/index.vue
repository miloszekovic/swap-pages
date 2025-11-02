<script setup lang="ts">
useSeoMeta({
  title: 'Solflare Swap - Convert Solana Tokens',
  description: 'Convert between popular Solana tokens. Real-time exchange rates and conversion tables.'
})
</script>

<template>
  <div class="p-10 max-w-7xl mx-auto">
    <h1 class="text-xxl font-bold mb-5">Solana Token Swap</h1>
    <p class="text-lg mb-10">
      Convert between popular Solana tokens with real-time exchange rates
    </p>

    <RelatedSwaps :limit="12" />
  </div>
</template>
