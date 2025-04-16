<script setup>
import { ref, onMounted } from 'vue'
import { getCats } from '../js/CatService.js'
import Modal from './modal.vue'

const cats_img = ref([])
const isLoading = ref(false)

const isModalOpen = ref(false)
const selectedCat = ref('')

async function loadCats() {
  isLoading.value = true
  const data = await getCats()
  cats_img.value = data
  isLoading.value = false
}

function openModal(url) {
  selectedCat.value = url
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedCat.value = ''
}

onMounted(loadCats)
</script>

<template>
  <div class="container">
    <div class="gallery-header">
      <h1>Cat Gallery</h1>
      <p>Click on the image to see the cat in full size</p>
      <p>Click on the button to refresh the cats</p>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loader"></div>
      <h2 style="margin-left: 10px;">Loading...</h2>
    </div>

    <div class="gallery-container" v-else>
      <div 
        class="cat-item"
        v-for="cat in cats_img"
        :key="cat.id"
      >
        <img :src="cat.url" alt="cat" @click="openModal(cat.url)" />
      </div>
    </div>

    <div class="button-container">
      <button @click="loadCats">Refresh Cats</button>
    </div>

    <Modal 
      :isOpen="isModalOpen" 
      :catImage="selectedCat"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
* {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
               'Lucida Sans Unicode', Geneva, Verdana, sans-serif, sans-serif;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  border: 10px solid #4335A7;
}

.button-container {
  text-align: center;
}

.gallery-header {
  background-color: #4335A7;
  text-align: center;
  color: #FFF6E9;
  width: 100%;
  padding: 10px 0;
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.cat-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s;

}

.cat-item img:hover {
  transform: scale(1.03);
  cursor: pointer;
}

button {
  background-color: #4335A7;
  color: #FFF6E9;
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 2.5rem;
  cursor: pointer;
  margin: 10px auto;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #372e83;
}

.loader {
  margin: 20px auto;
  border: 6px solid #ddd;
  border-top: 6px solid #4335A7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (max-width: 1400px) {
  .gallery-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    padding: 15px;
  }
  .cat-item img {
    height: 250px;
  }
}

@media screen and (max-width: 1000px) {
  .gallery-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px;
  }
  .cat-item img {
    height: 200px;
  }
}

@media screen and (max-width: 600px) {
  .container {
    border: 5px solid #4335A7;
  }
  .gallery-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    padding: 5px;
  }
  button {
    font-size: 2rem;
    padding: 10px 14px;
  }
  .cat-item img {
    height: 150px;
  }
}

@media screen and (max-width: 350px) {
  .gallery-container {
    grid-template-columns: repeat(1, 1fr);
  }
  button {
    font-size: 1.5rem;
    padding: 8px 12px;
  }
  .cat-item img {
    height: 100px;
  }
}
</style>