<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex justify-center mb-6">
      <div class="w-1/2">
        <h1 class="text-sm font text-center">
          Currently we have collected {{ imagesCount }} images, the target is
          10,000
        </h1>
      </div>
    </div>
    <button
      @click="start"
      :class="{ 'opacity-0': inApp }"
      class="bg-white text-theme-100 text-2xl w-20 h-20 rounded-full transition-all duration-700 hover:bg-theme-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-16 h-16 m-auto"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </svg>
    </button>
    <!--
    <div class="form-control w-full max-w-xs mt-3 text-theme-100 font-bold transition-all duration-700" :class="{ 'opacity-0': inApp }">
      <input v-model="time" type="number" max="20" min="2" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
      <label class="label">
        <span class="label-text-alt text-gray-100 m-auto">Time to draw (seconds)</span>
      </label>
    </div>  
    -->

    <select
      v-model="time"
      class="select select-ghost w-full max-w-xs mt-5 transition-opacity duration-700"
      :class="{ 'opacity-0': inApp }"
    >
      <option value="2">2s</option>
      <option value="3">3s</option>
      <option value="4">4s</option>
      <option value="5">5s</option>
      <option value="6">6s</option>
      <option value="7">7s</option>
      <option value="8">8s</option>
      <option value="9">9s</option>
      <option value="10">10s</option>
    </select>
  </div>
</template>

<script>
import { getStorage, ref, listAll } from "firebase/storage";
import { initializeApp } from "firebase/app";

  // replace with your firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const folderPath = "/dataset";
const folderRef = ref(storage, folderPath);

export default {
  name: "startPage",
  mounted() {
    listAll(folderRef)
      .then((res) => {
        this.imagesCount = res.items.length;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  data() {
    return {
      inApp: false,
      time: 3,
      imagesCount: 0,
    };
  },
  methods: {
    start() {
      this.inApp = true;
      console.log(this.inApp);
      setTimeout(() => {
        this.$emit("startApp", this.time);
      }, 700);
    },
  },
  computed: {},
  watch: {},
};
</script>
