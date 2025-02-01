<template>
  <div class="todo__list__container">
    <div class="header">
      <h1 class="title">Todo List</h1>
      <button class="btn create" @click="isShowCreateModal=true">Create</button>
    </div>
    <div class="todo__list__section">
      <div class="todo__item" v-for="item in todos" :key="item.id">
        {{item.name}}

      </div>
    </div>
    <createTodoModal
      :isOpen="isShowCreateModal"
      @close="isShowCreateModal = false"
    >
      <template #title>
        <h3 class="modal__title">Create New Todo</h3>
      </template>
      <template #body>
        <div class="modal__body">
          <input type="text" v-model="newTodo" class="input">
        </div>
      </template>
      <template #button="{close}">
        <div class="modal__btn__wrap">
          <button class="modal__btn add" @click=addNewTodo>Add</button>
          <button @click="close" class="modal__btn">Close</button>
        </div>
      </template>

    </createTodoModal>
  </div>
</template>
<script setup>
import useTodos from '@/composable/useTodos';
import { onMounted, ref } from 'vue';
import createTodoModal from '@/components/Modal/createTodoModal.vue';

const {
  todos,
  getTodos,
  createTodo
} = useTodos()
onMounted(async ()=> await getTodos())

const newTodo = ref('')
const isShowCreateModal = ref(false)


async function addNewTodo() {
  try {
    if (!newTodo.value.trim()) {
      return
    }
    await createTodo(newTodo.value)
  } catch(err) {
    console.warn('addNewTodo err',err)
  }

}
</script>
<style scoped >
.todo__list__container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 60px 1fr;
}
.header {
  width: 100%;
  height: 100%;
  background: rgb(224, 162, 47);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.btn {
  height: 40px;
  background: none;
  border: 2px solid white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: white;
}

.todo__list__section {
  background: rgb(230, 230, 230);
  padding: 2rem 3.5rem;
}
.todo__item {
  width: max(50%,200px);
  border: 1px solid grey;
  border-radius: 8px;
  background: rgb(241, 241, 241);
  padding: 0.5rem 1rem;
  margin: 0 auto 0.8rem auto;
}


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

.input {
  width: 100%;
  height: 2rem;
}
</style>
