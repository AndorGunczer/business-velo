window.addEventListener("scroll", () => {
    const scrollingElement = (function () {
      return document.scrollingElement || document.documentElement;
    })();
  
    const scrollPosition = scrollingElement.scrollTop;
    const navElement = document.getElementsByTagName("nav")[0] as HTMLElement;
    const imgElement = document.getElementById("velo-mini") as HTMLElement;
  
    console.log(scrollPosition);
  
    if (scrollPosition > 72) {
      imgElement.setAttribute("class", "img-fixed h-16 w-24 pl-8 py-4");
      navElement.setAttribute("class", "nav-fixed");
    } else {
      imgElement.setAttribute("class", "img-static h-16 w-24 pl-8 py-4");
      navElement.setAttribute("class", "nav-static");
    }
  });