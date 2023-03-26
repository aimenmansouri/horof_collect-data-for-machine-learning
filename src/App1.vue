<template>
    <div>
      <canvas ref="canvas" width="300" height="300"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
  
      context.lineWidth = 10;
      context.lineJoin = "round";
      context.lineCap = "round";
  
      // Mouse event listeners
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("mouseup", endDrawing);
  
      // Touch event listeners
      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchmove", drawLine);
      canvas.addEventListener("touchend", endDrawing);
  
      function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
        draw(lastX, lastY, lastX, lastY, context);
      }
  
      function drawLine(e) {
        if (isDrawing) {
          e.preventDefault();
          const currentX = e.offsetX || e.touches[0].clientX;
          const currentY = e.offsetY || e.touches[0].clientY;
  
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