<template>
  <div>
    <div class="button-container" justify="end">
      <v-btn color="primary" @click="saveToStore">Save</v-btn>
      
    </div>
    <div class="card" style="width: 100%;">
      <div class="card-body">
        <div class="grid-container">
          <div class="grid-item">
            <h5 class="card-title">Style</h5>
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
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
import axios from 'axios';
import { mapActions } from "vuex";
export default {
  components: {
    AgGridVue,
  },
  data() {
    return {

      columnDefs: [
      
      ],
      apparelId: null,
      billOfMaterials: [],
      apparelName: null,
      apparelNumber: null,
      apparelLegacyNumber: null,
      customColors : []
    };
  },
  created() {
    // Extract apparel ID from the route and fetch bill of materials
    this.apparelId = this.$route.params.id;
    this.fetchBillOfMaterials();
  },
  methods: {
    ...mapActions(["addNewCarModel", "saveBillOfMaterialsApparel","fetchApparels","retrieveBillOfMaterialsApparel"]),
    async fetchBillOfMaterials() {
  try {
    const response = await axios.get(`http://localhost:3000/billofmaterials/apparel/${this.apparelId}`);
    const data = response.data;

    // Extract data from the response
    this.billOfMaterials = data.components;
    this.apparelName = data.name;
    this.apparelNumber = data.apparelId;
    this.apparelLegacyNumber = data.legacyNumber;
    const colors = data.colors;

    // Dynamically set column definitions based on the fetched data
    this.columnDefs = [
      { headerName: 'Material', field: 'material' },
      { headerName: 'Quantity', field: 'quantity' },
      { headerName: 'Unit Price', field: 'unitPrice' },
    ];

    // Extract colors and dynamically add them to columnDefs
    if (colors && colors.length > 0) {
      colors.forEach(color => {
        this.columnDefs.push({ headerName: color, field: `color_${color}`, editable: true });
          this.customColors.push(color);
      });
    }

    console.log("Column Definitions:", this.columnDefs);
    console.log("billOfMaterials:", JSON.stringify(this.billOfMaterials,0,4));
  } catch (error) {
    console.error('Error fetching bill of materials:', error);
  }
},

    onGridReady(params) {
      this.gridApi = params.api; // store the grid api reference
    },
    // saveToStore() {
    //   // Dispatch the addNewCarModel action to save data to the store
    //   console.log("this.rowData...",this.rowData)
    //   this.addNewCarModel(this.rowData);
    // },
saveToStore() {
  if (this.gridApi) {
    // Get the updated data from the Ag-Grid
    const rowData = [];
    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });
    console.log("Updated data:", rowData);

    // Convert rowData into the schema
    const convertedData = {
      apparelId: this.apparelId,
      name: this.apparelName,
      colors: [], // Initialize colors array
      components: rowData
    };

    // Loop through each item in rowData
    rowData.forEach(item => {
      // Loop through each property in the item
      for (let key in item) {
        // Check if the property starts with 'color_'
        if (key.startsWith('color_')) {
          // Extract the color name and add it to the colors array if it's not already present
          const colorName = key.split('_')[1]; // Extract the substring after the underscore
      if (!convertedData.colors.includes(colorName)) {
        convertedData.colors.push(colorName);
      }
        }
      }
    });

    console.log("Converted data:", JSON.stringify(convertedData, 0, 4));
    convertedData.number = parseInt(convertedData.apparelId);
    convertedData.apparelId = parseInt(convertedData.apparelId);
    this.$store
      .dispatch("saveBillOfMaterialsApparel",
        convertedData
      )
      .then((response) => {
        console.log("Response:", response);
        // Optionally, you can handle the response or perform other actions
        // For example, you might want to fetch updated data after saving
        this.fetchApparels(); // Assuming you have a fetchApparels method in your component
        this.showToast("Saved successfully"); // Show success toast
      })
      .catch((error) => {
        console.error("Error:", error);
        this.showToast("Error saving data", "error"); // Show error toast
        // Handle errors if any
      });
    // Now you can use convertedData as per your requirement
  } else {
    console.error('Grid API is not available.');
  }
},

showToast(message, type = "success") {
      this.$toast[type](message, {
        position: 'bottom-right',
        timeout: 3000, // 3 seconds
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
      });
    }

  },
};
</script>

<style>
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px; /* Add margin to create space between the buttons */
}
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
.left-space {
  margin-left: 10px;
}
</style>
