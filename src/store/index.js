/**
 * Created by huangdi on 2017/9/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formID: '',
  },
  mutations: {
    addFood(state, item){
      state.formID = item;
    }
  },
})
