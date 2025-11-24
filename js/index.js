history.scrollRestoration = "manual";

const guideTitle = document.querySelectorAll(".guideTitle")  /* List of divs with the names of the continents. */
const topBtn = document.getElementById("topBtn")  /* back to top button */
const ulMenu = document.querySelector(".ulMenu")  /* hamburger menu */
const inputfield =  document.querySelector("input")  /* Input */
const container =  document.querySelector(".suggestionsContainer")   /* suggestionsContainer */
const dataList = [
"Africa do Sul", "Angola", "Anguilla", "Antígua e Barbuda", "Benim", "Botsuana", "Burkina Fasso", "Burundi", "Cabo Verde"

]
const dataListLower = dataList.map(item => item.toLowerCase())

let position  = Array.from(guideTitle).map(el => el.offsetTop);/* list of guide title positions */
let timer /* timer when resizing the page */


function removeAccent(str){
         return str
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
}
document.querySelector(".menu").addEventListener("click", ()=>{
    ulMenu.classList.toggle("aparecer")
    setTimeout(() =>{
        position = Array.from(guideTitle).map(el => el.offsetTop);
        localStorage.setItem("position", JSON.stringify(position));
    }, 500)
    
})


window.addEventListener('resize', () =>{
    clearTimeout(timer)
    timer = setTimeout(() => {
        localStorage.removeItem("position")
        location.href = "index.html"
    }, 250)
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
            window.open(`pages/${removeAccent(inputfield.value).toLowerCase().replaceAll(" ", "-")}.html`, "_self")
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