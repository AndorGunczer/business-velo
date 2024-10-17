window.addEventListener("scroll", function () {
    var scrollingElement = (function () {
        return document.scrollingElement || document.documentElement;
    })();
    var scrollPosition = scrollingElement.scrollTop;
    var navElement = document.getElementsByTagName("nav")[0];
    console.log(scrollPosition);
    if (scrollPosition > 72) {
        navElement.setAttribute("class", "nav-fixed");
    }
    else {
        navElement.setAttribute("class", "nav-static");
    }
});
