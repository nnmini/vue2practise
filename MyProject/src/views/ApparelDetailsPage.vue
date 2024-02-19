<template>
  <div>
    <div class="card" style="width: 100%;">
      <div class="card-body">
        <div class="grid-container">
          <div class="grid-item">
            <h5 class="card-title">Apparel Name</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ apparelName }}</h6>
          </div>
          <div class="grid-item">
            <h5 class="card-title">Number</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ apparelNumber }}</h6>
          </div>
          <div class="grid-item">
            <h5 class="card-title">Legacy Number</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ apparelLegacyNumber }}</h6>
          </div>
        </div>
      </div>
    </div>
    <h5 class="card-title">Bill of Materials</h5>
    
    <ag-grid-vue
    style="width: 100%; height: 500px;"
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
        { headerName: 'Material', field: 'material' },
        { headerName: 'Quantity', field: 'quantity' },
        { headerName: 'Unit Price', field: 'unitPrice' },
      ],
      apparelId: null,
      billOfMaterials: [],
      apparelName: null,
      apparelNumber: null,
      apparelLegacyNumber: null,
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
        const response = await axios.get(`http://localhost:3000/billofmaterials/apparel/${this.apparelId}`);
        this.billOfMaterials = response.data.components;
        this.apparelName = response.data.name;
        this.apparelNumber = response.data.number;
        this.apparelLegacyNumber = response.data.legacyNumber;
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

.card {
  margin-bottom: 20px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: .75rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.grid-item {
  padding: 10px;
}
</style>
