<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  catImage: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['close'])

function closeModal() {
  emits('close')
}
</script>

<template>
  <div 
    class="modal" 
    v-if="isOpen"
  >
    <div class="modal-content">
      <span class="close" @click="closeModal">×</span>
      <img :src="catImage" alt="Cat" />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  max-width: 100%;
  max-height: 100%;
  display: flex; 
  justify-content: center; 
  align-items: center;
  background-color: rgba(0,0,0,0.7);
}

.modal-content {
  position: relative;
  background: #fff;
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

.modal-content img {
  animation: fadeIn 0.6s ease-in;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.close {
  position: absolute;
  font-weight: bold;
  top: -3px;
  right: 17px;
  cursor: pointer;
  font-size: 3rem;
  transition: color 0.3s;
  z-index: 2;
}

.close:hover {
  color: #516bff;
}

</style>