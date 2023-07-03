<template>
  <div class="flex justify-center text-white">
    <div
      class="w-full mb-10 bg-primary-dark mt-8 rounded-lg xs:rounded-md px-5 py-5 pb-7 text-center"
      style="max-width: 900px"
    >
      <div class="uppercase font-bold mb-10">
        <span class="border-b-4 border-orange-500 pb-2">{{ $t("about") }}</span>
      </div>
      <div>{{ $t("demo_app") }}</div>
      <div class="mt-7">
        <router-link
          to="/"
          class="relative mt-5 bg-orange-500 text-white font-bold px-4 rounded-lg uppercase py-1 text-sm"
          >{{ $t("back_to_homepage") }}</router-link
        >
      </div>
    </div>
  </div>
</template>
