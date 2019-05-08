<template>
  <div id="app">
    <h1>TODOs test</h1>
    <div>
      <input type="button" value="All" @click="show()"/>
      <input type="button" value="Done" @click="show(1)"/>
      <input type="button" value="Undone" @click="show(2)"/>
    </div>
    <div>
      <TodoItem v-for="item in getActiveList" @updateValue="onUpdate" :key="item.id" :value="item"/>
      <TodoItem v-bind="$attrs" ref="last" @updateValue="onUpdate"/>
    </div>
  </div>
</template>

<script>

import TodoItem from "./components/TodoItem";
import {mapGetters} from "vuex";

export default {
  name: 'app',
  components: {
    TodoItem
  },
  data() {
    return {
        activeFilter: 0
    }
  },
  computed: {
    ...mapGetters(['getAll', 'getDone', 'getUndone']),
      getActiveList() {
          if (!this.activeFilter) return  this.getAll;
          if (this.activeFilter === 1) return this.getDone;
          return this.getUndone;
      }
  },
  methods: {
    onUpdate(value) {
      this.$store.dispatch("update", value);
      if (value.isNew) {
          this.$refs.last.clearAndFocus();
      }
    },
    show(filter) {
        this.activeFilter = filter;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
