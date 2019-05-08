<template>
    <div>
        <label v-show="!!inputVal">
            <input class="todo-check" type="button" value="x" @click="deleteItem"/>
        </label>
        <label v-show="!!inputVal">
            <input class="todo-check" type="checkbox" v-model="done" @change="onChecked"/>
        </label>
        <label>
            <input ref="input" class="todo-input" type="text" v-model="inputVal" @keypress.enter="onKeyPress" @blur="onBlur" @focus="onFocus"/>
        </label>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props:['value'],
        watch: {
          value(item) {
              this.inputVal = item.value;
              this.done = item.done;
              this.id = item.id;
          }
        },
        data() {
            return {
                inputVal: this.value ? this.value.value : "",
                id: this.value ? this.value.id : "",
                done: this.value ? this.value.done : false,
                prevVal: ""
            }
        },
        methods: {
            onChecked() {
                this.$emit("updateValue", {id: this.id, value: this.inputVal, done:this.done});
            },
            deleteItem() {
                this.$emit("updateValue", {id: this.id});
            },
            onKeyPress() {
                  this.onBlur();
            },
            onBlur() {
                if ((this.inputVal || this.prevVal ) && this.inputVal !== this.prevVal) {
                    this.$emit("updateValue", {isNew:true, id: this.id, value: this.inputVal, done:this.done});
                }
            },
            onFocus() {
                this.prevVal = this.inputVal;
            },
            clearAndFocus() {
                this.inputVal = this.prevVal = "";
                this.$refs.input.focus();
            }
        }
    }
</script>

<style scoped>
    .todo-check {
        transform: scale(1.5);
        margin-right: 10px;
    }
    .todo-input {
        font-size: 1.8rem;
        border: none;
        border-bottom: 1px solid black;
        outline: none;
        width: 45%;
    }
</style>
