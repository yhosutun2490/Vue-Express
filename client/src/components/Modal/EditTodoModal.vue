<template>
  <ModalBasic
    :isOpen="isOpen"
    @close="emits('close')"
  >
    <template #title>
      <h3 class="modal__title">Edit Todo Detail</h3>
    </template>
    <template #body>
      <div class="modal__body">
        <div>
          Name:
          <input type="text" v-model="form.name">
        </div>
        <div class="todo__isDone">
          isDone:
          <div>
            <input
              type="radio"
              id="done"
              v-model="form.isDone"
              :value="true"
              name="done"
              :checked="form.isDone"
            />
            <label for="done">Done</label>
           </div>
          <div>
            <input
              type="radio"
              id="pending"
              v-model="form.isDone"
              :value="false"
              name="pending"
              :checked="!form.isDone"
            />
            <label for="pending">Pending</label>
            </div>
        </div>
        <div>
          Time:
          <input
            type="date"
            v-model="form.time"
          >
        </div>
      </div>
    </template>
    <template #button="{close}">
      <div class="modal__btn__wrap">
        <button @click="editTodoById(form._id)" class="modal__btn">Edit</button>
        <button @click="close" class="modal__btn">Close</button>
      </div>
    </template>
</ModalBasic>
</template>
<script setup>
import ModalBasic from './ModalBasic.vue';
import { ref, inject, watch } from 'vue';
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ""
  }
})
const emits = defineEmits(['close','refresh'])
const form = ref({
  name: '',
  isDone: false,
  time: ''
})
const getTodoById = inject('getTodoById')
const editTodo = inject('editTodo')

async function getTodoByUniqueId(id) {
  try {
    if (!id) {
      return
    }
    const data = await getTodoById(id)
    const time = data?.time?.split('T')[0]
    form.value = data
    form.value.time = time
  } catch(err) {
    console.warn('get todo by id err',err)
  }
}

async function editTodoById(id) {
  try {
    if (!id) return
    const name = form.value.name
    const isDone = form.value.isDone
    const time = form.value.time
    await editTodo({
      name: name,
      isDone: isDone,
      time: time
    },id)
    emits('close')
    emits('refresh')
  } catch(err) {
    console.warn('edit todo by id err',err)
  }
}

watch(()=>props.id,async(val)=>{
  await getTodoByUniqueId(val)
})
</script>
<style scoped>
.modal__title {
  width: 100%;
  background: rgb(211, 254, 249);
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
.todo__isDone {
  display: flex;
}
</style>
