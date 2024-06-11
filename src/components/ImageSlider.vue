<script setup>
import { ref, computed } from 'vue'
const currentIndex = ref(0)
const images = ref([
  'https://picsum.photos/800/500?random=1',
  'https://picsum.photos/800/500?random=2',
  'https://picsum.photos/800/500?random=3',
  'https://picsum.photos/800/500?random=4',
  'https://picsum.photos/800/500?random=5'
])

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`
}))

const prev = () => {
  currentIndex.value = (currentIndex.value + images.value.length - 1) % images.value.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
</script>

<template>
  <div>
    <h1 style="text-align: center">Below is a carousel developed using vanilla JS & SCSS</h1>
    <div class="carousel">
      <div class="carousel-wrapper" :style="wrapperStyle">
        <div class="carousel-item" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Random Image" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prev">‹</button>
      <button class="carousel-control next" @click="next">›</button>
    </div>
  </div>
</template>

<style lang="scss">
.carousel {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 20px;

  .carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;

    .carousel-item {
      min-width: 100%;
      transition: opacity 0.5s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
  }

  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
    font-size: 24px;
    border-radius: 8px;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
}
</style>
