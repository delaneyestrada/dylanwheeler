import '../scss/main.scss';
import jump from 'jump.js';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#navbar');
  const navbarHeight = navbar.offsetHeight;
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = event.target.dataset.scroll;
      jump(id, { offset: -navbarHeight, duration: 500 });
    });
  });
});
