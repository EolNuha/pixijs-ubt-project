<script setup>
import javascript from '@/assets/javascript.mp4'
</script>

<template>
  <div class="video">
    <div>
      <h1>How to learn Javascript?</h1>
      <p>
        Javascript is the backbone of web development! One of the best ways to learn javascript is
        through video tutorials. On the right you can see one my favorite creators explaining
        javascript in under 100 seconds :)
      </p>
    </div>
    <video controls preload="auto" :src="javascript"></video>
  </div>
</template>

<style lang="scss">
.video {
  display: flex;
  align-items: center;
  gap: 20px;
  div {
    flex: 1 1 auto;
  }
  video {
    width: 400px;
    border-radius: 8px;
  }
}

@media (max-width: 800px) {
  .video {
    flex-direction: column;
    video {
      width: 300px;
    }
  }
}
</style>
