document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card-animate");

    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-visible");
            } else {
                entry.target.classList.remove("card-visible");
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${Math.min(index % 4 * 100, 300)}ms`;
        cardObserver.observe(card);
    });

    const contactItems = document.querySelectorAll(".contact-distort");

    const contactObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("contact-distort-visible");
            } else {
                entry.target.classList.remove("contact-distort-visible");
            }
        });
    }, { threshold: 0.2 });

    contactItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 150}ms`;
        contactObserver.observe(item);
    });
});
