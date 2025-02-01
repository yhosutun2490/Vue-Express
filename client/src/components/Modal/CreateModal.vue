<template>
  <ModalBasic
    :isOpen="isOpen"
    @close="emits('close')"
  >
    <template #title>
      <h3 class="modal__title">Create New Todo</h3>
    </template>
    <template #body>
      <div class="modal__body">

        <div class="label">
          <p>Title</p>
          <input type="text" v-model="newTodo" class="input" name="todo">
        </div>

        <div class="label">
          <p>Time</p>
          <input type="date" v-model="time" class="input__date" name="time">
        </div>
      </div>
    </template>
    <template #button="{close}">
      <div class="modal__btn__wrap">
        <button class="modal__btn add" @click=addNewTodo>Add</button>
        <button @click="close" class="modal__btn">Close</button>
      </div>
    </template>
</ModalBasic>
</template>
<script setup>
import ModalBasic from './ModalBasic.vue';
import { ref, inject } from 'vue';
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close'])
const newTodo = ref('')
const time = ref('')
const createTodo = inject('createTodo')
async function addNewTodo() {
  try {
    if (!newTodo.value.trim() || !time.value) {
      return
    }
    await createTodo(newTodo.value,time.value)
  } catch(err) {
    console.warn('addNewTodo err',err)
  }

}
</script>
<style scoped>
.modal__title {
  width: 100%;
  background: rgb(243, 254, 211);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
.modal__body, .modal__btn__wrap,.modal__title {
  padding: 1.25rem;
}
.modal__btn__wrap {
  display: flex;
  justify-content: flex-end;
}
.modal__btn {
  height: 40px;
  background: none;
  border: 2px solid grey;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: black;
  margin-left: 1.5rem;
  width: 80px;
}
.label {
  margin-bottom: 1rem;
  height: auto;
}
.input {
  width: 100%;
  height: 2rem;
}
.input__date {
  width: 30%;
  height: 2rem;
}
</style>
