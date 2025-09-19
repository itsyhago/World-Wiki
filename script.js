history.scrollRestoration = "manual";
const guideTitle = document.querySelectorAll(".guideTitle")
const topBtn = document.getElementById("topBtn")
const ulMenu = document.querySelector(".ulMenu")
document.querySelector(".menu").addEventListener("click", ()=>{
    ulMenu.classList.toggle("aparecer")
    position = Array.from(guideTitle).map(el => el.offsetTop);
    localStorage.setItem("position", JSON.stringify(position));
})
let position
if (localStorage.getItem("position")) {
  position = JSON.parse(localStorage.getItem("position"));
} else {
  position = Array.from(guideTitle).map(el => el.offsetTop);
  localStorage.setItem("position", JSON.stringify(position));
}

window.addEventListener("resize", () =>{ 
    setInterval(() => {
        window.location.reload(true);
        localStorage.removeItem("position");
    }, 1000)
})

window.addEventListener("scroll", () => {
    guideTitle.forEach((div, i) =>{
        let positionsInv = Array.from(guideTitle).map(el => el.offsetTop);
        console.log(positionsInv)
        const nextDiv = guideTitle[i + 1]
        if (window.scrollY >= position[i] && (!nextDiv || window.scrollY < position[i + 1] - 100 )){
            div.classList.add("grudada")
        }else{
            div.classList.remove("grudada")
           
        }
        if(positionsInv[i] >= positionsInv[i + 1]){
            div.classList.add("invisivel")
        }else{
            div.classList.remove("invisivel")
        }
        console.log(window.scrollY)
        console.log(position)
        if ((window.innerHeight + window.scrollY + 3 >= document.body.offsetHeight) && !nextDiv) {
            if( window.scrollY >= position[i]){
                div.classList.add("invisivel") 
            }                
        }
    })
    if (window.scrollY >= 1000){
        topBtn.classList.add("aparecer")
    }else{
        topBtn.classList.remove("aparecer")
    }
})
