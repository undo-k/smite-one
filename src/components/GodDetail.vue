<script setup>
import { onMounted, ref } from "vue";
const godDetailModel = defineModel("god");
const hideGodDetail = defineModel("hideGodDetail");
const god = ref({});
let doneLoading = ref(false);

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
      doneLoading.value = true;
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
  <div
    role="status"
    v-show="!doneLoading"
    class="flex flex-col justify-center bg-gray-800 mt-4 mx-4"
  >
    <div
      class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"
    ></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
  </div>
  <div v-show="doneLoading" class="flex flex-col text-gray-300 mx-2 sm:mt-2">
    <span class="flex justify-end my-1"
      ><button @click="hideGodDetail">
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
    </span>

    <div class="flex items-center">
      <!-- Name and Badges -->
      <div>
        <h1 class="font-black text-2xl">{{ god.name }}</h1>
        <div class="flex space-x-1">
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
      <!-- Aggregated Stats -->
      <div class="flex ml-auto space-x-1 items-center bg-gray-700">
        <div
          v-if="god.win_rate !== undefined"
          class="flex flex-col rounded-sm px-2"
          :class="'text-' + getColorForPercentage(god.win_rate)"
        >
          <span class="mx-auto">WR</span>
          <span class="mx-auto">{{ god.win_rate.toFixed(2) }}</span>
        </div>
        <div
          v-if="god.pick_rate !== undefined"
          class="flex flex-col rounded-md px-2"
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
          class="flex flex-col rounded-md px-2"
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
    <!--    <hr class="flex mx-1 h-px m-2 border-0 bg-gray-600" />-->
    <div class="flex flex-col sm:flex-row justify-between">
      <!-- Recommended Build -->
      <div class="my-2">
        <h1 class="font-bold">Recommended Build</h1>
        <span class="flex gap-px">
          <img
            v-for="item in god.lr_top_items"
            :src="item.image"
            :alt="item.name"
            class="flex-1 sm:flex-none"
            :class="'border-solid border border-' + god.role.toLowerCase()"
          />
        </span>
      </div>
      <div class="my-2">
        <h1 class="font-bold">Popular Items</h1>
        <span class="flex gap-px">
          <img
            v-for="item in god.top_items"
            :src="item.image"
            :alt="item.name"
            class="flex-1 sm:flex-none"
            :class="'border-solid border border-' + god.role.toLowerCase()"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
