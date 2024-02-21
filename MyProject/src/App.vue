<template>
  <!-- Your application layout goes here -->
  <div id="app">
    <v-app>
      <!-- App bar component -->
      <v-app-bar app color="black" dense>
        <!-- App bar title -->
        <v-toolbar-title class="white--text">
          <svg width="54" height="54" viewBox="0 0 512.985 126.812">
          <path fill="green" d="M512.985 1.32303L215.645 126.812C183.662 140.34 133.404 155.851 112.423 122.303C100.776 103.605 108.185 74.5965 125.394 48.0678C136.38 31.1134 150.493 15.6019 164.65 0.105469C156.7 12.7461 134.742 55.2524 163.628 76.3402C174.9 84.5769 194.694 85.5388 219.237 78.9254L512.985 1.32303Z"/>
        </svg>
          
          Application</v-toolbar-title>

        <!-- Add any other app bar components, such as buttons or navigation items -->
      </v-app-bar>
      <div class="content-wrapper">

      <!-- The router-view component renders the appropriate component based on the current route -->
      <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App', // The name of your Vue component
  
  // Any additional logic or properties for your component can be defined here
};
</script>

<style>
/* Your global CSS styles */
/* You can define global styles here that will be applied to elements throughout your application */
/* For example, you can define font styles, colors, layout, etc. */
/* These styles will be scoped to the component and will not affect other components */

/* Add space between app bar and content */
.content-wrapper {
  margin-top: 70px;
}
</style>
