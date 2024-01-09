<script setup>
import { onMounted, ref } from "vue";
const godDetailModel = defineModel("god");
const hideGodDetail = defineModel("hideGodDetail");
const god = ref({});

const fetchGodDetail = () => {
  // fetch("https://web-production-3593.up.railway.app/gods/" + godDetailModel.value.name)
  // fetch("http://127.0.0.1:8000/gods/" + godDetailModel.value.name);
  fetch(
    "https://web-production-3593.up.railway.app/gods/" +
      godDetailModel.value.name,
  )
    .then((response) => response.json())
    .then((json) => {
      god.value = json;
    });
};

const getColorForPercentage = (value) => {
  if (value < 46) {
    return "red-500";
  } else if (value >= 46 && value <= 52) {
    return "amber-500";
  } else {
    return "green-500";
  }
};

onMounted(() => {
  fetchGodDetail();
});
</script>

<template>
  <div class="bg-gray-800 flex-grow text-gray-300 py-3">
    <button
      class="float-right bg-gray-500 rounded-sm sm:mx-3"
      @click="hideGodDetail"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-auto text-gray-400 scale-150"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M7 17L16.8995 7.10051"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M7 7.00001L16.8995 16.8995"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
    <div class="flex flex-wrap px-3">
      <div>
        <h1 class="font-black text-2xl">{{ god.name }}</h1>
        <div class="flex gap-2">
          <span
            v-if="god.role !== undefined"
            class="text-xs px-1.5 py-0.5 rounded-full border"
            :class="
              'border-' +
              god.role.toLowerCase() +
              ' text-' +
              god.role.toLowerCase()
            "
            >{{ god.role }}</span
          >
          <span
            v-if="god.pick_rate > 45"
            class="text-xs px-1.5 py-0.5 rounded-full border border-green-400 text-green-400"
            >Popular</span
          >
          <span
            v-if="god.ban_rate > 15"
            class="text-xs px-1.5 py-0.5 rounded-full border border-red-500 text-red-500"
            >Top Ban</span
          >
        </div>
      </div>
      <div class="flex ml-auto space-x-1 mt-4 mr-2 font-bold sm:font-normal">
        <div
          v-if="god.win_rate !== undefined"
          class="flex flex-col rounded-md px-2 bg-gray-700 shadow-lg"
          :class="
            'border-' +
            getColorForPercentage(god.win_rate) +
            ' text-' +
            getColorForPercentage(god.win_rate)
          "
        >
          <span class="mx-auto">WR</span>
          <span class="mx-auto">{{ god.win_rate.toFixed(2) }}</span>
        </div>
        <div
          v-if="god.pick_rate !== undefined"
          class="flex flex-col rounded-md px-2 bg-gray-700 shadow-lg"
          :class="
            'border-' +
            getColorForPercentage(god.pick_rate) +
            ' text-' +
            getColorForPercentage(god.pick_rate)
          "
        >
          <span class="mx-auto">PR</span>
          <span class="mx-auto">{{ god.pick_rate.toFixed(2) }}</span>
        </div>
        <div
          v-if="god.ban_rate !== undefined"
          class="flex flex-col rounded-md px-2 bg-gray-700 shadow-lg"
          :class="
            'border-' +
            getColorForPercentage(god.ban_rate) +
            ' text-' +
            getColorForPercentage(god.ban_rate)
          "
        >
          <span class="mx-auto">BR</span>
          <span class="mx-auto">{{ god.ban_rate.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-10 px-3">
      <div>
        <h1 class="font-bold">Recommended Build</h1>
        <span class="flex gap-px w-1/6 sm:w-1/6">
          <img
            v-for="item in god.lr_top_items"
            :src="item.image"
            :alt="item.name"
            :class="'border-solid border border-' + god.role.toLowerCase()"
          />
        </span>
      </div>
      <div>
        <h1 class="font-bold">Popular Items</h1>
        <span class="flex gap-px w-1/6 sm:w-1/6">
          <img
            v-for="item in god.top_items"
            :src="item.image"
            :alt="item.name"
            :class="'border-solid border border-' + god.role.toLowerCase()"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
