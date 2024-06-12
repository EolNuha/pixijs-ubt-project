<script setup>
import { sendForm } from '@emailjs/browser'
import { ref } from 'vue'

const loading = ref(false)
const success = ref(false)
const form = ref()
const info = ref({
  name: '',
  email: '',
  message: ''
})

function sendEmail() {
  loading.value = true
  sendForm('service_53c0xpg', 'template_uvinz95', form.value, 'user_1wflK7WkbyVGouoePZaLU')
    .then(
      (result) => {
        loading.value = false
        console.log('SUCCESS!', result.text)
        info.value = {
          name: '',
          email: '',
          message: ''
        }
        success.value = true
        setTimeout(function () {
          success.value = false
        }, 4000)
      },
      (error) => {
        loading.value = false
        console.log('FAILED...', error.text)
      }
    )
    .catch((error) => {
      loading.value = false
      console.log('FAILED...', error.text)
    })
}
</script>

<template>
  <div id="contact">
    <div class="section-title mt-10">
      <h1>Get In Touch</h1>
    </div>
    <div>
      <form @submit.prevent="sendEmail" ref="form">
        <div class="grid grid-cols-2 gap-[20px]">
          <input
            type="text"
            placeholder="Full name"
            class="rounded border p-3"
            name="fullName"
            v-model="info.name"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            class="rounded border p-3"
            v-model="info.email"
            name="email"
            required
          />
        </div>
        <textarea
          placeholder="Your message"
          class="w-full rounded border p-3 mt-[20px]"
          name="message"
          v-model="info.message"
          required
        ></textarea>
        <button type="submit" class="rounded p-3 w-full submit-btn flex justify-center">
          <span v-if="!loading">Submit</span>
          <div role="status" v-else>
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </button>
      </form>
    </div>
    <div
      id="toast-success"
      class="fixed top-[10px] right-[20px] flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-gray-200 rounded-lg shadow"
      role="alert"
      v-if="success"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="ml-3 text-sm font-normal">Email sent successfully!</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submit-btn {
  background: linear-gradient(60deg, rgba(32, 33, 36, 1) 0%, rgb(79, 79, 79) 100%);
  color: white;
  margin-top: 20px;
}

.grid {
  display: grid;
  gap: 20px;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.w-full {
  width: 100%;
}

.p-3 {
  padding: 0.75rem;
}

.border {
  border-width: 1px;
}

.rounded {
  border-radius: 0.25rem;
}

.mt-\[20px\] {
  margin-top: 20px;
}

textarea {
  resize: vertical;
}

.fixed {
  position: fixed;
  top: 10px;
  right: 20px;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.w-full {
  width: 100%;
}

.max-w-xs {
  max-width: 20rem; /* 320px */
}

.p-4 {
  padding: 1rem; /* 16px */
}

.mb-4 {
  margin-bottom: 1rem; /* 16px */
}

.text-gray-500 {
  color: #718096; /* Or any desired shade of gray */
}

.bg-gray-200 {
  background-color: #edf2f7; /* Or any desired shade of gray */
}

.rounded-lg {
  border-radius: 0.5rem; /* 8px */
}

.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Or any desired shadow */
}

.w-5 {
  width: 1.25rem; /* 20px */
}

.h-5 {
  height: 1.25rem; /* 20px */
}

.w-6 {
  width: 1.5rem; /* 24px */
}

.h-6 {
  height: 1.5rem; /* 24px */
}

.text-gray-200 {
  color: #edf2f7; /* Or any desired shade of gray */
}

.dark .text-gray-600 {
  color: #718096; /* Or any desired shade of gray */
}

.fill-white {
  fill: #ffffff; /* Or any desired color */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
