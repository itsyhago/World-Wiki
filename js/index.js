history.scrollRestoration = "manual";

const guideTitle = document.querySelectorAll(".guideTitle")  /* List of divs with the names of the continents. */
const topBtn = document.getElementById("topBtn")  /* back to top button */
const ulMenu = document.querySelector(".ulMenu")  /* hamburger menu */
const inputfield =  document.querySelector("input")  /* Input */
const container =  document.querySelector(".suggestionsContainer")   /* suggestionsContainer */
const dataList = [
"África do Sul", "Angola", "Anguilla", "Antígua e Barbuda", "Argélia", "Argentina",, "Austrália", "Benim", "Botsuana",  "Brasil", "Burquina faso", "Burundi", "Cabo Verde", "Canadá", "República dos Camarões" 

]
const dataListLower = dataList.map(item => item.toLowerCase())

let position  = Array.from(guideTitle).map(el => el.offsetTop);/* list of guide title positions */
let timer /* timer when resizing the page */
let lastWidth = window.innerWidth;

function removeAccent(str){
         return str
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
}
document.querySelector(".menu").addEventListener("click", ()=>{
    ulMenu.classList.toggle("aparecer")
    setTimeout(() =>{
        position = Array.from(guideTitle).map(el => el.offsetTop);
    }, 500)
    
})

window.addEventListener('resize', () =>{
    clearTimeout(timer)
    const currentWidth = window.innerWidth
    if (currentWidth != lastWidth){
        lastWidth = currentWidth
        timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
            if (window.scrollY === 0){
                position = Array.from(guideTitle).map(el => el.offsetTop);
            }
    
        }, 250)
    }
    
})
window.addEventListener("scroll", () => {
    guideTitle.forEach((div, i) =>{
        let positionsInv = Array.from(guideTitle).map(el => el.offsetTop);
        const nextDiv = guideTitle[i + 1]
        if (window.scrollY >= position[i] && (!nextDiv || window.scrollY < position[i + 1]  - 100)){
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

inputfield.addEventListener("input", function() {
    const userInput = this.value.toLowerCase();
    container.innerHTML = ""
    const filteredSuggestions = dataList.filter(item => item.toLowerCase().startsWith(userInput))
    if(userInput === ""){
       container.style.display = "none"; 
        return
    }

    if(filteredSuggestions.length === 0){
        container.style.display = "none"; 
        return
    }

    container.style.display = "block"
   filteredSuggestions.forEach(suggestion =>{
        const itemDiv = document.createElement("div")
        itemDiv.classList.add("suggestions-item")
        itemDiv.textContent = suggestion

        itemDiv.addEventListener("click", () =>{
            inputfield.value = suggestion
            container.innerHTML = ""
            container.style.display = "none"
            inputfield.focus()
        })
         container.appendChild(itemDiv);
   })

    
})

document.addEventListener("keydown", function(event){
    const key = event.key
    if(document.activeElement === inputfield && key == "Enter"){
        if(dataListLower.includes(inputfield.value.toLowerCase()) ){
            location.href = `paises.html?id=${removeAccent(inputfield.value).toLowerCase().replaceAll(" ", "-")}`
            inputfield.classList.remove("error")
            inputfield.placeholder = "pesquise"
            inputfield.value = ""
            container.innerHTML = ""
            container.style.display = "none"
                
        }else{
           inputfield.classList.add("error")
           inputfield.placeholder = "Não reconhecido"
           inputfield.value = ""
            container.innerHTML = ""
            container.style.display = "none"
        }
        
    }


})