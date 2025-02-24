// Requisito: Implementación del Web Scraping
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("scraperForm");
  const resultsDiv = document.getElementById("results");
  const resultsList = document.getElementById("resultsList");

  // Requisito: Manejo de eventos del formulario
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = document.getElementById("url").value;
    const xpath = document.getElementById("xpath").value;

    try {
      // Requisito: Uso de proxy CORS para evitar problemas de seguridad
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;

      // Requisito: Feedback visual durante la carga
      resultsList.innerHTML = `
        <div class="flex items-center justify-center p-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      `;
      resultsDiv.classList.remove("hidden");

      // Requisito: Petición HTTP con manejo de errores
      const response = await fetch(proxyUrl, {
        headers: {
          Origin: window.location.origin,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la página");
      }

      // Requisito: Procesamiento del HTML
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Requisito: Evaluación de XPath
      const result = document.evaluate(
        xpath,
        doc,
        null,
        XPathResult.ANY_TYPE,
        null
      );

      // Requisito: Mostrar resultados
      resultsList.innerHTML = "";
      let node;
      let found = false;
      let count = 0;

      // Requisito: Procesamiento de resultados (máximo 100)
      while ((node = result.iterateNext()) && count < 100) {
        found = true;
        count++;
        const div = document.createElement("div");
        div.className =
          "p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100";

        // Requisito: Soporte para imágenes y texto
        if (node.nodeType === 1 && node.hasAttribute("src")) {
          const img = document.createElement("img");
          img.src = new URL(node.getAttribute("src"), url).href;
          img.className = "max-w-full h-auto";
          img.alt = "Scraped image";
          div.appendChild(img);
        } else {
          div.textContent = node.textContent.trim() || node.nodeValue.trim();
        }

        resultsList.appendChild(div);
      }

      // Requisito: Manejo de casos sin resultados
      if (!found) {
        resultsList.innerHTML = `
          <div class="p-3 bg-yellow-50 text-yellow-700 rounded border border-yellow-200">
            No se encontraron resultados para el XPath proporcionado
          </div>
        `;
      }
    } catch (error) {
      // Requisito: Manejo de errores con feedback visual
      resultsList.innerHTML = `
        <div class="p-3 bg-red-50 text-red-700 rounded border border-red-200">
          Error: ${error.message}
        </div>
      `;
    }
  });
});
