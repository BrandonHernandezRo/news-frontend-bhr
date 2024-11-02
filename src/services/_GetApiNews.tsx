// src/utils/api.js

import axios from "axios";

export const getApiNews = async (searchTerm: string, selectedCategory: string, setArticles: (articles: any[]) => void) => {
  try {
    const response = await axios.get("https://news-backend-bhr.onrender.com/api/news", {
      params: {
        q: searchTerm,
        category: selectedCategory,
      },
    });

    if (response.data && response.data.length > 0) {
      setArticles(response.data);
    } else {
      setArticles([]);
    }
  } catch (error) {
    console.error("Error al obtener las noticias:", error.message);
    setArticles([]);
  }
};
