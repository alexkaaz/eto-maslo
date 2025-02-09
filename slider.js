const imageSlider = () => {
    const slider = document.querySelector('.product_image_c');
    const prevButton = document.querySelector('.prev_button');
    const nextButton = document.querySelector('.next_button');
    const slides = Array.from(slider.querySelectorAll('img'));
    const slideCount = slides.length;
    let slideIndex = 0;
    
    prevButton.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
      slide();
    });
    
    nextButton.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slideCount;
      slide();
    });
    
    const slide = () => {
      const imageWidth = slider.clientWidth;
      const slideOffset = -slideIndex * imageWidth;
      slider.style.transform = `translateX(${slideOffset}px)`;
    }
    
    window.addEventListener('load', () => {
      slide();
    });
};

imageSlider();