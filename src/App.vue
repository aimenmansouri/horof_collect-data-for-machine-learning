<template>
  <div class="relative min-h-screen">
    <div :class="{'opacity-100':thanks}" class="opacity-0 duration-1000 transition-opacity absolute left-1/2 transform -translate-x-1/2 text-center pt-20">
      <span class="text-4xl">🙏</span> 
      <br>
      <span class="text-lg">Thank you for your contribution</span>
    </div>
  <main>
    <startPage v-if="!appStarted" @startApp = "startApp"/>
    <drawingPage :time="time" v-if="appStarted" @closeDrawing = "closeDrawingFnc"/>
  </main>

  <div class="absolute bottom-0 w-full">
    <footer class="container">
      <h3 class="text-xs pb-2 text-center">Made with ❤️</h3>
    </footer>
  </div>
</div>
</template>

<script>
import startPage from './components/startPage.vue'
import drawingPage from './components/drawingPage.vue'


 export default {
    name: 'App',
    components :{
      startPage,
      drawingPage
    },
    data() {
      return{
        appStarted : false ,
        time : 0 ,
        thanks : false ,
      }
    },
    methods : 
    {
      startApp(time){
        this.time = time
        this.appStarted = true;
      },
      closeDrawingFnc() {
        this.appStarted = false; 
        this.thanks = true
        setTimeout(() => {
            this.thanks = false
        }, 2500)
      }
    },
  }
</script>

