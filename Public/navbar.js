const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navcontent');
    // const navLinks = document.querySelectorAll('.navcontent li')

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
    // navLinks.forEach((link, about) => {
    //     link.style.animation = 'navLinkFade 0.5s ease forwards ${about / 7 + 0.3}s';
    //     console.log(index / 7);
    // });
}

navSlide();