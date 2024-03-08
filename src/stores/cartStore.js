/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur.cost, 0));

  return { cart, cartTotal };
});
