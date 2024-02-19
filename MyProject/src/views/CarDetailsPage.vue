<template>
    <div>
      <h1>Bill of Materials for {{ apparelName }}</h1>
      <ag-grid-vue
        style="width: 500px; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="billOfMaterials"
      >
      </ag-grid-vue>
    </div>
  </template>
  
  <script>
  import { AgGridVue } from 'ag-grid-vue';
  import axios from 'axios';
  
  export default {
    components: {
      AgGridVue,
    },
    data() {
      return {
        columnDefs: [
          { headerName: 'Name', field: 'name' },
          { headerName: 'Quantity', field: 'quantity' },
          { headerName: 'Unit Price', field: 'price' },
          { headerName: 'Total Price', field: 'totalPrice' },
        ],
        apparelId: null,
        billOfMaterials: [],
        apparelName: null,
      };
    },
    created() {
      // Extract apparel ID from the route and fetch bill of materials
      this.apparelId = this.$route.params.id;
      this.fetchBillOfMaterials();
    },
    methods: {
      async fetchBillOfMaterials() {
        try {
          const response = await axios.get(`http://localhost:3000/billofmaterials/apparels/${this.apparelId}`);
          this.billOfMaterials = response.data.components;
          this.apparelName = response.data.model;
        } catch (error) {
          console.error('Error fetching bill of materials:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  .ag-theme-alpine {
    /* Add any custom Ag-Grid styles here */
  }
  </style>
  