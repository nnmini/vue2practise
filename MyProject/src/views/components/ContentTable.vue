<template>
    <div class="ag-theme-alpine" style="height: 400px;">
      <ag-grid-vue
        :gridOptions="gridOptions"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
      />
    </div>
  </template>
  
  <script>
  import { AgGridVue } from "ag-grid-vue3";
  
  export default {
    components: {
      AgGridVue,
    },
    data() {
      return {
        columnDefs: [
          { headerName: "Content Column 1", field: "contentCol1" },
          { headerName: "Content Column 2", field: "contentCol2" },
          { headerName: "Content Column 3", field: "contentCol3" },
        ],
        rowData: [
          { contentCol1: "Data 1", contentCol2: "Data 2", contentCol3: "Data 3" },
        ],
        gridOptions: {
          defaultColDef: {
            resizable: true,
          },
        },
      };
    },
  };
  </script>
  
  <style>
  .ag-theme-alpine {
    width: 100%;
  }
  </style>
  