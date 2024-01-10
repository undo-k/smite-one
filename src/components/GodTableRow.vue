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
    class="flex items-center w-full py-2 sm:py-1 px-2 border-b odd:bg-gray-800 hover:bg-gray-600 hover:cursor-pointer even:bg-gray-900 border-gray-700"
  >
    <!--  God Name  -->
    <th scope="row" class="sm:px-6 w-1/4 font-medium text-white">
      {{ god.name }}
    </th>
    <!--  Win Rate  -->
    <td class="w-1/6">
      <span :class="getColorForPercentage(god.win_rate.toFixed(2))">{{
        god.win_rate.toFixed(2)
      }}</span>
    </td>
    <!--  Role  -->
    <td class="flex items-center w-1/6">
      <span
        class="text-xs px-1.5 py-0.5 rounded-full border"
        :class="
          'border-' + god.role.toLowerCase() + ' text-' + god.role.toLowerCase()
        "
        >{{ god.role }}</span
      >
    </td>
    <!--  Hot Items  -->
    <td class="flex w-1/4">
      <span class="flex gap-px w-1/4">
        <img
          v-for="item in god.top_items"
          :src="item.image"
          :alt="item.name"
          :class="'border-solid border border-' + god.role.toLowerCase()"
        />
      </span>
    </td>
  </tr>
</template>

<style scoped></style>
