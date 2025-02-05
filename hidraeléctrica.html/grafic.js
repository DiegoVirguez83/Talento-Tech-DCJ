async function cargarDatos() {
    const response = await fetch("datos_filtrados.CSV");
    const data = await response.text();


    const filas = data.split("\n").filter(fila => fila.trim() !== ""); 
    const labels = [];
    const datasets = {}; 


    filas.slice(1).forEach(fila => {  
        const columnas = fila.split(",");
        const pais = columnas[0]; 
        const anio = columnas[2]; 
        const produccion = parseFloat(columnas[3]);


        if (!labels.includes(anio)) {
            labels.push(anio); 
        }


        if (!datasets[pais]) {
            datasets[pais] = {
                label: pais,
                data: [],
                borderColor: randomColor(),
                backgroundColor: "rgba(0, 123, 255, 0.3)",
                borderWidth: 2,
                fill: true
            };
        }
        datasets[pais].data.push(produccion);
    });


    // grafica 
    const ctx = document.getElementById("miGrafica").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: Object.values(datasets) 
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // países
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}



function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});
