document.addEventListener('DOMContentLoaded', function () {
    let image = document.querySelector('.zoomable-image');
    let zoomFactor = 2; // Adjust the zoom factor as needed
    
    image.addEventListener('mousemove', (e) => {
      const rect = image.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
    
      const offsetX = mouseX / rect.width;
      const offsetY = mouseY / rect.height;
    
      image.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
      image.style.transform = `scale(${zoomFactor})`;
    });

    image.addEventListener("wheel", function(e) {
      if (Math.sign(e.deltaY) == 1) {
        if (zoomFactor <= 1) return
        zoomFactor -= 1
      } else {
        if (zoomFactor >= 5) return
        zoomFactor += 1
      }
      image.style.transform = `scale(${zoomFactor})`;
    });

    image.addEventListener('mouseover', function() {
        this.style.transform = `scale(${zoomFactor})`; // Adjust the scale factor as needed
        this.style.transition = 'transform 1s ease';
        document.body.style.overflow = 'hidden';
    });
    
    image.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
      document.body.style.overflow = 'scroll';
      zoomFactor = 2
    });
});
