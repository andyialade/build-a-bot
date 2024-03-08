<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div class="top part">
        <!-- <div :class="[saleBorderClass, 'top', 'part']"> -->
        <!-- <div class="top part" :class="{'sale-border': selectedRobot.head.onSale }"> -->
        <!-- <div class="top part" :style="headBorderStyle"> -->
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale</span>
        </div>
        <img :src="selectedRobot.head.imageUrl" alt="head" />
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.imageUrl" alt="left arm" />
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.imageUrl"  alt="torso" />
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.imageUrl"  alt="right arm" />
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.imageUrl"  alt="base" />
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>
    </div>
  </div>
  <div>
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th>Robot</th>
          <th class="cost">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td>{{ robot.head.title }}</td>
          <td class="cost">{{ toCurrency(robot.cost) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import parts from '../data/parts';
import { toCurrency } from '../shared/formatter';

export default {
  name: 'RobotBuilder',
  setup() {
    const availableParts = parts;
    const selectedHeadIndex = ref(0);
    const selectedLeftArmIndex = ref(0);
    const selectedTorsoIndex = ref(0);
    const selectedRightArmIndex = ref(0);
    const selectedBaseIndex = ref(0);
    const cart = ref([]); //
    // onst cart = reactive([]); // DO NOT USE REACTIVE

    // #region Private Methods
    function getNextValidIndex(index, length) {
      const incrementedIndex = index + 1;
      return incrementedIndex > length - 1 ? 0 : incrementedIndex;
    }

    function getPreviousValidIndex(index, length) {
      const decrementedIndex = index - 1;
      return decrementedIndex < 0 ? length - 1 : decrementedIndex;
    }
    // #endregion

    // #region Computed Properties
    const selectedRobot = computed(() => ({
      head: availableParts.heads[selectedHeadIndex.value],
      leftArm: availableParts.arms[selectedLeftArmIndex.value],
      torso: availableParts.torsos[selectedTorsoIndex.value],
      rightArm: availableParts.arms[selectedRightArmIndex.value],
      base: availableParts.bases[selectedBaseIndex.value],
    }));

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

    // #region Parts Selector Methods
    const selectNextHead = () => {
      selectedHeadIndex.value = getNextValidIndex(
        selectedHeadIndex.value,
        availableParts.heads.length,
      );
    };

    const selectPreviousHead = () => {
      selectedHeadIndex.value = getPreviousValidIndex(
        selectedHeadIndex.value,
        availableParts.heads.length,
      );
    };

    const selectNextLeftArm = () => {
      selectedLeftArmIndex.value = getNextValidIndex(
        selectedLeftArmIndex.value,
        availableParts.arms.length,
      );
    };

    const selectPreviousLeftArm = () => {
      selectedLeftArmIndex.value = getPreviousValidIndex(
        selectedLeftArmIndex.value,
        availableParts.arms.length,
      );
    };

    const selectNextTorso = () => {
      selectedTorsoIndex.value = getNextValidIndex(
        selectedTorsoIndex.value,
        availableParts.torsos.length,
      );
    };

    const selectPreviousTorso = () => {
      selectedTorsoIndex.value = getPreviousValidIndex(
        selectedTorsoIndex.value,
        availableParts.torsos.length,
      );
    };

    const selectNextRightArm = () => {
      selectedRightArmIndex.value = getNextValidIndex(
        selectedRightArmIndex.value,
        availableParts.arms.length,
      );
    };

    const selectPreviousRightArm = () => {
      selectedRightArmIndex.value = getPreviousValidIndex(
        selectedRightArmIndex.value,
        availableParts.arms.length,
      );
    };

    const selectNextBase = () => {
      selectedBaseIndex.value = getNextValidIndex(
        selectedBaseIndex.value,
        availableParts.bases.length,
      );
    };

    const selectPreviousBase = () => {
      selectedBaseIndex.value = getPreviousValidIndex(
        selectedBaseIndex.value,
        availableParts.bases.length,
      );
    };
    // #endregion

    const addToCart = () => {
      const robot = selectedRobot.value;
      const cost = robot.head.cost + robot.leftArm.cost +
        robot.torso.cost + robot.rightArm.cost + robot.base.cost;

      cart.value.push({ ...robot, cost });
    };

    return {
      availableParts,
      selectedHeadIndex,
      selectedLeftArmIndex,
      selectedTorsoIndex,
      selectedRightArmIndex,
      selectedBaseIndex,
      cart,
      selectedRobot,
      toCurrency,
      selectNextHead,
      selectPreviousHead,
      selectNextLeftArm,
      selectPreviousLeftArm,
      selectNextTorso,
      selectPreviousTorso,
      selectNextRightArm,
      selectPreviousRightArm,
      selectNextBase,
      selectPreviousBase,
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
  right: 30px;
  width: 220px;
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
</style>
