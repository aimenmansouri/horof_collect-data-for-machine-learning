<template>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-center">
        {{ counter }}
    </div>
</template>
  
  <script>
  export default {
    name: 'CountDown',
    data() {
      return {
        counter: 3,
      };
    },
    methods: {
      startCountDown() {
        let intervalId = setInterval(() => {
          this.counter--;
          if (this.counter === 0) {
            clearInterval(intervalId);
            this.$emit('countDownFinished');
          }
        }, 1000);
      },
    },
    mounted() {
      this.startCountDown();
    },
  };
</script>
  