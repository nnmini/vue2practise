import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  carModels: [],
  billOfMaterialsCars: {},
  apparels: [],
  billOfMaterialsApparels: {},
};

const mutations = {
  setCarModels(state, carModels) {
    state.carModels = carModels;
  },
  setBillOfMaterialsCars(state, { carId, billOfMaterial }) {
    Vue.set(state.billOfMaterialsCars, carId, billOfMaterial);
  },
  setApparels(state, apparels) {
    state.apparels = apparels;
  },
  setBillOfMaterialsApparels(state, { apparelId, billOfMaterial }) {
    Vue.set(state.billOfMaterialsApparels, apparelId, billOfMaterial);
  },
};

const actions = {
  async fetchCarModels({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/cars');
      const carModels = response.data;
      commit('setCarModels', carModels);
    } catch (error) {
      console.error('Error fetching carModels:', error);
    }
  },
  async fetchBillOfMaterialsCars({ commit }, carId) {
    try {
      const response = await axios.get(`http://localhost:3000/billofmaterials/cars/${carId}`);
      const billOfMaterial = response.data;
      commit('setBillOfMaterialsCars', { carId, billOfMaterial });
    } catch (error) {
      console.error('Error fetching bill of materials for cars:', error);
    }
  },
  async fetchApparels({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/apparels');
      
      const apparels = response.data;
      console.log("apparels....",apparels)
      commit('setApparels', apparels);
    } catch (error) {
      console.error('Error fetching apparels:', error);
    }
  },
  async fetchBillOfMaterialsApparels({ commit }, apparelId) {
    try {
      const response = await axios.get(`http://localhost:3000/billofmaterials/apparels/${apparelId}`);
      const billOfMaterial = response.data;
      commit('setBillOfMaterialsApparels', { apparelId, billOfMaterial });
    } catch (error) {
      console.error('Error fetching bill of materials for apparels:', error);
    }
  },
  async saveBillOfMaterialsApparel( {commit}, billOfMaterial) {
    try {
      const response = await axios.post(`http://localhost:3000/billofmaterials/apparel/${billOfMaterial.number}`, billOfMaterial);
      console.log('Response:', response.data);
      console.log("commit...",commit)
      // Handle response if needed
    } catch (error) {
      console.error('Error saving bill of materials for apparel:', error);
    }
  },
  async retrieveBillOfMaterialsApparel({ commit }, apparelNumber) {
    try {
      console.log("commit....",commit)
      const response = await axios.get(`http://localhost:3000/billofmaterials/apparel/${apparelNumber}`);
      const billOfMaterial = response.data;
      return billOfMaterial; // Return the retrieved bill of material
      
    } catch (error) {
      console.error('Error retrieving bill of materials for apparel:', error);
      throw error; // Throw the error for handling in the component
    }
  },
};

const getters = {
  carModels: state => state.carModels,
  billOfMaterialsCars: state => carId => state.billOfMaterialsCars[carId] || {},
  apparels: state => state.apparels,
  billOfMaterialsApparels: state => apparelId => state.billOfMaterialsApparels[apparelId] || {},
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
