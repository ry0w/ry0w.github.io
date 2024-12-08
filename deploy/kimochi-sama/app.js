window.addEventListener('load', () => {

    const TARGET = document.querySelectorAll('*');

    Array.prototype.forEach.call(TARGET, ele => {
        if(ele.parentNode.id === 'main') {
            ele.classList.add('scroll-element');
        };
    });
    
    const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('visible');
                 observer.unobserve(entry.target);
             } 
         });
     }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-element').forEach((element) => {
        observer.observe(element);
    });

    class SlideAnimate {
        constructor(selector) {
            this.elements = document.querySelectorAll(selector);
        }

        init() {
            this.elements.forEach((element, index) => {
                const direction = index % 2 === 0 ? '-100%' : '100%'; // 左右交互
                element.style.opacity = '0';
                element.style.transform = `translateX(${direction})`;
                element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            });
            return this;
        }

        onScroll() {
            this.elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

                if (isVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }
            });
            return this;
        }

        addScrollListener() {
            window.addEventListener('scroll', () => this.onScroll());
            this.onScroll();
            return this;
        }
    }

    let slideItem1 = new SlideAnimate('ol > li');
    slideItem1.init().addScrollListener();
    let slideItem2 = new SlideAnimate('.point_cnt > div *');
    slideItem2.init().addScrollListener();
    


});