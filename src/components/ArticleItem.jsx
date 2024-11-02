import React, { useEffect, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap"; // Asegúrate de tener react-bootstrap instalado
import { addFavorite, isFavorite, removeFavorite } from "../utils/functions";

const ArticleItem = ({ article, index }) => {
  const [isFav, setIsFav] = useState(false);
  // Define el tamaño de la imagen basado en si el índice es par o impar
  const imageSize = index % 2 === 0 ? "200px" : "240px";

  // Determine la clase de disposición de columnas basado en el índice
  const isEven = index % 2 === 0; // true si el índice es par
  const columnClass = isEven ? "flex-row" : "flex-row-reverse";
  // Crear el tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {isFav ? "Eliminar de favoritos" : "Agregar a favoritos"}
    </Tooltip>
  );

  // Verifica si el artículo ya está en favoritos
  useEffect(() => {
    setIsFav(isFavorite(article.url));
  }, [article.url]);

  // Función para manejar clics en el icono de corazón
  const handleFavoriteToggle = () => {
    if (isFav) {
      // Eliminar de favoritos
      removeFavorite(article.url);
    } else {
      // Agregar a favoritos
      addFavorite(article);
    }
    setIsFav(!isFav);
  };
  // Verifica si el artículo ya está en favoritos al montar el componente
  useEffect(() => {
    const checkIfFavorite = () => {
      const isFavoriteArticle = isFavorite(article.url);
      setIsFav(isFavoriteArticle);
    };

    checkIfFavorite();
  }, [article.url]);

  return (
    <div
      className={`article-item d-flex position-relative ${columnClass} mb-3`}
      style={{
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        marginBottom: "20px",
        maxWidth: "80%", // Ajusta el ancho del contenedor
        margin: "0 auto", // Centra el contenedor
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Icono en la esquina superior derecha con tooltip */}
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <i
          className={`bi ${
            !isFav ? "bi-heart" : "bi-heart-fill"
          } position-absolute`}
          style={{
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: isFav ? "#dc3545" : "#000",
            fontSize: "1.5rem",
          }}
          onClick={handleFavoriteToggle}
        ></i>
      </OverlayTrigger>

      <div className="col-md-6 me-4 pe-3 ">
        <h2 style={{ textAlign: "justify" }}>{article.title}</h2>
        <p style={{ textAlign: "justify" }}>{article.description}</p>
        <p>
          <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
        </p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Leer más
        </a>
      </div>
      <div className="d-none d-md-block col-md-5  me-4 pe-3">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="img-fluid"
            style={{
              maxHeight: imageSize,
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
