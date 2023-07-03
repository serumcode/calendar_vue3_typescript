<template>
  <div class="flex justify-center">
    <div class="w-full mb-10" style="max-width: 900px">
      <FullCalendar :options="calendarOptions" ref="cal" />
    </div>
  </div>
  <PopupComponent
    v-if="popup.open"
    :title="popup.type === 'add_event' ? $t('add_event') : $t('remove_event')"
    @closePopup="popup.open = false"
  >
    <template #popup_content v-if="popup.type === 'add_event'">
      <AddEvent
        :selectedDate="selectedDate"
        :businessHours="calendarOptions.businessHours"
        @closePopup="popup.open = false"
        @updateEvents="getEvents"
      />
    </template>
    <template #popup_content v-else-if="popup.type === 'show_event'">
      <ShowEvent
        :selectedEvent="selectedEvent"
        @closePopup="popup.open = false"
        @updateEvents="getEvents"
      />
    </template>
  </PopupComponent>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import type {
  CalendarOptions,
  EventInput,
  /*DateSelectArg,
  EventClickArg,*/
} from "@fullcalendar/core";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import type { PropType, Ref } from "vue";
import { inject } from "vue";
import PopupComponent from "../atomics/PopupComponent.vue";
import AddEvent from "../views/Home/Popup/AddEvent.vue";
import ShowEvent from "../views/Home/Popup/ShowEvent.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { FullCalendar, PopupComponent, AddEvent, ShowEvent },
  setup() {
    const emitter: any = inject("emitter");
    const cal = ref(null);
    const store = useStore();
    const weekDays = ref(["su", "mo", "tu", "we", "th", "fr", "sa"]);
    const selectedDate = ref<string | null>(null);
    const popup = ref({ open: false, type: "add_event" });
    const selectedEvent = ref<any>(null);
    let currentEvents: Ref<EventInput[]> = ref([]);

    const handleDateClick = (e: { dateStr: string }) => {
      selectedDate.value = e.dateStr;
      popup.value.open = true;
      popup.value.type = "add_event";
      console.log("handle date click", e);
    };

    const handleEventClick = (e: { event: any }) => {
      selectedEvent.value = e.event;
      popup.value.open = true;
      popup.value.type = "show_event";
    };

    const handleDateSelect = (...props: any) => {
      console.log("selected date", props);
    };

    let calendarOptions: Ref<Partial<CalendarOptions>> = ref({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, rrulePlugin],
      initialView: "dayGridMonth",
      dateClick: handleDateClick,
      moreLinkClick: handleDateSelect,
      eventClick: handleEventClick,
      events: currentEvents,
      //initialEvents: currentEvents,
      //eventsSet: handleEvents,
      dayMaxEvents: true,
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],

        startTime: "08:00",
        endTime: "20:00",
      },

      firstDay: 1,
      //  timeFormat: "HH:mm",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      slotMinTime: "08:00",
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
        hour12: false,
      },
      locale: "hu",
    });

    const eventsStore = computed(() => {
      return store.state.eventsStore.items;
    });

    function toHoursAndMinutes(start: string, end: string): string {
      const h = Math.abs(new Date(end).getHours() - new Date(start).getHours());
      const m = Math.abs(
        new Date(end).getMinutes() - new Date(start).getMinutes()
      );

      return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}`;
    }

    function getEvents(): void {
      currentEvents.value = [];
      if (eventsStore && Array.isArray(eventsStore.value)) {
        let eventObj: EventInput;
        eventsStore.value.forEach((e: any) => {
          eventObj = { title: e.title };
          eventObj.title = e.title;
          eventObj.id = e.id;
          if (e.interval && e.interval >= 0) {
            eventObj["rrule"] = {
              freq: "weekly",
              interval: e.interval,
              byweekday: [weekDays.value[e.weekday]],
              dtstart: e.start,
            };
            if (e.until) {
              eventObj.rrule["until"] = e.until;
            }
            eventObj["duration"] = toHoursAndMinutes(e.start, e.end);
          } else {
            eventObj["start"] = e.start;
            eventObj["end"] = e.end;
          }
          currentEvents.value.push(JSON.parse(JSON.stringify(eventObj)));
        });

        currentEvents.value = currentEvents.value.concat([]);
      }
    }

    onMounted(() => {
      getEvents();
      emitter.on("change_lang", (lang: string) => {
        calendarOptions.value.locale = lang;
      });
    });

    return {
      weekDays,
      selectedDate,
      popup,
      selectedEvent,
      calendarOptions,
      handleDateClick,
      handleEventClick,
      getEvents,
      currentEvents,
      cal,
    };
  },
});
</script>

<style>
:root {
  --fc-event-border-color: #4caf50;
  --fc-event-bg-color: #8bc34a;
}
.fc .fc-scrollgrid-liquid {
  @apply border-0;
}
.fc .fc-scrollgrid-liquid * {
  @apply border-dark text-white text-opacity-90 shadow-none;
}
.fc .fc-scrollgrid-liquid .fc-event-title-container,
.fc .fc-scrollgrid-liquid .fc-event-title {
  @apply text-dark font-bold;
  box-shadow: none !important;
}

.fc th {
  @apply text-white rounded-t-md lg:rounded-t-lg overflow-hidden bg-primary align-middle !important;
}
.fc .fc-daygrid-day-frame {
  @apply bg-white bg-opacity-10;
}
.fc .fc-toolbar.fc-header-toolbar {
  @apply bg-secondary text-white rounded-lg px-2 py-2 lg:px-4 lg:py-2 mt-5 mb-2.5 text-xs lg:text-base;
}
.fc .fc-button-primary {
  @apply rounded-lg border-transparent bg-black bg-opacity-30 text-white;
}
.fc .fc-button-primary:not(:disabled).fc-button-active,
.fc .fc-button-primary:not(:disabled):active {
  @apply bg-primary border-secondary;
}
.fc-daygrid-block-event .fc-event-time,
.fc-daygrid-block-event .fc-event-title {
  @apply text-dark font-bold !important;
}
.fc-timegrid-event .fc-event-time {
  @apply text-dark font-bold;
}
.fc-daygrid-dot-event .fc-event-title {
  @apply text-white !important;
}
.fc-daygrid-event-dot {
  border-color: #ff5722 !important;
  @apply bg-white border-white;
}
</style>
