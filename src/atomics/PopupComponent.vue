<template>
  <teleport to="#popup-container">
    <div
      class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      style="z-index: 1000; padding-top: 56px"
      id="modal-id"
    >
      <div class="absolute bg-black opacity-50 inset-0 z-0"></div>
      <div
        style="max-height: calc(100% - 30px)"
        class="bg-white flex flex-col max-w-md w-full relative my-auto rounded-lg shadow-lg mx-4"
      >
        <div
          class="popup-header flex text-left items-center pl-5 pr-4 py-3.5 rounded-t-lg bg-primary"
        >
          <div class="flex-grow text-white font-bold uppercase">
            <slot name="popup_header">{{ title }} </slot>
          </div>
          <div class="cursor-pointer" v-on:click="closePopup()">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enable-background="new 0 0 1000 1000"
              xml:space="preserve"
              class="w-7 fill-current text-white"
            >
              <path
                d="M500,10C229.4,10,10,229.4,10,500c0,270.7,219.4,490,490,490c270.7,0,490-219.3,490-490C990,229.4,770.7,10,500,10z M500,924.7C265.8,924.7,75.3,734.2,75.3,500S265.8,75.3,500,75.3S924.7,265.8,924.7,500S734.2,924.7,500,924.7z"
              />
              <path
                d="M680.8,273L501.3,452.6L340.2,273c-12.7-12.7-33.5-12.7-46.2,0c-12.7,12.7-12.7,33.5,0,46.2l161.1,179.6L273,680.8c-12.7,12.7-12.7,33.5,0,46.2c12.7,12.7,33.5,12.7,46.2,0l179.6-179.5L659.9,727c12.7,12.7,33.5,12.7,46.1,0c12.7-12.7,12.7-33.5,0-46.2L544.9,501.3L727,319.2c12.7-12.7,12.7-33.5,0-46.2S693.6,260.2,680.8,273z"
              />
            </svg>
          </div>
        </div>
        <div class="flex-grow overflow-y-auto">
          <div class="popup-content p-1 px-5 bg-dark">
            <slot name="popup_content"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  emits: ["closePopup"],
  props: {
    defaultWidth: {
      type: String,
      default: "auto",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(_, { emit }) {
    function closePopup(): void {
      emit("closePopup");
      //  console.log("handle event click", e, e.view.getCurrentData());
    }
    return {
      closePopup,
    };
  },
});
</script>

<style scoped></style>
