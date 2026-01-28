const urlParams = new URLSearchParams(window.location.search)
const paisId = urlParams.get("id")
fetch("dados.json")
    .then(response => response.json())
    .then(dados => {
        const info = dados[paisId]
        document.getElementById("title").textContent = info.name
        document.getElementById("favcon").href = `assets/imgs/countries/${paisId}/${info.flag}`
        document.getElementById("flag").src = `assets/imgs/countries/${paisId}/${info.flag}`
        document.getElementById("country-name").textContent = info.name
        document.getElementById("abstract").textContent = info.abstract
        document.getElementById("history-1").textContent = info.history_1
        document.getElementById("history-2").textContent = info.history_2
        document.getElementById("culture-1").textContent = info.culture_1
        document.getElementById("culture-2").textContent = info.culture_2
        document.getElementById("img1").src = `assets/imgs/countries/${paisId}/${info.img1}`
        document.getElementById("img1-name").textContent = info.img1_name
        document.getElementById("img2").src = `assets/imgs/countries/${paisId}/${info.img2}`
        document.getElementById("img2-name").textContent = info.img2_name
        document.getElementById("climate-1").textContent = info.climate_1
        document.getElementById("climate-2").textContent = info.climate_2
        document.getElementById("biodiversity-1").textContent = info.biodiversity_1
        document.getElementById("biodiversity-2").textContent = info.biodiversity_2
        document.getElementById("img3").src = `assets/imgs/countries/${paisId}/${info.img3}` 
        document.getElementById("img3-name").textContent = info.img3_name
        document.getElementById("img4").src = `assets/imgs/countries/${paisId}/${info.img4}`
        document.getElementById("img4-name").textContent = info.img4_name
        document.getElementById("cities-1").textContent = info.cities_1
        document.getElementById("cities-2").textContent = info.cities_2
        document.getElementById("img5").src = `assets/imgs/countries/${paisId}/${info.img5}`
        document.getElementById("img5-name").textContent = info.img5_name
        document.getElementById("img6").src = `assets/imgs/countries/${paisId}/${info.img6}`
        document.getElementById("img6-name").textContent = info.img6_name
    })

