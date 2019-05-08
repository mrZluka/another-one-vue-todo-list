import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inx: 0,
    todoList: []
  },
  getters: {
    getAll (state) {
      return state.todoList;
    },
    getDone (state) {
      return state.todoList.filter(val => val.done);
    },
    getUndone (state) {
      return state.todoList.filter(val => !val.done);
    }
  },
  mutations: {
    updateItem(state, val) {
      let item = null;
      let mathItems = state.todoList.filter( item => item.id === val.id || item.value === val.value);
      if (mathItems.length) {
        item = mathItems[0];
        item.value = val.value;
        item.done = val.done;
      } else {
        item = {value: val.value, done: false, id: ++state.inx};
        state.todoList.push(item);
      }
    },
    clearItem(state, val) {
      let itemList = state.todoList.filter( item => item.id === val.id);
      itemList.forEach(item => state.todoList.splice(state.todoList.indexOf(item), 1));
    }
  },
  actions: {
    update(context, value) {
      if (value.value) {
        context.commit('updateItem', value);
      } else {
        context.commit('clearItem', value);
      }
    }
  }
})
