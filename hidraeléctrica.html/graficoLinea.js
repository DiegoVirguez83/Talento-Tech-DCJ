async function cargarDatos() {
    try {
        const response = await fetch("datos_filtrados.CSV"); 
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo CSV");
        }
        const data = await response.text();

        
        const filas = data.split("\n").filter(fila => fila.trim() !== ""); 
        const labels = [];
        const datasets = {}; //  datos por pais

        filas.slice(1).forEach(fila => {  
            const columnas = fila.split(",");
            if (columnas.length < 4) return; 

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
                    backgroundColor: "rgba(0, 123, 255, 0.1)", 
                    borderWidth: 3, 
                    fill: false, 
                    tension: 0.4 
                };
            }
            datasets[pais].data.push(produccion);
        });

        // grafica de líneas
        const ctx = document.getElementById("miGrafica").getContext("2d");
        new Chart(ctx, {
            type: "line", //  grafico tipo linea: linea
            data: {
                labels: labels,
                datasets: Object.values(datasets) 
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', 
                        display: false // nombres de paises
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return 'Producción: ' + tooltipItem.raw + ' MW'; 
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, 
                        ticks: {
                            stepSize: 5, 
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Años' // titulo del eje X
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
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
