<script setup>
import { computed } from "vue";

const setGodDetailModel = defineModel();
const props = defineProps(["god"]);
const god = props.god;
const name = god.name;
const winRate = god.win_rate.toFixed(2);
const role = god.role;
const topItems = god.top_items;

const getWinRateColorCssClass = computed(() => {
  if (winRate < 46) {
    return "text-red-500";
  } else if (winRate >= 46 && winRate <= 52) {
    return "text-amber-500";
  } else {
    return "text-green-500";
  }
});

const getRoleColorCssClass = computed(() => {
  const roleLowerCase = role.toLowerCase();
  return "text-" + roleLowerCase + " border-" + roleLowerCase;
});

const getItemBorderClass = computed(() => {
  return "border-solid border border-" + role.toLowerCase();
});

const getImageFileName = (image) => {
  let name = image;
  name = name.replace(/ /g, "_");
  name = name.replace(/'/g, "");
  let path = "/static/images/" + name.toLowerCase() + ".jpg";
  console.log(image, path);
  return path;
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
      {{ name }}
    </th>
    <!--  Win Rate  -->
    <td class="w-1/6">
      <span :class="getWinRateColorCssClass">
        {{ winRate }}
      </span>
    </td>
    <!--  Role  -->
    <td class="flex items-center w-1/6">
      <span
        class="text-xs px-1.5 py-0.5 rounded-full border"
        :class="getRoleColorCssClass"
        >{{ role }}</span
      >
    </td>
    <!--  Hot Items  -->
    <td class="flex w-1/4">
      <span class="flex gap-px w-1/4">
        <img
          v-for="item in topItems"
          :src="item.image"
          :alt="item.name"
          class="flex-1"
          :class="getItemBorderClass"
        />
      </span>
    </td>
  </tr>
</template>

<style scoped></style>
