async function cargarDatos() {
    const response = await fetch("datos_filtrados.CSV");
    const data = await response.text();

    
    const filas = data.split("\n").filter(fila => fila.trim() !== ""); 
    const labels = [];
    const datasets = {}; 
    const colores = {}; 

    filas.slice(1).forEach(fila => {  
        const columnas = fila.split(",");
        const pais = columnas[0].trim(); 
        const anio = columnas[2].trim(); 
        const produccion = parseFloat(columnas[3]); 

        if (!labels.includes(anio)) {
            labels.push(anio); 
        }

        if (!datasets[pais]) {
            colores[pais] = randomColor(); 
            datasets[pais] = {
                data: new Array(labels.length).fill(null), 
                backgroundColor: colores[pais], 
                borderColor: colores[pais], 
                borderWidth: 1
            };
        }

        
        const index = labels.indexOf(anio);
        datasets[pais].data[index] = produccion;
    });

    // Crear gráfico de barras
    const ctx = document.getElementById("miGraficabarra").getContext("2d");
    new Chart(ctx, {
        type: "bar", // grafico tipo barra
        data: {
            labels: labels,
            datasets: Object.values(datasets).map(dataset => ({
                ...dataset, // combinar objetos o arrays sin modificar los originales
                backgroundColor: new Array(labels.length).fill(dataset.backgroundColor),
                borderColor: new Array(labels.length).fill(dataset.borderColor)
            }))
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // nombre
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Años",
                        padding: { top: 10, bottom: 10 } 
                    },
                    ticks: {
                        autoSkip: true, 
                        maxRotation: 45,
                        minRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: {
                        display: true,
                        text: "Producción Hidroeléctrica (GWh)"
                    }
                }
            },
            layout: {
                padding: {
                    top: 30, 
                    bottom: 10
                }
            }
        }
    });
}


function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`; 
}

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});
