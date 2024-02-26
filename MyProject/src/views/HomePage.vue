<template>
  <div>
    <div class="table-toolbar">
      <button @click="openAddNewApparelPage" class="add-button">Add New Apparel (+)</button>
    </div>
    <ag-grid-vue
      :key="gridKey"
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="apparels"
      :isExternalFilterPresent="isExternalFilterPresent"
      :doesExternalFilterPass="doesExternalFilterPass"
      @rowClicked="showApparelDetails"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default {
  components: {
    AgGridVue,
  },
  computed: {
    ...mapGetters(['apparels']),
  },
  data() {
    return {
      columnDefs: [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Price', field: 'price' },
      ],
      gridKey: 0,
    };
  },
  mounted() {
    console.log('Component mounted');
    this.fetchApparels(); // Call the action when the component is mounted
  },
  methods: {
    ...mapActions(['fetchApparels', 'addNewApparel']), // Add fetchApparels here

    saveToStore() {
      const newApparelData = {
        id: this.gridKey,
        name: 'New Apparel',
        description: 'New Description',
        price: 50,
      };
      this.addNewApparel(newApparelData);
      this.gridKey = this.gridKey + 1;
    },
    showApparelDetails(event) {
      const selectedApparel = event.data;
      // Construct the URL for the details page
      const url = `/apparel/${selectedApparel.id}`;
      // Open the URL in a new window
      window.open(url, '_blank');
    },
    openAddNewApparelPage() {
      const url = '/add-new-apparel';
      // Open the URL in a new window
      window.open(url, '_blank');
    },
    isExternalFilterPresent() {
      return false; // You can adjust this based on your filtering logic
    },
    doesExternalFilterPass() {
      return true; // You can adjust this based on your filtering logic
    },
  },
};
</script>

<style scoped>
.table-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.add-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
