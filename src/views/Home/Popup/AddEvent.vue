<template>
  <label class="w-full block text-sm mt-2 font-bold text-primary">{{
    $t("title_patient_name")
  }}</label>
  <input
    type="text"
    v-model="title"
    class="rounded-lg bg-white bg-opacity-20 py-2.5 px-2 w-full text-sm text-white text-opacity-80"
  />
  <div v-for="(dateItem, i) in dates" :key="i">
    <label class="w-full block text-sm mt-2 font-bold text-primary">{{
      $t(dateItem.label)
    }}</label>
    <input
      type="datetime-local"
      v-model="dateItem.dValue"
      class="rounded-lg bg-white bg-opacity-20 py-2.5 px-2 w-full text-sm text-white text-opacity-80"
    />
    <div class="text-red-500 text-xs" v-if="!dateItem.valid">
      {{ errorText }}
    </div>
  </div>
  <label class="w-full block text-sm mt-2 font-bold text-primary">{{
    $t("loop")
  }}</label>
  <select
    v-model="selectedCopyType"
    class="rounded-lg bg-white bg-opacity-20 py-3 px-2 w-full text-sm text-white text-opacity-80"
  >
    <option
      v-for="(type, i) in copyTypeByWeeks"
      :key="i"
      :value="type.value"
      class="bg-dark"
    >
      {{ $t(type.name) }}
    </option>
  </select>
  <div>
    <label class="w-full block text-sm mt-2 font-bold text-primary"
      >{{ $t("loop_end") }} (YYYY-mm-dd)</label
    >
    <input
      type="datetime-local"
      v-model="copyUntil"
      class="rounded-lg bg-white bg-opacity-20 py-2.5 px-2 w-full text-sm text-white text-opacity-80"
    />
    <div class="text-secondary text-xs">
      {{ $t("if_this_empty") }}
    </div>
  </div>
  <button
    @click="saveEvent"
    :disabled="isInputErrors"
    :class="[
      isInputErrors
        ? 'bg-black bg-opacity-40 cursor-not-allowed'
        : 'bg-primary',
    ]"
    class="rounded-lg text-white uppercase text-sm w-full text-center py-2.5 mt-5 mb-5"
  >
    {{ $t("add") }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from "vue";
import type { PropType, Ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    selectedDate: {
      type: String as PropType<string | null>,
      default: null,
    },
    businessHours: {
      type: Object as PropType<any>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const formatDate =
      inject<(date: Date | string | null) => string>("formatDate")!;
    const dateIsValid =
      inject<(date: Date | string | null) => boolean>("dateIsValid")!;
    interface dateItemInterface {
      label: string;
      dValue: any;
      valid: boolean;
    }
    interface dateInterface {
      from: dateItemInterface;
      to: dateItemInterface;
    }

    const dates: Ref<dateInterface> = ref({
      from: { label: "event_start", dValue: null, valid: true },
      to: { label: "event_end", dValue: null, valid: true },
    });

    const title = ref("");
    const copyTypeByWeeks = [
      { value: 0, name: "no_loop" },
      { value: 1, name: "every_week" },
      { value: 2, name: "even_week" },
      { value: 3, name: "odd_week" },
    ];
    const errorText: string =
      "Nem megfelelő a dátum formátuma (yyyy-mm-dd hh:mm)";
    const selectedCopyType = ref(1);
    const copyUntil = ref<string | Date | null>(null);

    const isInputErrors = computed(() => {
      const keys = Object.keys(dates.value) as (keyof dateInterface)[];
      for (let n of keys) {
        if (!dates.value[n].valid) {
          return true;
        }
      }

      return false;
    });

    const saveEvent = () => {
      let sendObj: any = {
        interval: selectedCopyType.value,
        start: formatDate(dates.value.from.dValue),
        end: formatDate(dates.value.to.dValue),
        weekday: dates.value.from.dValue
          ? new Date(dates.value.from.dValue).getDay()
          : null,
        title: title.value,
      };
      if (dateIsValid(copyUntil.value)) {
        sendObj["until"] = copyUntil.value;
      }
      store.dispatch("addEvent", sendObj);
      // this.$axios.post("add_event", sendObj);
      emit("closePopup", {});
      emit("updateEvents", {});
    };

    function dateValidate(
      date: string | Date,
      key: "from" | "to" = "from"
    ): void {
      dates.value[key].valid = dateIsValid(date);
    }

    function setDefaultEndDate(): void {
      let date = dates.value.from.dValue
        ? new Date(dates.value.from.dValue)
        : null;
      if (date) {
        date.setHours(date.getHours() + 1);
        dates.value.to.dValue = formatDate(date);
      }
    }

    function setDefaultCopyUntil(): void {
      let date = new Date(dates.value.from.dValue);
      date.setMonth(11, 31);
      copyUntil.value = formatDate(date);
    }

    function setDefaultStartDate(): void {
      if (props.selectedDate) {
        const isDateTime = props.selectedDate.split(" ").length > 1;
        let date = props.selectedDate;
        let dateAsDate = new Date(props.selectedDate);
        const dayOfWeek = dateAsDate.getDay();
        if (!isDateTime) {
          date += " ";
          if (
            props.businessHours &&
            props.businessHours.startTime &&
            props.businessHours.daysOfWeek.indexOf(dayOfWeek) >= 0
          ) {
            date += props.businessHours.startTime;
          } else {
            date += "08:00";
          }
        }
        dates.value.from.dValue = date;
      }
    }

    watch(
      () => dates.value,
      (nv: dateInterface) => {
        const keys = Object.keys(nv) as (keyof dateInterface)[];
        keys.forEach((key) => {
          dateValidate(nv[key]?.dValue, key as "from" | "to");
        });
      },
      { deep: true }
    );

    setDefaultStartDate();
    setDefaultEndDate();
    setDefaultCopyUntil();

    return {
      dates,
      title,
      copyTypeByWeeks,
      errorText,
      selectedCopyType,
      copyUntil,
      isInputErrors,
      saveEvent,
      dateValidate,
    };
  },
});
</script>

<style scoped></style>
