# news-frontend-bhr
Prueba técnica fronend - Página web noticiero

La página web esta desarrollada con React lista para usarse entrando al link => https://brandonhernandezro.github.io/news-frontend-bhr/


EL módulo principal (copmponente padre) es el que contiene la raíz de los componentes, por el cual la aplicación puede ser visualizada. 
La aplicación está dividida por submódulos (listarItems, items, buscador, etc). 

Se decidió una interfaz simple que permite el entendimiento al usuario de como usarla, colocando las herramientas básicas en de una página web, como lo es un buscador con botón para realizar la búsqueda, un filtro de elementos, y una barra de navegación. 
No se implentaron rutas por la simplicidad del ejercicio y por optimización de tiempos en el despliegue de la aplicación. 
Se implementó la lógica necesaria para crear la funcionalidad de agregar/quitar noticias de favoritos, creando una persistencia de datos para visualizarlas noticias favoritar incluso después de refrescar la página. 
La aplicación no requirio mas hooks que los básicos (useEfect y useState) por la simplicidad del ejercicio. 
