<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link :to="{ name: 'Home'}" class="nav-link" active-class="home-active">
            <img class="logo" src="./assets/build-a-bot-logo.png" alt="logo" />
            Build-a-Bot
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Build'}" class="nav-link">
            Build
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Search'}" class="nav-link">
            Search
          </router-link>
        </li>
        <li class="nav-item cart">
          <router-link :to="{ name: 'Cart'}" class="nav-link">
            Cart
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      user: { name: 'Ibukun22' },
    };
  },
  provide() {
    return {
      user: this.user,
    };
  },
  // Standard New Data
  // provide: {
  //   userName: 'ibukun',
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background: linear-gradient(to bottom, #555,#999);
  background-attachment: fixed;
}
</style>

<style scoped>
main {
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  width: 1400px;
  min-height: 300px;
}

header {
  background-color: #999;
  width: 1460px;
  margin: 0 auto;
}

ul {
  padding: 3px;
  display: flex;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

/* .router-link-active {
  color: #fff;
} */

.active-link {
  color: #fff;
}

.home-active {
  color: #fff;
  text-shadow: 2px 2px #000;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}

.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}

.logo {
  vertical-align: middle;
  height: 30px;
}
</style>
