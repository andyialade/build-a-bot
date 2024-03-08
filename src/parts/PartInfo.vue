<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>
      {{ part.description }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import { useRoute } from 'vue-router';
// import parts from '../data/parts';
import { usePartsStore } from '../stores/partsStore';

const partsStore = usePartsStore();
const props = defineProps(['partType', 'id']);

const part = computed(() => partsStore.parts[props.partType].find((pt) => pt.id === +props.id));

// const part = computed(() =>
//   const route = useRoute();
//   const { partType } = route.params;
//   const partId = route.params.id;
//   return parts[partType].find((pt) => pt.id === +partId);
// );
</script>
