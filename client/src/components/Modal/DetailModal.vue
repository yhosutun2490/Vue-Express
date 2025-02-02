<template>
  <ModalBasic
    :isOpen="isOpen"
    @close="emits('close')"
  >
    <template #title>
      <h3 class="modal__title">Todo Detail</h3>
    </template>
    <template #body>
      <div class="modal__body">
        <p> Name: {{ todoDetail.name }}</p>
        <div class="todo__isDone">
          isDone:
          <div>
            <input
              type="radio"
              id="done"
              v-model="todoDetail.isDone"
              :value="true"
              name="done"
              :checked="todoDetail.isDone"
              disabled
            />
            <label for="done">Done</label>
           </div>
          <div>
            <input
              type="radio"
              id="pending"
              v-model="todoDetail.isDone"
              :value="false"
              name="pending"
              :checked="!todoDetail.isDone"
              disabled
            />
            <label for="pending">Pending</label>
            </div>
        </div>
        <p> Time: {{ todoDetail.time }} </p>
      </div>
    </template>
    <template #button="{close}">
      <div class="modal__btn__wrap">
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
const emits = defineEmits(['close'])
const todoDetail = ref({})
const getTodoById = inject('getTodoById')

async function getTodoByUniqueId(id) {
  try {
    if (!id) {
      return
    }
    console.log('getTodoById')
    const data = await getTodoById(id)
    todoDetail.value = data
  } catch(err) {
    console.warn('get todo by id err',err)
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
