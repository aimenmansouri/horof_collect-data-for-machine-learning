<template>
    <div class="relative flex flex-col h-screen items-center justify-center pt-20">
      <div :class="{'translate-x-0 opacity-100':showUploadMessage}"
      class="absolute top-5 left-5 p-2 rounded-full rounded-tl-none bg-theme-300 
      duration-500 transition-all opacity-0 -translate-x-24">
        <span>{{ uploadMassage }}</span>
      </div>
        <h1 class="text-7xl mb-5 duration-700 transition-all" :class="{'translate-x-72 opacity-0':closing}">{{ letter }}</h1>
        <div class="mb-1 duration-700 transition-all" :class="{'translate-x-72 opacity-0':closing}">
            <progress class="progress progress-success w-56" :value="bar" max="100"></progress>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg duration-700 transition-all" :class="{'-translate-x-72 opacity-0':closing}">
            <canvas class="bg-white m-auto rounded" ref="canvas" width="300" height="300"></canvas>
        </div>
        <button @click="close" class="mx-auto mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>  
        </button>
    </div>  
  </template>
  
  <script>

import { initializeApp } from 'firebase/app';
import {getStorage , ref , uploadBytes } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { v4 as uuidv4 } from 'uuid';

      const firebaseConfig = {
        apiKey: "AIzaSyA9OGGwxGYCr4OLsWuQHLiT_V3Uv3H2ZdM",
        authDomain: "horof-4b898.firebaseapp.com",
        projectId: "horof-4b898",
        storageBucket: "horof-4b898.appspot.com",
        messagingSenderId: "442474958455",
        appId: "1:442474958455:web:d74d76c540234c23888072",
        measurementId: "G-1XD3HHGZJ3"
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const storage = getStorage()
      const analytics = getAnalytics(app);

  function getLetter(letters) {
    const x = Math.floor(Math.random() * letters.length);
    const y = Math.floor(Math.random() * letters[x].length);

    return letters[x][y]
  }

  export default {
    props:['time'],
    emits: ['closeDrawing'],
    data () {
        return {
            closing : false,
            bar : 0,
            alpha2 : [
                        ["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ف","م","ن","ه","و","ي","ء","أ","إ","آ"]
                        ,["ا","بـ","تـ","ثـ","جـ","حـ","خـ","د","ذ","ر","ز","سـ","شـ","صـ","ضـ","طـ","ظـ","عـ","غـ","فـ","قـ","كـ","لـ","مـ","نـ","هـ","ـو","يـ","أ ؤ"]
                        ,["ـا","ـبـ","ـتـ","ـثـ","ـجـ","ـحـ","ـخـ","ـد","ـذ","ـر","ـز","ـسـ","ـشـ","ـصـ","ـضـ","ـطـ","ـظـ","ـعـ","ـغـ","ـفـ","ـقـ","ـكـ","ـلـ","ـمـ","ـنـ","ـهـ","—-","ـيـ","ـئـ"]
                        ,["ـا","ـب","ـت ـة","ـث","ـج","ـح","ـخ","ـد","ـذ","ـر","ـز","ـس","ـش","ـص","ـض","ـط","ـظ","ـع","ـغ","ـف","ـق","ـك","ـل","ـم","ـن","ـه","ـو","ـي","ئ"]
                      ],
            letter : 'loading ...',
            uploadMassage : 'Image uploaded 👍',
            showUploadMessage : false
        }
    },
    methods : {
      newLetter() {
      if (this.bar >= 100) {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext("2d");
        const img = new Image();
        img.src = canvas.toDataURL("image/png");
        const canvasTemp = document.createElement('canvas');
        canvasTemp.width = 56;
        canvasTemp.height = 56;
        const contextTemp = canvasTemp.getContext('2d');
        const imageName = uuidv4()+'_'+this.letter

        img.onload = () => {
            contextTemp.drawImage(img, 0, 0, 56, 56);
            canvasTemp.toBlob((resizedBlob) => {
              const storageRef = ref(storage, 'dataset/'+imageName+'.png');
              const metadata = {
                contentType: 'image/png',
              };
              const uploadTask = uploadBytes(storageRef, resizedBlob, metadata)
              .then((res) => {
                this.uploadMassage = 'Image uploaded 👍'
                this.showUploadMessage = true
                setTimeout(() => {
                      this.showUploadMessage = false
                  }, 2000)
              }).catch((err) => {
                this.uploadMassage = 'Error occurred ❌'
                this.showUploadMessage = true
                setTimeout(() => {
                      this.showUploadMessage = false
                  }, 2000)
              });
          }, 'image/png', 1);

          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        


        /*
        const imageName = uuidv4()+'_'+this.alpha[this.letter]
        const storageRef = ref(storage, 'dataset/'+imageName+'.png');
        const metadata = {
          contentType: 'image/png',
        };
        const blob = dataURItoBlob(img.src);

        const uploadTask = uploadBytes(storageRef, blob, metadata)
        
        */

        
        // update the letter and progress bar
        this.bar = 0;
        this.letter = getLetter(this.alpha2)
      } else {
        this.bar += 100 / this.time;
      }
    },

        close(){
            this.closing = true
            clearInterval(this.intervalId);
            setTimeout(() => {
                this.$emit('closeDrawing');
            }, 700)
        }
    },
    mounted() {
      //update the letter
      this.letter = getLetter(this.alpha2)
      this.intervalId = setInterval(this.newLetter, 1000);

      this.closing = false
      const canvas = this.$refs.canvas;
      const canvasRect = canvas.getBoundingClientRect();
      const context = canvas.getContext("2d");
      let isDrawing = false;
      let lastX = canvasRect.x;
      let lastY = canvasRect.y;
  
      context.lineWidth = 10;
      context.lineJoin = "round";
      context.lineCap = "round";
  
      // Mouse event 
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("mouseup", endDrawing);
  
      // Touch event 
      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchmove", drawLine);
      canvas.addEventListener("touchend", endDrawing);
  
      function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
        lastX = lastX - canvasRect.x
        lastY = lastY - canvasRect.y
        draw(lastX, lastY, lastX, lastY, context);
        }
  
        function drawLine(e) {
        if (isDrawing) {
            e.preventDefault();
            const currentX = e.offsetX - canvasRect.x || e.touches[0].clientX - canvasRect.x;
            const currentY = e.offsetY - canvasRect.y || e.touches[0].clientY - canvasRect.y;

            requestAnimationFrame(() => {
            draw(lastX, lastY, currentX, currentY, context);
            [lastX, lastY] = [currentX, currentY];
            });
        }
        }
  
      function endDrawing() {
        isDrawing = false;
      }
  
      function draw(x1, y1, x2, y2, context) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
    }
  };
  </script>

<style scoped>
  progress {
  -webkit-appearance: none;
  appearance: none;
  height: 0.5rem;
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  overflow: hidden;
}

progress::-webkit-progress-bar {
  background-color: #f3f3f3;
  border-radius: 0.25rem;
}

progress::-webkit-progress-value {
  background-color: #10b981;
  border-radius: 0.25rem;
  transition: width 1s ease-in-out;
}

progress::-moz-progress-bar {
  background-color: #10b981;
  border-radius: 0.25rem;
  transition: width 1s ease-in-out;
}
</style>