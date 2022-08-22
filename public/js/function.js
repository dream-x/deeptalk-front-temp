window.onload = () => {
    // Запрет "отскока" страницы при клике по пустой ссылке с href="#"
    document.querySelectorAll('[href="#"]').forEach((item, i) => {
        item.addEventListener('click', e => {
            e.preventDefault();
        });
    });

    function openMobileNav() {
        const navbar = document.querySelector('.navbar__toggle');
        if (navbar){
            navbar.addEventListener('click', ev => {
                document.querySelector('.nav').classList.toggle('open');
                document.body.classList.toggle('navbar__open');
                ev.target.classList.toggle('active');
            });
        }
        
    }
    openMobileNav();

    // Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
    function srollToId() {
        const el = document.querySelectorAll('[data-scroll-to]');
        el.forEach((item, i) => {
            item.addEventListener('click', e => {
                console.log(e.target.href);
                document.body.classList.remove('navbar__open');
                document.querySelector('.nav').classList.remove('open');
                document.querySelector('.navbar__toggle').classList.remove('active');
            });
        });
    }
    srollToId();

};
