window.addEventListener("scroll", function () {
    var scrollingElement = (function () {
        return document.scrollingElement || document.documentElement;
    })();
    let scrollPosition = scrollingElement.scrollTop;
    let navElement = document.getElementsByTagName("nav")[0];
    let imgElement = document.getElementById("velo-mini");
    let imgMobileElement = document.getElementById("velo-mobile-mini");
    let mobileNav = document.getElementById("mobile-nav");
    let hamburgerLines = document.querySelectorAll("#hamburger-container > path");
    let checkResult = function checkDeclarations() {
        if (navElement == null)
            return false;
        if (imgElement == null)
            return false;
        if (imgMobileElement == null)
            return false;
        if (mobileNav == null)
            return false;
        if (hamburgerLines == null)
            return false;
        return true;
    }();
    if (!checkResult) {
        console.error("ERROR: checkResult failed. Are all elements being set?");
        return;
    }
    // console.log(hamburgerLines);
    // console.log(scrollPosition);
    if (scrollPosition > 72) {
        imgElement.setAttribute("class", "img-fixed h-16 w-24 pl-8 py-4");
        imgMobileElement.setAttribute("class", "img-fixed h-16 w-24 pl-8 py-4");
        navElement.setAttribute("class", "nav-fixed");
        mobileNav.setAttribute("class", "block lg:hidden p-4 mb-16 hamburger-fixed overflow-x-hidden");
        hamburgerLines.forEach((path) => {
            path.setAttribute("stroke", "#000");
        });
    }
    else {
        imgElement.setAttribute("class", "img-static h-16 w-24 pl-8 py-4");
        imgMobileElement.setAttribute("class", "img-static h-16 w-24 pl-8 py-4");
        navElement.setAttribute("class", "nav-static");
        mobileNav.setAttribute("class", "block lg:hidden p-4 mb-16 hamburger-static overflow-x-hidden");
        hamburgerLines.forEach((path) => {
            path.setAttribute("stroke", "#FFF");
        });
    }
});
