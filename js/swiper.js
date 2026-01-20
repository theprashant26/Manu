// swiper

var testimonialswiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      700: {
        slidesPerView: 2,
        spaceBetween: 20,
  
      },
      10: {
        slidesPerView: 1,
        spaceBetween: 16,
  
      },
  
    },
  });
  
  var companyswiper = new Swiper(".mySwiper1", {
    slidesPerView:6,
    spaceBetween: 10,
    freeMode: true,
    loop:true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      992: {
        slidesPerView:6,
      },
      800: {
        slidesPerView:4,
      },
      500: {
        slidesPerView: 3,
  
      },
      400: {
        slidesPerView: 2,
  
      },
      200: {
        slidesPerView: 1,
  
      },
  
    },
  });
  