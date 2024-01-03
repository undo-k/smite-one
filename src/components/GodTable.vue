<script setup>
import { onMounted, reactive, ref } from "vue";

let gods = ref([]);
let filter = ref("");
let sortBy = ref("name");
let sortDescend = ref(true);

const fetchGods = () => {
  fetch("https://web-production-3593.up.railway.app/gods/")
    .then((response) => response.json())
    .then((json) => {
      gods.value = json;
    });
};
const filteredGods = () => {
  const filterValue = filter.value.toLowerCase();

  let filteredGods = gods.value.filter(
    (god) =>
      god.name.toLowerCase().includes(filterValue) ||
      god.role.toLowerCase().includes(filterValue),
  );
  if (sortBy.value === "win_rate") {
    return filteredGods.sort((a, b) =>
      sortDescend.value
        ? b[sortBy.value].toFixed(2) - a[sortBy.value].toFixed(2)
        : a[sortBy.value].toFixed(2) - b[sortBy.value].toFixed(2),
    );
  } else {
    return filteredGods.sort((a, b) =>
      sortDescend.value
        ? a[sortBy.value].localeCompare(b[sortBy.value])
        : b[sortBy.value].localeCompare(a[sortBy.value]),
    );
  }
};

const getColorForPercentage = (value) => {
  if (value < 46) {
    return "text-red-500";
  } else if (value >= 46 && value <= 52) {
    return "text-amber-500";
  } else {
    return "text-green-500";
  }
};

const getColorForRole = (role) => {
  switch (role) {
    case "Assassin":
      return "yellow-300";
    case "Guardian":
      return "green-400";
    case "Hunter":
      return "amber-600";
    case "Mage":
      return "violet-400";
    case "Warrior":
      return "red-600";
  }
};

const sortByColumn = (column) => {
  if (sortBy.value === column) {
    sortDescend.value = !sortDescend.value;
  } else {
    sortBy.value = column;
    sortDescend.value = true;
  }
};

onMounted(() => {
  fetchGods();
});
</script>

<template>
  <div
    class="min-h-[50vh] max-h-[75vh] max-w-[1200px] border-2 border-gray-950 overflow-y-scroll"
  >
    <table class="text-sm text-left bg-gray-700 text-gray-400">
      <thead class="text-xs uppercase text-gray-400">
        <tr>
          <th scope="col" class="px-6 w-full md:w-1/4 lg:w-1/5">
            <div
              class="flex items-center hover:cursor-pointer"
              @click="sortByColumn('name')"
            >
              God
              <svg
                class="w-3 h-3 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                />
              </svg>
            </div>
          </th>
          <th scope="col" class="w-full md:w-1/4 lg:w-1/5">
            <div
              class="flex items-center hover:cursor-pointer"
              @click="sortByColumn('win_rate')"
            >
              Win Rate
              <svg
                class="w-3 h-3 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                />
              </svg>
            </div>
          </th>
          <th scope="col" class="w-full md:w-1/4 lg:w-1/5">
            <div
              class="flex items-center hover:cursor-pointer"
              @click="sortByColumn('role')"
            >
              Role
              <svg
                class="w-3 h-3 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                />
              </svg>
            </div>
          </th>
          <th scope="col" class="w-full md:w-1/4 lg:w-1/5">
            <div class="flex items-center">Hot Items 🔥</div>
          </th>
          <td class="w-full md:w-1/4 lg:w-1/5 py-3 px-4">
            <input
              class="rounded-lg pl-3 focus:placeholder:text-transparent"
              v-model="filter"
              placeholder="Press [tab] to filter"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="god in filteredGods()"
          :key="god.id"
          class="border-b odd:bg-gray-800 hover:bg-gray-600 hover:cursor-pointer even:bg-gray-900 border-gray-700"
        >
          <th scope="row" class="px-6 py-4 font-medium text-white">
            {{ god.name }}
          </th>
          <td>
            <span :class="getColorForPercentage(god.win_rate.toFixed(2))">{{
              god.win_rate.toFixed(2)
            }}</span>
          </td>
          <td>
            <span
              :class="
                'border-' +
                god.role.toLowerCase() +
                ' text-' +
                god.role.toLowerCase() +
                ' border text-xs px-1.5 py-0.5 rounded-full'
              "
              >{{ god.role }}</span
            >
          </td>
          <td>
            <div class="flex gap-px">
              <img
                v-for="item in god.top_items"
                :src="item.image"
                :alt="item.name"
                :class="
                  'max-w-1/4 md:w-1/4 lg:w-1/5 xl:w-1/5 border-solid border border-' +
                  god.role.toLowerCase()
                "
              />
            </div>
          </td>
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mx-auto"
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
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
