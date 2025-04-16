<script setup>
import { defineProps, defineEmits, watch } from 'vue'

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

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div 
    class="modal" 
    v-if="isOpen"
  >
    <div class="modal-content">
      <span class="close" @click="closeModal">×</span>
      <img :src="catImage" alt="Cat in full size" />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex; 
  justify-content: center; 
  align-items: center;
  background-color: rgba(0,0,0,0.7);
  z-index: 100;
}

.modal-content {
  position: relative;
  background: #fff;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  overflow: hidden;
  z-index: 101;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
  animation: fadeIn 0.6s ease-in forwards;
  opacity: 0;
  display: block;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.close {
  position: absolute;
  top: -3px;
  right: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 2.5rem;
  z-index: 10001;
  transition: color 0.3s;
  color: #333;
}

.close:hover {
  color: #516bff;
}
</style>
