import '../scss/main.scss';
import jump from 'jump.js';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const navbar = document.querySelector('#navbar');
  const navbarHeight = navbar.offsetHeight;
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = event.target.dataset.scroll;
      jump(id, { offset: -navbarHeight, duration: 500 });
    });
  });
});
