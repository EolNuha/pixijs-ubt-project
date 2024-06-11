<script setup>
// import PixiJs from '../components/PixiJs.vue'
import Header from '../components/HeaderComp.vue'
import ImageSlider from '../components/ImageSlider.vue'
</script>

<template>
  <!-- <PixiJs /> -->
  <Header />
  <div class="main">
    <ImageSlider />
  </div>
</template>

<style lang="scss">
.main {
  max-width: 1120px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 20px;
}
</style>
