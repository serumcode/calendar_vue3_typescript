<template>
  <nav class="custom-nav relative h-1/3 py-32 lg:py-56 text-center">
    <img
      src=".././assets/bg.svg"
      class="w-full h-full absolute top-0 left-0 object-cover"
    />
    <div
      class="flex absolute h-full w-full top-0 mix-blend-overlay"
      style="background: #07d400"
    ></div>
    <router-link
      to="/"
      class="relative z-10 text-4xl lg:text-8xl uppercase text-white drop-shadow-2xl font-bold border-b-8 border-orange-500"
      style="color: cornsilk"
      >{{ $t("calendar") }}</router-link
    >
    <router-link
      to="/about"
      class="absolute left-0 bottom-0 bg-orange-500 text-white font-bold px-4 rounded-t-lg uppercase py-1 text-sm"
      >{{ $t("about") }}</router-link
    >
  </nav>
</template>
<script lang="ts">
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>
<style scoped>
.custom-nav1:before {
  background: linear-gradient(to right, #3a1c71, #d76d77, rgb(255, 175, 123));
  content: "";
  z-index: 1;
  @apply absolute w-full h-full left-0 top-0 opacity-80;
}
</style>
