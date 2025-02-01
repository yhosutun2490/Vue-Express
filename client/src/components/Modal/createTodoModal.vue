<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div
      class="modal-content"
      @click.stop
      :class="{ 'modal-show': isVisible, 'modal-hide': !isVisible }"
    >
      <slot name="title"></slot>
      <slot name="body"></slot>
      <slot name="button" :close="close">
        <button class="close-button" @click="close">關閉</button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 傳入 `isOpen` 控制是否顯示 Modal
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:isOpen']);

const isVisible = ref(false);

watch(() => props.isOpen, (newValue) => {
  isVisible.value = newValue;
});

// 關閉 Modal
const close = () => {
  isVisible.value = false;
  setTimeout(() => {
    // 延遲更新，配合動畫
    emits('close');
  }, 300); // 與動畫時長一致
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  transform: scale(0.8);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-show {
  transform: scale(1);
  opacity: 1;
}

.modal-hide {
  transform: scale(0.8);
  opacity: 0;
}

.close-button {
  background: #ff5757;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.close-button:hover {
  background: #ff2b2b;
}
</style>
