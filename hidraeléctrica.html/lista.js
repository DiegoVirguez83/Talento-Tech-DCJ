// cargar CSV
async function cargarCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

// para procesar CSV
function procesarCSV(csv) {
    const lineas = csv.split("\n");
    const headers = lineas[0].split(",");
    const filas = lineas.slice(1).filter(linea => linea.trim() !== "");

    return {
        headers,
        filas: filas.map(fila => fila.split(","))
    };
}

// generar la tabla
function generarTabla(datos) {
    const tabla = document.getElementById("tabla");
    const thead = tabla.querySelector("thead");
    const tbody = tabla.querySelector("tbody");

   

    //  encabezados
    const trEncabezados = document.createElement("tr");
    datos.headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        trEncabezados.appendChild(th);
    });
    thead.appendChild(trEncabezados);

    // filas de datos
    datos.filas.forEach(fila => {

        const tr = document.createElement("tr");
        fila.forEach(celda => {
            const td = document.createElement("td");
            td.textContent = celda;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

(async function () {
    const csvData = await cargarCSV("hidroelectrica.csv");
    const datos = procesarCSV(csvData);
    generarTabla(datos);
})();
