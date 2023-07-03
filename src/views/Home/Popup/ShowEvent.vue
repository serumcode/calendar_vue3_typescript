<template>
  <div>
    <label class="w-full block text-sm mt-2 font-bold text-primary">{{
      $t("from")
    }}</label>
    <div
      class="rounded-lg bg-white bg-opacity-20 py-2.5 px-2 w-full text-sm text-white"
    >
      {{
        selectedEvent && selectedEvent.start
          ? formatDate?.(selectedEvent.start)
          : ""
      }}
    </div>
  </div>
  <div>
    <label class="w-full block text-sm mt-2 font-bold text-primary">{{
      $t("to")
    }}</label>
    <div
      class="rounded-lg bg-white bg-opacity-20 py-2.5 px-2 w-full text-sm text-white"
    >
      {{
        selectedEvent && selectedEvent.end
          ? formatDate?.(selectedEvent.end)
          : ""
      }}
    </div>
  </div>

  <button
    v-on:click="deleteEvent()"
    class="bg-primary rounded-lg text-white uppercase text-sm w-full text-center py-2.5 mt-5"
  >
    {{ $t("delete") }}
  </button>
  <div class="text-secondary text-xs mb-5">
    {{ $t("sample_delete") }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    selectedEvent: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["closePopup", "updateEvents"],
  setup(props, { emit, attrs }) {
    const store = useStore();

    const formatDate = inject<(date: string) => string>("formatDate");
    const dateIsValid = inject<(date: string) => boolean>("dateIsValid");
    function deleteEvent(): void {
      store.dispatch("removeEvent", props.selectedEvent);
      emit("closePopup");
      emit("updateEvents", {});
    }
    return { deleteEvent, formatDate, dateIsValid, ...props, emit };
  },
});
</script>

<style scoped></style>
