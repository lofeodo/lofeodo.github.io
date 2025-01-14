document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const leftSwipeAnimation = document.querySelector(".swipe-left-animation");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                leftSwipeAnimation.classList.add("animation-visible");
            } else {
                leftSwipeAnimation.classList.remove("animation-visible");
            }
        });
    });

    observer.observe(grid);
});