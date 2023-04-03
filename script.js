"use strict";
const sections = document.querySelectorAll("section");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");
const goToProjects = document.querySelector(".go-to-section");
const allSections = document.querySelectorAll("section");

const revealSection = (entries, observer) => {
    const [entry] = entries;
    console.table(entries);
    console.log(entry.target);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2,
});

allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section-hidden");
});

const activeSectionClass = () => {
    sections.forEach((section) => {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        const currentAnchor = document.querySelector(
            "a[href*=" + sectionId + "]"
        );

        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            currentAnchor.classList.add("active-link");
        } else {
            currentAnchor.classList.remove("active-link");
        }
    });
};

(() => {
    // Page is loaded
    const objects = document.getElementsByClassName("asyncImage");
    Array.from(objects).map((item) => {
        // Start loading image
        const img = new Image();
        img.src = item.dataset.src;
        // Once image is loaded replace the src of the HTML element
        img.onload = () => {
            item.classList.remove("asyncImage");
            return item.nodeName === "IMG"
                ? (item.src = item.dataset.src)
                : (item.style.backgroundImage = `url(${item.dataset.src})`);
        };
    });
})();

logo.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#introduction").scrollIntoView({
        behavior: "smooth",
    });
});

goToProjects.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#projects").scrollIntoView({
        behavior: "smooth",
    });
});

navLinks.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("nav-link-a")) {
        const targetId = e.target.getAttribute("href");
        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth",
        });
    }
});

window.addEventListener("scroll", activeSectionClass);
