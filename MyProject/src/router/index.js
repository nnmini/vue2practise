import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ApparelDetailsPage from '../views/ApparelDetailsPage.vue';
import AddNewApparelPage from '../views/AddNewApparelPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/apparel/:id',
    name: 'ApparelDetails',
    component: ApparelDetailsPage,
    props: true
  },
  {
    path: '/add-new-apparel',
    name: 'AddNewApparel',
    component: AddNewApparelPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
