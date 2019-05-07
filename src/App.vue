<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view/>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Mitr");
#app,
html,
body {
  font-family: "Abel", sans-serif, "Mitr", sans-serif !important;
}
</style>

