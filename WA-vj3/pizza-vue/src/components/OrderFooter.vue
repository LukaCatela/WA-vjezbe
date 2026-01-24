<template>
  <div class="fixed bottom-0 left-0 right-0 bg-slate-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img 
            :src="odabranaPizza.slika_url" 
            :alt="odabranaPizza.naziv" 
            class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md shadow-black/40"
          >
          <h3 class="font-bold tracking-wide text-base sm:text-lg text-orange-400">
            {{ odabranaPizza.naziv }}
          </h3>
        </div>

        <!-- Size buttons -->
        <div class="flex items-center gap-2">
          <button
            v-for="(cijena, velicina) in odabranaPizza.cijene"
            :key="velicina"
            class="px-3 py-1 cursor-pointer rounded-lg border border-slate-500 bg-slate-600/40
            hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all text-sm
            sm:text-base"
          >
            {{ velicina }} – {{ cijena }}€
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  odabranaPizza: {
    type: Object,
    required: true
  }
});
</script>