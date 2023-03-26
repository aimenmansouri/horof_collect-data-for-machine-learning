<template>
    <CountDown v-if="!startDrawing" @countDownFinished="startDrawingFnc" />
    <drawingCanvas :time="time" v-if="startDrawing" @closeDrawing = "this.$emit('closeDrawing')"/>
  </template>
  
  <script>
  import CountDown from './countDown.vue';
  import drawingCanvas from './drawingCanvas.vue';

  
  export default {
    name: 'drawingPage',
    props : ['time'],
    emits: ['closeDrawing'],
    components: {
      CountDown,
      drawingCanvas
    },
    data() {
      return {
        startDrawing: false,
      }
    },
    methods: {
      startDrawingFnc() {
        this.startDrawing = true;
      }
    }
  }
  </script>