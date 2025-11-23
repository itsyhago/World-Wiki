function removeAccent(str){
         return str
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
}

am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "translateX",
  panY: "translateY",
  projection: am5map.geoMercator()
}));


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  exclude: ["AQ"],

}));

    polygonSeries.mapPolygons.template.adapters.add("tooltipText", function(tooltipText, target) {
        var dataContext = target.dataItem.dataContext;
        var countryId = dataContext.id;
        
        // Tentar obter nome em português
        var nomePortugues = am5geodata_lang_PT[countryId];
        
        if (nomePortugues) {
            return nomePortugues;
        }
        
        // Se não encontrar, usar nome original
        return dataContext.name;
    });

    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
       const data = ev.target.dataItem.dataContext;
        const name =  am5geodata_lang_PT[data.id] || data.name;
        const base = window.location.pathname.replace(/\/[^\/]*$/, "");
        window.open(`${base}/pages/${removeAccent(name).toLowerCase().replaceAll(" ", "")}.html`, "_self") 
    });
    polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true,
    cursorOverStyle: "pointer"
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover"),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
    fill: root.interfaceColors.get("primaryButtonHover")
    });

    // Add zoom control
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
    var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    zoomControl.homeButton.set("visible", true);

    // Make stuff animate on load
    chart.appear(1000, 100);

}); // end am5.ready()


