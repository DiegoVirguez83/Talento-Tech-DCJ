
  import { resultadokW } from "./operation.js";

  document.getElementById("miBoton").addEventListener("click", function() {
      const potencia = parseFloat(document.getElementById("potencia").value);
  
      const resulkw = resultadokW(potencia);
  
      document.getElementById("kWh").innerHTML = `${resulkw}`;
  });
