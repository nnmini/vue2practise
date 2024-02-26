<template>
    <div class="ag-theme-alpine" style="height: 50px;">
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
          { headerName: "Header Column 1", field: "headerCol1" },
          { headerName: "Header Column 2", field: "headerCol2" },
          { headerName: "Header Column 3", field: "headerCol3" },
        ],
        rowData: [],
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
  