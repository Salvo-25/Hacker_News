import '../css/style.css'
import axios from 'axios';

let shownNewsIds = [];

    async function fetchNews() {
      try {
        // Ottieni gli ID di 500 news
        const response = await axios.get(`${process.env.API_URL}newstories.json`);
        const newsIds = response.data;

        // Filtra gli ID già visualizzati
        const newNewsIds = newsIds.filter(id => !shownNewsIds.includes(id)).slice(0, 10);

        // Aggiungi i nuovi ID alla lista di quelli già visualizzati
        shownNewsIds = shownNewsIds.concat(newNewsIds);

        // Creiamo una lista di promise per ottenere i dettagli delle news
        const newsPromises = newNewsIds.map(id =>
          axios.get(`${process.env.API_URL}item/${id}.json`)
        );

        // Risolviamo tutte le promise
        const news = await Promise.all(newsPromises);

        const newsDataArray = news.map(newsResponse => newsResponse.data);

        // Mostra le news nella pagina
        const newsContainer = document.getElementById('news');
        newsDataArray.forEach(news => {
          const data = (new Date(news.time * 1000)).toLocaleDateString();
          const newsElement = document.createElement('div');
          newsElement.className = 'news_box'
          newsElement.innerHTML = `<p><a href="${news.url}" target="_blank">${news.title}</a></p><br><p>${data}</p>`;
          newsContainer.appendChild(newsElement);
        });

      } catch (error) {
        console.error('Errore:', error);
      }
    }

    // Aggiungi un listener per il pulsante
    document.getElementById('loadMore').addEventListener('click', fetchNews);

    // Carica le prime 10 news al caricamento della pagina
    fetchNews();
