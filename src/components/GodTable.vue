<script setup>
import { computed, onMounted, ref } from "vue";
import GodTableRow from "@/components/GodTableRow.vue";
const setGodDetailModel = defineModel();

let gods = ref([]);
let filter = ref("");
let sortingKey = ref("name");
let sortDescend = ref(true);

const fetchGods = () => {
  // fetch("https://web-production-3593.up.railway.app/gods/")
  // fetch("http://127.0.0.1:8000/gods/")
  fetch("https://web-production-3593.up.railway.app/gods/")
    .then((response) => response.json())
    .then((json) => {
      gods.value = json;
    });
};
const filteredGods = computed(() => {
  const filterValue = filter.value.toLowerCase();
  const key = sortingKey.value;

  let filteredGods = gods.value.filter(
    (god) =>
      god.name.toLowerCase().includes(filterValue) ||
      god.role.toLowerCase().includes(filterValue),
  );
  if (key === "win_rate") {
    return filteredGods.sort((a, b) =>
      sortDescend.value
        ? b[key].toFixed(2) - a[key].toFixed(2)
        : a[key].toFixed(2) - b[key].toFixed(2),
    );
  } else {
    return filteredGods.sort((a, b) =>
      stringComparator(a[key], b[key]) ? 1 : -1,
    );
  }
});

const stringComparator = (string1, string2) => {
  if (sortDescend.value) {
    return string1 > string2;
  } else {
    return string1 < string2;
  }
};

const setColumnSort = (column) => {
  if (sortingKey.value === column) {
    sortDescend.value = !sortDescend.value;
  } else {
    sortingKey.value = column;
    sortDescend.value = true;
  }
};

onMounted(() => {
  fetchGods();
});
</script>

<template>
  <table class="w-full text-sm text-left bg-gray-700 text-gray-400">
    <thead class="flex text-xs uppercase text-gray-400">
      <tr class="flex items-center w-full py-3 px-2">
        <!-- God -->
        <th scope="col" class="sm:px-6 w-1/4">
          <div
            class="flex items-center hover:cursor-pointer"
            @click="setColumnSort('name')"
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
        <!-- WR -->
        <th scope="col" class="w-1/6">
          <span
            class="flex items-center hover:cursor-pointer"
            @click="setColumnSort('win_rate')"
          >
            WR
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
          </span>
        </th>
        <!-- Role -->
        <th scope="col" class="w-1/6">
          <span
            class="flex items-center hover:cursor-pointer"
            @click="setColumnSort('role')"
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
          </span>
        </th>
        <!-- Hot Items -->
        <th scope="col" class="w-1/4">
          <span class="flex items-center">HOT ITEMS 🔥 </span>
        </th>
        <!-- Search -->
        <td class="w-1/6">
          <input
            class="flex pl-2 pr-1 bg-gray-800 rounded-lg focus:placeholder:text-transparent w-full"
            v-model="filter"
            type="search"
            placeholder="Search..."
          />
        </td>
      </tr>
    </thead>

    <tbody class="flex flex-col items-center h-[70vh] overflow-y-scroll w-full">
      <GodTableRow
        v-for="god in filteredGods"
        :key="god.name"
        :god="god"
        v-model="setGodDetailModel"
      >
      </GodTableRow>
    </tbody>
  </table>
</template>

<style scoped></style>
