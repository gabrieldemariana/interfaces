document.addEventListener("DOMContentLoaded", function () {
  // Requisito: Cargar fuente XML (usando RSS2JSON como proxy para convertir ATOM/RSS a JSON)
  const newsContainer = document.getElementById("news-container");
  const feedUrl = "https://feeds.bbci.co.uk/news/rss.xml";
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    feedUrl
  )}`;

  // Requisito: Elementos para la paginación
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");

  // Configuración de paginación (10 noticias por página)
  let currentPage = 1;
  const itemsPerPage = 5;
  let newsArray = [];
  let searchTerm = "";

  // Requisito: Implementación de búsqueda
  const searchInput = document.querySelector('input[type="search"]');
  const searchForm = document.querySelector("form.d-flex");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase();
    currentPage = 1;
    renderNews();
  });

  // Requisito: Cargar y procesar el feed RSS
  async function fetchRSSFeed(url) {
    try {
      console.log("Iniciando fetch a:", url);
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      console.log("Datos recibidos:", data);

      if (data.status !== "ok") {
        throw new Error("Error al obtener el feed RSS");
      }

      // Requisito: Extraer información relevante de cada noticia
      newsArray = data.items.map((item) => ({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
        image:
          item.enclosure?.link ||
          item.thumbnail ||
          "https://via.placeholder.com/150",
        categories: item.categories || [],
      }));

      renderNews();
    } catch (error) {
      console.error("Error detallado:", error);
      newsContainer.innerHTML = `
        <div class="alert alert-danger">
          Error al cargar las noticias: ${error.message}
          <br>
          <small>Por favor, intente recargar la página en unos momentos.</small>
        </div>`;
    }
  }

  // Requisito: Gestión de favoritos usando localStorage
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  function toggleFavorite(title) {
    let favorites = getFavorites();
    if (favorites.includes(title)) {
      favorites = favorites.filter((fav) => fav !== title);
    } else {
      favorites.push(title);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderNews();
  }

  function isFavorite(title) {
    return getFavorites().includes(title);
  }

  // Requisito: Renderizar noticias en formato de Cards Bootstrap
  function renderNews(showFavoritesOnly = false) {
    newsContainer.innerHTML = "";

    // Filtrar por favoritos y término de búsqueda
    let filteredNews = showFavoritesOnly
      ? newsArray.filter((news) => isFavorite(news.title))
      : newsArray;

    if (searchTerm) {
      filteredNews = filteredNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm) ||
          news.description.toLowerCase().includes(searchTerm) ||
          news.categories.some((cat) => cat.toLowerCase().includes(searchTerm))
      );
    }

    // Mostrar mensaje si no hay resultados
    if (filteredNews.length === 0) {
      newsContainer.innerHTML = `
        <div class="alert alert-warning text-center">
          ${
            searchTerm
              ? `No news found matching "${searchTerm}"`
              : "No news available."
          }
        </div>`;
      pageInfo.textContent = "Page 0 of 0";
      prevPageBtn.parentElement.classList.add("disabled");
      nextPageBtn.parentElement.classList.add("disabled");
      return;
    }

    // Requisito: Implementación de paginación
    const totalPages = Math.max(
      1,
      Math.ceil(filteredNews.length / itemsPerPage)
    );
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    // Requisito: Crear Cards Bootstrap con la información de cada noticia
    paginatedNews.forEach((news) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-3");

      // Requisito: Mostrar categorías como Badges
      let categoriesHtml = news.categories
        .map((cat) => `<span class="badge bg-primary">${cat}</span>`)
        .join(" ");

      // Requisito: Botón de favoritos con estado visual
      let favoriteClass = isFavorite(news.title)
        ? "btn-danger"
        : "btn-outline-danger";

      card.innerHTML = `
        <div class="card">
          <img src="${news.image}" class="card-img-top" alt="News Image">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.description}</p>
            ${categoriesHtml}
            <p class="text-muted small">${news.pubDate}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <a href="${news.link}" class="btn btn-sm btn-primary" target="_blank">Read more</a>
              <button class="btn btn-sm ${favoriteClass} favorite-btn" data-title="${news.title}">
                ❤️ Favorite
              </button>
            </div>
          </div>
        </div>`;

      newsContainer.appendChild(card);
    });

    // Requisito: Eventos para marcar/desmarcar favoritos
    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const title = this.getAttribute("data-title");
        toggleFavorite(title);
        renderNews(showFavoritesOnly);
      });
    });

    // Actualizar información de paginación
    pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${filteredNews.length} results)`;
    prevPageBtn.parentElement.classList.toggle("disabled", currentPage === 1);
    nextPageBtn.parentElement.classList.toggle(
      "disabled",
      currentPage >= totalPages
    );
  }

  // Requisito: Eventos de paginación
  prevPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderNews();
    }
  });

  nextPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const totalPages = Math.max(1, Math.ceil(newsArray.length / itemsPerPage));
    if (currentPage < totalPages) {
      currentPage++;
      renderNews();
    }
  });

  // Requisito: Eventos para mostrar todas las noticias o solo favoritos
  document.getElementById("show-all").addEventListener("click", function (e) {
    e.preventDefault();
    searchInput.value = "";
    searchTerm = "";
    currentPage = 1;
    renderNews(false);
  });

  document
    .getElementById("show-favorites")
    .addEventListener("click", function (e) {
      e.preventDefault();
      searchInput.value = "";
      searchTerm = "";
      currentPage = 1;
      renderNews(true);
    });

  // Iniciar la carga de noticias
  fetchRSSFeed(proxyUrl);
});
