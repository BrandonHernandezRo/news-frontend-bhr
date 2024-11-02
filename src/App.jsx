import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleList from "./components/ArticleList.jsx";
import SearchBar from "./components/SearchBar.tsx";
import CategoryFilter from "./components/CategoryFilter.tsx";
import "./App.css";
import { getApiNews } from "./services/_GetApiNews.tsx";
import { getFavorites } from "./utils/functions.jsx";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Número de artículos por página
  const categories = ["general", "sports", "technology", "business"];

  /**
   * Maneja la búsqueda de artículos basándose en el término de búsqueda y la categoría seleccionada.
   * Resetea la página actual a 1 después de realizar la búsqueda.
   */
  const handleSearch = () => {
    getApiNews(searchTerm, selectedCategory, setArticles);
    setCurrentPage(1);
  };
  // Paginación y cálculo de artículos para mostrar
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pagesToShow = [];
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pagesToShow.push(i);
  }

  /**
   * Maneja la navegación a la siguiente página de artículos.
   * Incrementa la página actual si no se ha alcanzado la última página.
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  /**
   * Maneja la navegación a la página anterior de artículos.
   * Decrementa la página actual si no se está en la primera página.
   */
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Efecto que se ejecuta cuando la categoría seleccionada cambia.
    // Realiza una búsqueda de artículos si hay una categoría seleccionada.
    if (selectedCategory) handleSearch();
  }, [selectedCategory]);

  /**
   * Maneja el clic en el botón de favoritos.
   * Limpia la lista actual de artículos y verifica si hay artículos favoritos.
   * Si hay favoritos, los establece como artículos actuales.
   */
  const handleClickFav = () => {
    //Limpiar actual lista de noticias 
    setSelectedCategory("")
    setArticles([])
    //Validar si hay noticias marcadas como favoritos
    let favoritesList = getFavorites()
    if(favoritesList.length>0){
      console.log("Hay lista de fav", favoritesList)
      setArticles(favoritesList)
    }
  }

  return (
    <div className="App">
      {/* Barra de Navegación */}
      <nav
        className="navbar navbar-expand-md"
        style={{ backgroundColor: "#1d4ed8" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            <h1 className="text-light lead display-6">HR Noticias</h1>
          </a>
          <button
            class="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <form className="d-flex ms-auto mb-lg-0" role="search">
              {/* Esta parte se alinea a la derecha */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
                <li className="nav-item">
                  <a
                    className="nav-link text-light"
                    aria-current="page"
                    href="#"
                    onClick={handleClickFav}
                  >
                    Favoritos
                  </a>
                </li>
              </ul>
              <SearchBar setSearchTerm={setSearchTerm} />
              <button
                className="btn btn-outline btn-light"
                type="button"
                onClick={handleSearch}
              >
                <i className="bi bi-search" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <CategoryFilter
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
      <ArticleList articles={currentArticles} />

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary mr-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {pagesToShow.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn ${
                currentPage === page ? "btn-secondary" : "btn-outline-secondary"
              } mx-1`}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-primary ml-2"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
