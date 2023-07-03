<template>
  <div class="fixed top-3 right-3 z-50">
    <VueMultiselect
      class="bg-dark text-white custom-multiselect h-8 px-2 rounded-lg py-2 cursor-pointer"
      v-model="selectedItem"
      :options="items"
      v-on:select="changeSelect"
      :multiple="false"
      :taggable="true"
      :close-on-select="true"
      :searchable="false"
      openDirection="bottom"
      placeholder=""
      label="name"
      :limit="1000"
      track-by="name"
    >
      <template v-slot:option="{ option }">
        <div class="flex gap-2 bg-dark py-2 px-2">
          <div v-html="option.flag"></div>
          <div class="text-white text-xs">{{ $t(option.name) }}</div>
        </div>
      </template>

      <template v-slot:singleLabel="{ option }">
        <div class="flex gap-2 bg-dark">
          <div v-html="option.flag"></div>
          <div class="text-white text-xs">{{ $t(option.name) }}</div>
        </div>
      </template>
      <template v-slot:placeholder>
        <div class="-mt-2 opacity-60">{{ $t("choose") }}</div>
      </template>
    </VueMultiselect>
  </div>
</template>

<script lang="ts">
import VueMultiselect from "vue-multiselect";
import { defineComponent, ref, computed, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { setI18nLanguage, i18n } from "../i18n";

interface itemInterface {
  flag: string;
  name: string;
}
export default defineComponent({
  components: { VueMultiselect },
  setup() {
    const emitter: any = inject("emitter");
    const store = useStore();
    const items = ref<itemInterface[]>([
      {
        flag: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>`,
        name: "en",
      },
      {
        flag: `<svg class="w-5" xmlns="http://www.w3.org/2000/svg" id="flag-icons-hu" viewBox="0 0 640 480">
    <g fill-rule="evenodd">
      <path fill="#fff" d="M640 480H0V0h640z"/>
      <path fill="#388d00" d="M640 480H0V320h640z"/>
      <path fill="#d43516" d="M640 160.1H0V.1h640z"/>
    </g>
  </svg>`,
        name: "hu",
      },
    ]);
    let selectedItem = ref<any | null>(null);
    function changeSelect(option: itemInterface): void {
      setI18nLanguage(option.name);
      console.log("changel", emitter);
      emitter.emit("change_lang", option.name);
    }
    onMounted(() => {
      selectedItem.value = items.value.find(
        (item) => item.name === i18n.global.locale.value
      );
    });
    return {
      selectedItem,
      items,
      changeSelect,
    };
  },
});
</script>

<style scoped></style>
