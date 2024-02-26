<template>
  <div>
    <div class="button-container" justify="end">
      <v-btn color="primary" @click="saveToStore">Save</v-btn>
      <v-btn color="primary" @click="addColumn" class="left-space">Add Color</v-btn>
      <Toast :message="toastMessage" :type="toastType" :duration="toastDuration" v-if="isToastVisible" />
    </div>
    <div class="card" style="width: 100%">
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
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="billOfMaterials"
      headerHeight="100"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid-enterprise'
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";
import { mapActions } from "vuex";
import customHeader from './components/CustomHeader.vue'
import customColosrHeader from './components/CustomColorsHeader.vue'
import Toast from '../utils/toastMessage.vue'

export default {
  components: {
    AgGridVue,
    customHeader,
    customColosrHeader,
    Toast
  },
  data() {
    return {
      columnDefs: [],
      apparelId: null,
      billOfMaterials: [],
      apparelName: null,
      apparelNumber: null,
      apparelLegacyNumber: null,
      customColors: [],
    };
  },
  created() {
    // Extract apparel ID from the route and fetch bill of materials
    this.apparelId = this.$route.params.id;
    this.fetchBillOfMaterials();
  },
  methods: {
    ...mapActions([
      "addNewCarModel",
      "saveBillOfMaterialsApparel",
      "fetchApparels",
      "retrieveBillOfMaterialsApparel",
    ]),
    async fetchBillOfMaterials() {
      try {
        const response = await axios.get(
          `http://localhost:3000/billofmaterials/apparel/${this.apparelId}`
        );
        const data = response.data;

        const styleresponse = await axios.get(
          `http://localhost:3000/apparels/${this.apparelId}`
        );
        const styleresponseData = styleresponse.data;

        // Extract data from the response
        this.billOfMaterials = data.components;
        this.apparelName = data.name;
        this.apparelNumber = data.apparelId;
        this.apparelLegacyNumber = data.legacyNumber;
        const colors = data.colors;

        // Dynamically set column definitions based on the fetched data
        this.columnDefs = [
          { headerName: "Material", field: "material"},
          { headerName: "Quantity", field: "quantity" },
          {headerComponent:"unitPrice", field: "unitPrice"  },
          {headerComponent:"customHeader", field: ""  },
        ];

        // Extract colors and dynamically add them to columnDefs
        if (styleresponseData.Colorways[0] && styleresponseData.Colorways.length > 0) {
          styleresponseData.Colorways.forEach((color) => {
            this.columnDefs.push({
              headerComponent:"customColosrHeader",
              field: `color_${color.colorwayCode}`,
              editable: true,
              primaryColor: color.PrimaryColor,
              secondaryColor: color.SecondaryColor,
              tertiaryColor: color.TertiaryColor 
            });
            this.customColors.push(color);
          });
        }

        console.log("Column Definitions:", this.columnDefs);
        console.log("billOfMaterials:", JSON.stringify(this.billOfMaterials, 0, 4));
      } catch (error) {
        console.error("Error fetching bill of materials:", error);
      }
    },

    onGridReady(params) {
      this.gridApi = params.api; // store the grid api reference
    },

    saveToStore() {
      if (this.gridApi) {
        const rowData = [];
        this.gridApi.forEachNode((node) => {
          rowData.push(node.data);
        });

        const convertedData = {
          apparelId: this.apparelId,
          name: this.apparelName,
          colors: [],
          components: rowData,
        };

        rowData.forEach((item) => {
          for (let key in item) {
            if (key.startsWith("color_")) {
              const colorName = key.split("_")[1];
              if (!convertedData.colors.includes(colorName)) {
                convertedData.colors.push(colorName);
              }
            }
          }
        });

        convertedData.number = parseInt(convertedData.apparelId);
        convertedData.apparelId = parseInt(convertedData.apparelId);
        this.$store
          .dispatch("saveBillOfMaterialsApparel", convertedData)
          .then((response) => {
            console.log("Response:", response);
            this.showToast("Saved successfully", "success"); 
            this.fetchApparels();
          })
          .catch((error) => {
            console.error("Error:", error);
            this.showToast("Error saving data", "error"); 
          });
      } else {
        console.error("Grid API is not available.");
      }
    },

 
    addColumn() {
      const columnName = prompt("Enter Color Name:");
      if (columnName) {
        this.columnDefs.push({
          headerName: columnName,
          field: "color_" + columnName.toLowerCase(),
          editable: true,
        });

        this.gridApi.setColumnDefs(this.columnDefs);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
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
  font-size: 0.75rem;
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

.ag-header-row {
  height: 260px;
}

.custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: relative; /* Position relative for absolute positioning */
  }

  .header-content {
    display: flex;
    flex-direction: column;
  }

  .header-item {
    padding: 5px 0;
    text-align: left;
  }

  .header-options {
    position: absolute;
    top: 0;
    right: 0;
    color: #888;
    cursor: pointer;
    margin: 10px;
  }

  /* Adjust the icon size */
  .fa-ellipsis-v {
    font-size: 16px;
  }

</style>
