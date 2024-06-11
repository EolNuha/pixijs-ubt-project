<script setup>
import { Application, Assets, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'

const pixiContainer = ref(null)

async function initPixi() {
  // Create a Pixi Application
  const app = new Application()

  await app.init()

  // Append the Pixi canvas to the container
  pixiContainer.value.appendChild(app.canvas)

  // Example: Create a Pixi Graphics object
  const texture = await Assets.load(
    'https://media.istockphoto.com/id/1370481100/photo/the-rabbit.jpg?s=612x612&w=0&k=20&c=JWoMK7ZTr9-3BvfMl8l-1h3LHY2xuGAEEXFiUKO5ifM='
  )

  // This creates a texture from a 'bunny.png' image
  const bunny = new Sprite(texture)

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2
  bunny.y = app.renderer.height / 2

  // Rotate around the center
  bunny.anchor.x = 0.5
  bunny.anchor.y = 0.5

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny)

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01
  })
}

onMounted(() => {
  initPixi()
})
</script>

<template>
  <div ref="pixiContainer"></div>
</template>
