<script setup>
const setGodDetailModel = defineModel();
const props = defineProps(["god"]);
const god = props.god;

const getColorForPercentage = (value) => {
  if (value < 46) {
    return "text-red-500";
  } else if (value >= 46 && value <= 52) {
    return "text-amber-500";
  } else {
    return "text-green-500";
  }
};
</script>

<template>
  <tr
    v-once
    @click="setGodDetailModel(god)"
    class="border-b odd:bg-gray-800 hover:bg-gray-600 hover:cursor-pointer even:bg-gray-900 border-gray-700"
  >
    <th scope="row" class="pl-1 sm:px-6 py-4 font-medium text-white">
      {{ god.name }}
    </th>
    <td>
      <span :class="getColorForPercentage(god.win_rate.toFixed(2))">{{
        god.win_rate.toFixed(2)
      }}</span>
    </td>
    <td>
      <span
        class="text-xs px-1.5 py-0.5 rounded-full border"
        :class="
          'border-' + god.role.toLowerCase() + ' text-' + god.role.toLowerCase()
        "
        >{{ god.role }}</span
      >
    </td>
    <td class="pr-12 sm:px-3">
      <span class="flex gap-px w-1/2 sm:w-1/6">
        <img
          v-for="item in god.top_items"
          :src="item.image"
          :alt="item.name"
          :class="'border-solid border border-' + god.role.toLowerCase()"
        />
      </span>
    </td>

    <td>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-auto hidden sm:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.5 7L14.5 12L9.5 17"
        ></path>
      </svg>
    </td>
  </tr>
</template>

<style scoped></style>
