<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-slate-800 text-white px-6 py-4 flex items-center justify-between gap-6 shadow-lg"
  >
    <!-- Lijevo: odabrana pizza -->
    <div class="flex items-center gap-4 min-w-[220px]">
      <img
        :src="image"
        alt="Pizza"
        class="w-14 h-14 rounded-md object-cover"
      />

      <div>
        <p class="font-semibold text-sm">{{ naziv }}</p>
        <p class="text-xs text-slate-300">
          {{ odabranaVelicina }} – {{ cijena }}€
        </p>
      </div>
    </div>

    <!-- Sredina: veličine -->
    <div class="flex gap-2">
      <button
        v-for="v in velicine"
        :key="v.label"
        @click="$emit('update:velicina', v.label)"
        :class="[
          'px-3 py-1 rounded-full text-xs border transition',
          odabranaVelicina === v.label
            ? 'bg-orange-500 border-orange-500'
            : 'border-slate-500 text-slate-300 hover:bg-slate-700'
        ]"
      >
        {{ v.label }} – {{ v.cijena }}€
      </button>
    </div>

    <!-- Desno: količina + gumb -->
    <div class="flex items-center gap-4">
      <!-- Količina -->
      <div class="flex items-center gap-2 bg-slate-700 rounded-full px-3 py-1">
        <button
          @click="$emit('decrease')"
          class="text-orange-400 text-lg"
        >
          −
        </button>
        <span class="text-sm font-semibold">{{ kolicina }}</span>
        <button
          @click="$emit('increase')"
          class="text-orange-400 text-lg"
        >
          +
        </button>
      </div>

      <!-- Gumb -->
      <button
        @click="$emit('add')"
        class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold"
      >
        Dodaj u košaricu
      </button>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
        odabranaPizza: {
        type: Object,
        required: true // označava da je ovaj prop obavezan
        }
    });
</script>