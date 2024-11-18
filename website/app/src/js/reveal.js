const reveals = document.getElementsByTagName("section");
const revealsChildren = [];

for (let i = 0; i < reveals.length; i++) {
    revealsChildren.push(Array.from(reveals[i].children));
    
}

console.log(revealsChildren);

window.addEventListener("scroll", reveal);

function reveal() {

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 50;

        console.log(`REVEALS[i]: ${reveals[i]}`);

        if (revealTop < windowHeight - revealPoint) {
            // reveals[i].classList.add("show");
            // console.log(`REVEALSCHILDREN[i] LENGTH: ${revealsChildren[i].length}`);
            // console.log(`VALUE OF I: ${i}`);
            for (let j = 0; j < revealsChildren[i].length; j++) {
                // console.log(`revealsChildren[i][j]: ${revealsChildren[i][j]}`);
                // console.log(`revealsChildren[i][j] TYPE: ${revealsChildren[i][j].nodeName}`);
                if (revealsChildren[i][j].nodeName == "A")
                    revealsChildren[i][j].children[0].classList.add("show"); 
                else
                    revealsChildren[i][j].classList.add("show"); // K IS NOT YET IN!!
                // if (revealsChildren[i][j])
                
            }
        }
    }
}