<!-- eslint-disable max-len -->
<template>
  <div class="content" v-if="partsStore.parts">
    <div class="preview">
      <CollapsibleSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <template v-slot:expand>&#x25BC; Show</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl" alt="robot-head" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.imageUrl" class="rotate-left" alt="robot-left-arm" />
            <img :src="selectedRobot.torso.imageUrl" alt="robot-torso" />
            <img :src="selectedRobot.rightArm.imageUrl" class="rotate-right" alt="robot-right-arm" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.imageUrl" alt="robot-base" />
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale</span>
        </div>
        <PartSelector :parts="partsStore.parts.heads" position="top"
          @part-selected="part => selectedRobot.head=part"
        />
    </div>
    <div class="middle-row">
      <PartSelector :parts="partsStore.parts.arms" position="left"
        @part-selected="part => selectedRobot.leftArm=part"
       />
      <PartSelector :parts="partsStore.parts.torsos" position="center"
        @part-selected="part => selectedRobot.torso=part"
      />
      <PartSelector :parts="partsStore.parts.arms" position="right"
      @part-selected="part => selectedRobot.rightArm=part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector :parts="partsStore.parts.bases" position="bottom"
      @part-selected="part => selectedRobot.base=part"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
import { useCartStore } from '../stores/cartStore';
import { usePartsStore } from '../stores/partsStore';

export default {
  name: 'RobotBuilder',
  components: { PartSelector, CollapsibleSection },
  setup() {
    const cartStore = useCartStore();
    const partsStore = usePartsStore();

    partsStore.getParts();

    const selectedRobot = ref({
      head: {},
      leftArm: {},
      torso: {},
      rightArm: {},
      base: {},
    });

    // #region Computed Properties
    const headBorderStyle = computed(() => ({
      border: selectedRobot.value.head.onSale ? '3px solid red' : '3px solid #aaa',
    }));

    const saleBorderClass = computed(() => (
      selectedRobot.value.head.onSale ? 'sale-border' : ''
    ));

    const headBorderColor = computed(() => (
      selectedRobot.value.head.onSale ? 'red' : '#aaa'
    ));

    // #endregion

    const addToCart = () => {
      const robot = selectedRobot.value;
      const cost = robot.head.cost + robot.leftArm.cost +
        robot.torso.cost + robot.rightArm.cost + robot.base.cost;

      cartStore.cart.push({ ...robot, cost });
    };

    return {
      partsStore,
      cartStore,
      selectedRobot,
      addToCart,
      headBorderStyle,
      saleBorderClass,
      headBorderColor,
    };
  },
};
</script>

<!-- Options API -->
<!-- <script>
import parts from '../data/parts';
import { toCurrency } from '../shared/formatter';
import createdHook from './created-hook-mixins';

// Private Methods
function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPreviousValidIndex(index, length) {
  const decrementedIndex = index - 1;
  return decrementedIndex < 0 ? length - 1 : decrementedIndex;
}

export default {
  name: 'RobotBuilder',
  mixins: [createdHook],
  data() {
    return {
      availableParts: parts,
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedRightArmIndex: 0,
      selectedBaseIndex: 0,
      cart: [],
    };
  },
  computed: {
    selectedRobot() {
      return {
        head: this.availableParts.heads[this.selectedHeadIndex],
        leftArm: this.availableParts.arms[this.selectedLeftArmIndex],
        torso: this.availableParts.torsos[this.selectedTorsoIndex],
        rightArm: this.availableParts.arms[this.selectedRightArmIndex],
        base: this.availableParts.bases[this.selectedBaseIndex],
      };
    },
  },
  methods: {
    toCurrency,
    selectNextHead() {
      this.selectedHeadIndex = getNextValidIndex(
        this.selectedHeadIndex,
        this.availableParts.heads.length,
      );
    },
    selectPreviousHead() {
      this.selectedHeadIndex = getPreviousValidIndex(
        this.selectedHeadIndex,
        this.availableParts.heads.length,
      );
    },
    selectNextLeftArm() {
      this.selectedLeftArmIndex = getNextValidIndex(
        this.selectedLeftArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectPreviousLeftArm() {
      this.selectedLeftArmIndex = getPreviousValidIndex(
        this.selectedLeftArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectNextTorso() {
      this.selectedTorsoIndex = getNextValidIndex(
        this.selectedTorsoIndex,
        this.availableParts.torsos.length,
      );
    },
    selectPreviousTorso() {
      this.selectedTorsoIndex = getPreviousValidIndex(
        this.selectedTorsoIndex,
        this.availableParts.torsos.length,
      );
    },
    selectNextRightArm() {
      this.selectedRightArmIndex = getNextValidIndex(
        this.selectedRightArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectPreviousRightArm() {
      this.selectedRightArmIndex = getPreviousValidIndex(
        this.selectedRightArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectNextBase() {
      this.selectedBaseIndex = getNextValidIndex(
        this.selectedBaseIndex,
        this.availableParts.bases.length,
      );
    },
    selectPreviousBase() {
      this.selectedBaseIndex = getPreviousValidIndex(
        this.selectedBaseIndex,
        this.availableParts.bases.length,
      );
    },
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost +
        robot.torso.cost + robot.rightArm.cost + robot.base.cost;

      this.cart.push({ ...robot, cost });
    },
  },
};
</script> -->

<style scoped>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.top.part {
  border: 3px solid v-bind(headBorderColor);
}

.sale-border {
  border: 3px solid red
}

.part img {
  width: 200px;
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
}

.content {
  position: relative;
}

.add-to-cart {
  position: absolute;
  width: 310px;
  padding: 3px;
  font-size: 16px;
}

td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}
</style>
