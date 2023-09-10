document.addEventListener("DOMContentLoaded", function () {
  const hasilDisplay = document.getElementById("hasil");
  const historyDisplay = document.getElementById("history");
  const tombol = document.querySelectorAll("button");
  let currentResult = "";

  tombol.forEach((tombol) => {
    tombol.addEventListener("click", function () {
      const value = tombol.textContent;

      if (value === "C") {
        historyDisplay.textContent = "";
        hasilDisplay.textContent = "0";
        currentResult = "";
      } else if (tombol.classList.contains("operation")) {
        if (currentResult && historyDisplay.textContent.endsWith("=")) {
          historyDisplay.textContent = currentResult + value;
          currentResult = "";
        } else {
          if (currentResult && currentResult[0] === "-") {
            historyDisplay.textContent += `(${currentResult})${value}`;
          } else {
            historyDisplay.textContent += currentResult + value;
          }
          currentResult = "";
        }
      } else if (value === "=") {
        if (currentResult && historyDisplay.textContent) {
          const historyText = historyDisplay.textContent;

          if (currentResult && currentResult[0] === "-") {
            historyDisplay.textContent += `(${currentResult})`;
          } else {
            historyDisplay.textContent += currentResult;
          }
          historyDisplay.textContent += "=";

          let expressionToEvaluate = historyText + currentResult;
          expressionToEvaluate = expressionToEvaluate
            .replace(/x/g, "*")
            .replace(/:/g, "/");

          const hasil = eval(expressionToEvaluate);

          let hasilTampilan;
          if (Number.isInteger(hasil)) {
            hasilTampilan = hasil.toString();
          } else {
            hasilTampilan = hasil.toFixed(2); //
            if (hasilTampilan.includes(".") && hasilTampilan.endsWith("0")) {
              hasilTampilan = hasilTampilan.slice(0, -1);
            }
          }

          hasilDisplay.textContent = hasilTampilan;
          currentResult = hasilTampilan;
        }
      } else if (value === "del") {
        currentResult = currentResult.slice(0, -1);
        hasilDisplay.textContent = currentResult;
      } else if (value === "+/-") {
        if (currentResult) {
          if (currentResult[0] === "-") {
            currentResult = currentResult.slice(1);
          } else {
            currentResult = "-" + currentResult;
          }
          let hasilTampilan;
          if (Number.isInteger(parseFloat(currentResult))) {
            hasilTampilan = parseFloat(currentResult).toString();
          } else {
            hasilTampilan = parseFloat(currentResult).toFixed(2);
            if (hasilTampilan.includes(".") && hasilTampilan.endsWith("0")) {
              hasilTampilan = hasilTampilan.slice(0, -1);
            }
          }
          hasilDisplay.textContent = hasilTampilan;
        }
      } else {
        currentResult += value;
        let hasilTampilan;
        if (Number.isInteger(parseFloat(currentResult))) {
          hasilTampilan = parseFloat(currentResult).toString();
        } else {
          hasilTampilan = parseFloat(currentResult).toFixed(2);
          if (hasilTampilan.includes(".") && hasilTampilan.endsWith("0")) {
            hasilTampilan = hasilTampilan.slice(0, -1);
          }
        }
        hasilDisplay.textContent = hasilTampilan;
      }
    });
  });
});
