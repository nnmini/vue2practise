import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CarDetailsPage from '../views/CarDetailsPage.vue';
import AddNewCarPage from '../views/AddNewCarPage.vue';
import ApparelDetailsPage from '../views/ApparelDetailsPage.vue'; // Import the ApparelDetailsPage component
import AddNewApparelPage from '../views/AddNewApparelPage.vue'; // Import the AddNewApparelPage component

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/car/:id',
    name: 'CarDetails',
    component: CarDetailsPage,
    props: true
  },
  {
    path: '/add-new-car',
    name: 'AddNewCar',
    component: AddNewCarPage
  },
  {
    path: '/apparel/:id', // Route for apparel details
    name: 'ApparelDetails',
    component: ApparelDetailsPage,
    props: true
  },
  {
    path: '/add-new-apparel', // Route for adding a new apparel
    name: 'AddNewApparel',
    component: AddNewApparelPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
