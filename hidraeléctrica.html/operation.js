function calcularConsumo() {
    const consumoM = parseFloat(document.getElementById('consuMensual').value);
    if (isNaN(consumoM) || consumoM <= 0) {
        alert("Ingrese un numero para calcular su consumo");
        return;
    }

    const energiaTotal = 58.19;
    const porcentajeRenovable = (consumoM / 1000000)* 12;
    const valorTotal = (porcentajeRenovable*100) / energiaTotal;  
   
 document.getElementById('resultado').innerHTML = valorTotal.toFixed(6);
}