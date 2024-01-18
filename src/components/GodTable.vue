<script setup>
import { computed, onMounted, ref } from "vue";
import GodTableRow from "@/components/GodTableRow.vue";
const setGodDetailModel = defineModel();

let gods = ref([]);
let filter = ref("");
let sortingKey = ref("name");
let sortDescend = ref(true);
let doneLoading = ref(false);

const fetchGods = () => {
  // fetch("https://web-production-3593.up.railway.app/gods/")
  // fetch("http://127.0.0.1:8000/gods/")
  fetch("https://web-production-3593.up.railway.app/gods/")
    .then((response) => response.json())
    .then((json) => {
      gods.value = json;
      doneLoading.value = true;
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
  <table class="w-full text-sm text-left text-gray-400">
    <thead class="flex text-xs uppercase bg-gray-700 text-gray-400">
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
        <td class="w-1/4">
          <span class="flex items-center font-bold">HOT ITEMS 🔥 </span>
        </td>
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
    <tbody
      role="status"
      v-show="!doneLoading"
      class="flex items-center justify-center bg-gray-800 py-10"
    >
      <tr>
        <td>
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </td>
      </tr>
    </tbody>
    <tbody
      v-show="doneLoading"
      class="flex flex-col items-center h-[65vh] overflow-y-scroll w-full bg-gray-800"
    >
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
