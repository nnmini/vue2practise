<template>
    <div>
      <div class="outer">
        <div style="height: 100%" class="inner-col" @dragover.prevent @drop="gridDrop($event, 'left')">
      <ag-grid-vue
        style="width: 500px; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @dragover.prevent
        @drop="handleDrop">
      </ag-grid-vue>
    </div>
    </div>
    </div>
  </template>
  
  <script>
  import { AgGridVue } from 'ag-grid-vue';
  import * as XLSX from 'xlsx';
  
  export default {
    components: {
      AgGridVue,
    },
    data() {
      return {
        columnDefs: [
          { headerName: 'Make', field: 'make' },
          { headerName: 'Model', field: 'model' },
          { headerName: 'Price', field: 'price' }
        ],
        rowData: []
      };
    },
    methods: {
        gridDrop(event, grid) {
        event.preventDefault();
        
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          const file = files[0];
          if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            this.readFile(file, grid);
          } else {
            alert('Please drop a valid Excel file.');
          }
        }
      },
      handleDrop(event) {
        console.log("event....",event)
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          const file = files[0];
          if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            this.readFile(file);
          } else {
            alert('Please drop a valid Excel file.');
          }
        }
      },
      readFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          if (excelData.length > 0) {
            // Assuming the first row is header
          //  const header = excelData[0];
            const rowData = excelData.slice(1).map(row => {
              return {
                make: row[0] || '',
                model: row[1] || '',
                price: row[2] || ''
              };
            });
            this.rowData = rowData;
          } else {
            alert('Excel file is empty.');
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };
  </script>
  
  <style>
  .ag-theme-alpine {
    /* Add any custom Ag-Grid styles here */
  }
  </style>
  