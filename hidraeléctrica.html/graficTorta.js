async function cargarDatos() {
    const response = await fetch("datos_filtrados.CSV");
    const data = await response.text();

    const filas = data.split("\n").filter(fila => fila.trim() !== "");
    const consumoPorAno = {};
    const paisBuscado = "Colombia";

    filas.slice(1).forEach(fila => {
        const columnas = fila.split(",");
        const pais = columnas[0].trim();
        const ano = parseInt(columnas[2].trim());
        const consumo = parseFloat(columnas[3].trim());

        if (pais === paisBuscado && ano > 2010) {
            consumoPorAno[ano] = (consumoPorAno[ano] || 0) + consumo;
        }
    });

    const datos = Object.values(consumoPorAno);
    const anos = Object.keys(consumoPorAno);

    // Crear gráfico de torta
    const ctx = document.getElementById("miGrafica").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: anos,
            datasets: [{
                label: "Consumo de Energía en Colombia",
                data: datos,
                backgroundColor: anos.map(() => randomColor()),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                }
            },
            aspectRatio: 1
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
