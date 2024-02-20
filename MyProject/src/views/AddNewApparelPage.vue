<template>
  <div>
    <!-- Card with Apparel Information -->

    <div class="button-container" justify="end">
      <v-btn color="primary" @click="saveToStore">Save</v-btn>
      <v-btn color="primary" @click="retrieveBillOfMaterial" class="left-space">Retrieve</v-btn>

    </div>

    <v-card class="card">

      <v-card-text>
        <div class="grid-container">
          <div class="grid-item">
            <h5 class="card-title">Apparel Name</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ apparelName }}</h6>
          </div>
          <div class="grid-item">
            <h5 class="card-title">Number</h5>
            <h6 class="card-subtitle mb-2 text-muted" v-if="!isEditing" @dblclick="isEditing = true">{{ selectedNumber }}</h6>
            <input v-else v-model="selectedNumber" type="number" @blur="isEditing = false" />
          </div>
          <div class="grid-item">
            <h5 class="card-title">Legacy Number</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ apparelLegacyNumber }}</h6>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Apparel Data Grid -->
    <div class="outer">
      <!-- Drop Zone for Excel File -->
      <div
        style="height: 100%"
        class="inner-col"
        @dragover.prevent
        @drop="gridDrop($event, 'left')"
      >
        <ag-grid-vue
          style="width: 100%; height: 500px"
          class="ag-theme-alpine"
          :columnDefs="columnDefs"
          :localeText="customLocaleText"
          :rowData="rowData"
          @dragover.prevent
          @drop="handleDrop"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>


<script>
import { AgGridVue } from "ag-grid-vue";
import * as XLSX from "xlsx";
import { useToast } from 'vue-toastification';
import { mapActions } from "vuex";

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
        { headerName: "Material", field: "material" },
        { headerName: "Quantity", field: "quantity" },
        { headerName: "Unit Price", field: "unitPrice" },
      ],
      rowData: [],
      apparelNumber: 0,
      apparelLegacyNumber: 0,
      selectedNumber:0,
      apparelName: "",
      isEditing: false,
      customLocaleText: {
        noRowsToShow: "Drag And Drop File here..", // Override the default message
      },
    };
  },
  
  mounted() {
    // Initialize Vue Toastification
    this.$toast = useToast();
  },

  methods: {
    ...mapActions(["addNewCarModel", "saveBillOfMaterialsApparel","fetchApparels","retrieveBillOfMaterialsApparel"]),

    gridDrop(event, grid) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          this.readFile(file, grid);
        } else {
          alert("Please drop a valid Excel file.");
        }
      }
    },
    retrieveBillOfMaterial() {
      // Call the Vuex store action to retrieve the Bill of Material
      this.$store
        .dispatch("retrieveBillOfMaterialsApparel", this.selectedNumber)
        .then((response) => {
          console.log("Retrieved Bill of Material:", response);
          // Handle the retrieved Bill of Material
          this.rowData =response.components;
          this.apparelName =response.name;
          this.showToast("Retrieved successfully"); // Show success toast
        })
        .catch((error) => {
          console.error("Error retrieving Bill of Material:", error);
          this.showToast("Error retrieving data", "error"); // Show error toast
          // Handle errors if any
        });
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          this.readFile(file);
        } else {
          alert("Please drop a valid Excel file.");
        }
      }
    },

    readFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (excelData.length > 0) {
          // Extract apparel name, number, legacy number (assuming they are in specific rows and columns)
          const apparelName = excelData[1][1];
          const apparelNumber = excelData[1][0];
          const apparelLegacyNumber = excelData[1][3];

          // Extract components data
          console.log(" excelData.slice(4)....", excelData);
          const components = excelData.slice(1).map((row) => {
            console.log("row-----", row);
            return {
              material: row[2] || "",
              quantity: parseInt(row[3]) || 0,
              unitPrice: parseFloat(row[4]) || 0,
            };
          });

          // Construct the final rowData object
          const rowData = {
            apparelName: apparelName,
            apparelNumber: apparelNumber,
            apparelLegacyNumber: apparelLegacyNumber,
            components: components,
          };

          // Set rowData
          this.rowData = rowData.components;
          this.apparelName = rowData.apparelName;
          this.apparelNumber = rowData.apparelNumber;
          console.log(" this.rowData....", this.rowData);
        } else {
          alert("Excel file is empty.");
        }
      };
      reader.readAsArrayBuffer(file);
    },
    saveToStore() {

      // Call the Vuex store action to save the data
      this.$store
        .dispatch("saveBillOfMaterialsApparel", {
          name: this.apparelName,
          components: this.rowData,
          apparelId: this.apparelNumber,
          legacyNumber: this.apparelLegacyNumber,
        })
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

<style scoped>
.save-button {
  padding: 10px;
  margin-right: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px; /* Add margin to create space between the buttons */
}

.outer {
  position: relative;
}

.inner-col {
  height: calc(100% - 60px); /* Adjust height based on button-container margin and button height */
}

.ag-theme-alpine {
  width: 100%;
  height: 100%;
}
.button-container v-btn:not(:last-child) {
  margin-right: 20px;
}
.left-space {
  margin-left: 10px;
}
</style>
