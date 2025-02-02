<template>
  <div class="todo__list__container">
    <div class="header">
      <h1 class="title">Todo List</h1>
      <button class="btn__create" @click="openModal='create'">Create</button>
    </div>
    <div class="todo__list__section">
      <div class="todo__item" v-for="item in todos" :key="item.id">
        <span class="todo__name">{{item.name}}</span>
        <button class="btn__normal">Delete</button>
        <button class="btn__normal" @click="handleTodoEdit(item._id)">Edit</button>
        <button class="btn__normal" @click="handleTodoDetail(item._id)">Detail</button>
      </div>
    </div>
    <createTodoModal
      :isOpen="openModal === 'create'"
      @close="openModal = ''"
    />
    <DetailModal
      :isOpen="openModal === 'detail'"
      :id="detailId"
      @close="openModal = '', detailId = ''"
    />
    <EditTodoModal
      :isOpen="openModal === 'edit'"
      :id="detailId"
      @close="openModal = '', detailId = ''"
    />
  </div>
</template>
<script setup>
import useTodos from '@/composable/useTodos';
import { onMounted, provide, ref} from 'vue';
import createTodoModal from '@/components/Modal/CreateModal.vue';
import DetailModal from '@/components/Modal/DetailModal.vue';
import EditTodoModal from '@/components/Modal/EditTodoModal.vue';

const {
  todos,
  getTodos,
  getTodoById,
  createTodo,
  editTodo
} = useTodos()
const openModal = ref('')
const detailId = ref('')

onMounted(async ()=> await getTodos())
provide('createTodo',createTodo)
provide('getTodoById',getTodoById)
provide('editTodo', editTodo)

function handleTodoDetail(id) {
  detailId.value = id
  openModal.value = 'detail'
}

function handleTodoEdit(id) {
    detailId.value = id
  openModal.value = 'edit'
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
.btn__create {
  height: 40px;
  background: none;
  border: 2px solid white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: white;
}
.btn__normal {
  width: 60px;
  height: 30px;
  background: rgb(243, 229, 229);
  border: 2px solid rgb(173, 179, 248);
  border-radius: 8px;
  cursor: pointer;
  color: rgb(0, 0, 0);
  margin-left: 0.5rem;
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
  display: flex;
  align-items: center;
}

.todo__name {
  margin-right: auto;
}


</style>
