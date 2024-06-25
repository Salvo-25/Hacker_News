import '../css/style.css'
import axios from 'axios';

let shownNewsIds = [];

    //Estrapola i dati eseguendo una chiamati all'API Haker News
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

        return newsDataArray;

      } catch (error) {
        console.error('Errore:', error);
        
        return [];
      }
    }

    function renderNews(newsDataArray){
      // Chima la funzione renderOneNews per ogni elemento dell'array
        newsDataArray.forEach(renderOneNews);
      }

      //Crea e inserisce i dati in ogni news box
      function renderOneNews(news){
        const date = (new Date(news.time * 1000)).toLocaleDateString();
        const newsElement = document.createElement('div');
        newsElement.className = 'news_box'
        newsElement.innerHTML = `<p><a href="${news.url}" target="_blank">${news.title}</a></p><br><p>${date}</p>`;
        const newsContainer = document.getElementById('news');
        newsContainer.appendChild(newsElement);
      }
      
      //Salva i dati estrapolati dalla funzione fetchNews in un array
      async function loadNews(){
        const newsDataArray = await fetchNews();
        renderNews(newsDataArray);
      }

      
    // Aggiungi un listener per il pulsante
    document.getElementById('loadMore').addEventListener('click', loadNews);

    // Carica le prime 10 news al caricamento della pagina
    loadNews();
