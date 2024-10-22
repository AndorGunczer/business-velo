window.addEventListener("scroll", function () {
    var scrollingElement = (function () {
        return document.scrollingElement || document.documentElement;
    })();
    var scrollPosition = scrollingElement.scrollTop;
    var navElement = document.getElementsByTagName("nav")[0];
    var imgElement = document.getElementById("velo-mini");
    var mobileNav = document.getElementById("mobile-nav");
    console.log(scrollPosition);
    if (scrollPosition > 72) {
        imgElement.setAttribute("class", "img-fixed h-16 w-24 pl-8 py-4");
        navElement.setAttribute("class", "nav-fixed");
        mobileNav.setAttribute("class", "block lg:hidden p-4 mb-16 hamburger-fixed");
    }
    else {
        imgElement.setAttribute("class", "img-static h-16 w-24 pl-8 py-4");
        navElement.setAttribute("class", "nav-static");
        mobileNav.setAttribute("class", "block lg:hidden p-4 mb-16 hamburger-static");
    }
});
