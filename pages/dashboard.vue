<script setup>
import { ref } from "vue";

const dataTx = ref([]);
const dataModified = ref([]);
const dataTxLoaded = ref(false);

const filters = ref({
  date: "",
  avg_long_price: 0,
  long_percent: 0,
  long_positions: 0,
  long_volume: 0,
  avg_short_price: 0,
  short_percent: 0,
  short_positions: 0,
  short_volume: 0,
});

const resetFilters = () => {
  filters.value.date = "";
  filters.value.avg_long_price = 0;
  filters.value.long_percent = 0;
  filters.value.long_positions = 0;
  filters.value.long_volume = 0;
  filters.value.avg_short_price = 0;
  filters.value.short_percent = 0;
  filters.value.short_positions = 0;
  filters.value.short_volume = 0;
};

const fetchData = async () => {
  try {
    console.log("here!");
    const { data, pending, error, refresh } = await useFetch("/api/trial2", {
      onRequest({ request, options }) {
        console.log("onRequest");
      },
      onRequestError({ request, options, error }) {
        console.log("onRequestError");
      },
      onResponse({ request, response, options }) {
        console.log("onResponse", response._data.body);
        dataTx.value = response._data.body;
        dataTxLoaded.value = true;
        console.log("response :", dataTx.value.length);
      },
      onResponseError({ request, response, options }) {
        console.log("onResponseError");
      },
    });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
  }
};

// Pagination
const pageSize = 100; // Number of items per page
const currentPage = ref(0); // Current page index
const totalPages = computed(() =>
  Math.ceil(dataModified.value.length / pageSize)
);
const paginatedData = computed(() => {
  const startIndex = currentPage.value * pageSize;
  const endIndex = Math.min(startIndex + pageSize, dataModified.value.length);
  return dataModified.value.slice(startIndex, endIndex);
});

// Functions to navigate between pages
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// Function to sort data
const sortData = (direction, field) => {
  const compareFn = (a, b) => {
    // Handle different types of fields
    const aValue =
      typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
    const bValue =
      typeof b[field] === "string" ? b[field].toLowerCase() : b[field];

    if (aValue < bValue) {
      return direction === "up" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "up" ? 1 : -1;
    }
    return 0;
  };

  dataModified.value.sort(compareFn);
};

// Function to filter data based on the filters object
const filterData = () => {
  // Create a copy of the original data
  dataModified.value = [...dataTx.value];

  // Iterate through each columnn
  Object.keys(filters.value).forEach((field) => {
    // Filter value
    const filterValue = filters.value[field];

    if (filterValue !== "" && filterValue !== 0) {
      dataModified.value = dataModified.value.filter((item) => {
        const fieldValue = item[field];

        // For numeric fields (population and area), filter out elements with values less than filterValue
        return fieldValue >= filterValue;
      });
    }
  });
  currentPage.value = 0;
};

watchEffect(() => {
  filterData();
});

const randomKey = () => {
  return Math.random().toString(36).substring(7);
};

onBeforeMount(() => {
  // This code will run only on the server-side!!!
  fetchData();
});
</script>

<template>
  <div v-show="dataTxLoaded">
    <button @click="resetFilters()">Reset</button>
    <button @click="signOut()">Sign out</button>
    <div>
      <h1>Dashboard</h1>
      <div class="input-grid">
        <div class="input-container">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="filters.date" />
        </div>
        <div class="input-container">
          <label for="avg_long_price">Avg Long Price:</label>
          <input
            type="number"
            id="avg_long_price"
            v-model="filters.avg_long_price"
            step="0.001"
            min="0"
          />
        </div>
        <div class="input-container">
          <label for="long_percent">Long Percent:</label>
          <input
            type="number"
            id="long_percent"
            v-model="filters.long_percent"
            min="0"
          />
        </div>
        <div class="input-container">
          <label for="long_positions">Long Positions:</label>
          <input
            type="number"
            id="long_positions"
            v-model="filters.long_positions"
            min="0"
          />
        </div>
        <div class="input-container">
          <label for="long_volume">Long Volume:</label>
          <input
            type="number"
            id="long_volume"
            min="0"
            v-model="filters.long_volume"
          />
        </div>
        <div class="input-container">
          <label for="avg_short_price">Avg Short Price:</label>
          <input
            type="number"
            id="avg_short_price"
            v-model="filters.avg_short_price"
            min="0"
            step="0.001"
          />
        </div>
        <div class="input-container">
          <label for="short_percent	">Short Percent :</label>
          <input
            type="number"
            id="short_percent"
            v-model="filters.short_percent"
            min="0"
          />
        </div>
        <div class="input-container">
          <label for="short_positions">Short Positions:</label>
          <input
            type="number"
            id="short_positions"
            v-model="filters.short_positions"
            min="0"
          />
        </div>
        <div class="input-container">
          <label for="short_volume">Short Volume:</label>
          <input
            type="number"
            id="short_volume"
            v-model="filters.short_volume"
            min="0"
          />
        </div>
      </div>
      <div class="pagination-controls">
        <!-- Pagination controls -->
        <button @click="prevPage" :disabled="currentPage === 0">
          Previous Page
        </button>
        <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages - 1">
          Next Page
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <TableHeader name="Date" nameCod="date" @sortColumn="sortData" />
            <TableHeader
              name="Avg Long Price"
              nameCod="avg_long_price"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Long Percent"
              nameCod="long_percent"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Long Positions"
              nameCod="long_positions"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Long Volume"
              nameCod="long_volume"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Avg Short Price"
              nameCod="avg_short_price"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Short Percent"
              nameCod="short_percent"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Short Positions"
              nameCod="short_positions"
              @sortColumn="sortData"
            />
            <TableHeader
              name="Short Volume"
              nameCod="short_volume"
              @sortColumn="sortData"
            />
          </tr>
        </thead>
        <tbody>
          <!-- Iterate over paginatedData -->
          <tr v-for="item in paginatedData" :key="randomKey()">
            <td>{{ item.date }}</td>
            <td>{{ item.avg_long_price }}</td>
            <td>{{ item.long_percent }}</td>
            <td>{{ item.long_positions }}</td>
            <td>{{ item.long_volume }}</td>
            <td>{{ item.avg_short_price }}</td>
            <td>{{ item.short_percent }}</td>
            <td>{{ item.short_positions }}</td>
            <td>{{ item.short_volume }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-show="!dataTxLoaded">
    <div>Loading...</div>
  </div>
</template>

<style>
/* Style for the dashboard container */
.dashboard-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Style for the input fields */
input[type="text"],
input[type="number"] {
  width: 200px;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Style for the table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

/* Style for table headers */
th {
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
}

/* Style for table cells */
td {
  border: 1px solid #ddd;
  padding: 10px;
}

/* Style for pagination controls */
.pagination-controls {
  margin-top: 20px;
}

/* Style for buttons */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Style for page number */
.page-number {
  margin-left: 10px;
  font-weight: bold;
}
/* Style for the container */
.input-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)); /* Four columns */
  gap: 15px; /* Gap between grid items */
}

/* Style for each input container */
.input-container {
  display: flex;
  flex-direction: column;
}

/* Style for labels */
label {
  margin-bottom: 5px;
  font-weight: bold;
}

/* Style for inputs */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

/* Hover effect for inputs */
input[type="text"]:hover,
input[type="number"]:hover {
  border-color: #007bff;
}

/* Focus effect for inputs */
input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-controls button {
  margin: 0 10px; /* Adjust margin as needed */
}
</style>
