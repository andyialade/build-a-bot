/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { defineStore } from 'pinia';
import { ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const usePartsStore = defineStore('parts', () => {
  const parts = ref(null);
  const getParts = async () => {
    const response = await fetch('/api/parts');
    parts.value = await response.json();
  };

  return { parts, getParts };
});
