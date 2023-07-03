<template>
  <language-selector />
  <nav-component />
  <div class="px-2">
    <router-view />
  </div>
  <div id="popup-container"></div>
</template>
<script lang="ts">
import { defineComponent, provide } from "vue";
import NavComponent from "./components/NavComponent.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
export default defineComponent({
  components: {
    NavComponent,
    LanguageSelector,
  },
  setup() {
    const dateIsValid = (date: string): boolean => {
      const dateObj = new Date(date);
      return dateObj instanceof Date && !isNaN(dateObj.getTime());
    };

    const formatDate = (dateStr: any): string => {
      let date: Date | null = new Date(dateStr);
      if (!date) {
        return "";
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      let str = "";
      str = [year, month, day].join("-");
      str += " ";
      str += [hours, minutes].join(":");
      return str;
    };
    provide("formatDate", formatDate);
    provide("dateIsValid", dateIsValid);
    return {};
  },
});
</script>
<style></style>
