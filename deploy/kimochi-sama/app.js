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

});