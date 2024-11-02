// localStorageHelper.js

// Función para obtener los artículos favoritos del localStorage
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Función para agregar un artículo a favoritos
export const addFavorite = (article) => {
  const favorites = getFavorites();
  favorites.push(article);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Función para eliminar un artículo de favoritos
export const removeFavorite = (articleUrl) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.url !== articleUrl);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Función para verificar si un artículo es favorito
export const isFavorite = (articleUrl) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.url === articleUrl);
};
