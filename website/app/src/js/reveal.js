window.addEventListener("scroll", reveal);

function reveal() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 50;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("show");
        }
    }
}