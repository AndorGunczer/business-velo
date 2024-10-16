window.addEventListener("scroll", () => {
    const scrollingElement = (function () {
      return document.scrollingElement || document.documentElement;
    })();
  
    const scrollPosition = scrollingElement.scrollTop;
    const navElement = document.getElementsByTagName("nav")[0];
  
    console.log(scrollPosition);
  
    if (scrollPosition > 72) {
      navElement.setAttribute("class", "nav-fixed");
    } else {
      navElement.setAttribute("class", "nav-static");
    }
  });