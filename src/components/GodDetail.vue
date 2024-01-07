<script setup>
import { onMounted, reactive, ref } from "vue";
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
      console.log(god.value.name);
    });
};

onMounted(() => {
  fetchGodDetail();
});
</script>

<template>
  <div class="bg-gray-800 flex-grow text-gray-300 px-3 py-3">
    <button @click="hideGodDetail">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-auto text-gray-400 scale-150"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M14.5 17L9.5 12L14.5 7"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
    <h1 class="font-black text-2xl">{{ god.name }}</h1>
  </div>
</template>

<style scoped></style>
