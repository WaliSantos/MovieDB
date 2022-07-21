/* Para não ter que ficar repetindo os links da API e IMG, defini-os como constantes*/

const API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMG = 'https://image.tmdb.org/t/p/w500';

/* A função getMovies tá acessando a url, transformando a resposta em um objeto json.
   o próximo passo foi pegar esses dados do api e colocar dentro da função makeHTML. Como apenas deseja-se os results, "data.results".
*/

getMovies(API);

function getMovies(url) {
    fetch(url).then(resposta => resposta.json()).then(data => {
        makeHTML(data.results);

    })
}

/* A função makeHTML terá a objetivo de mostrar esses dados no Front. 
   Para isso, seguiu-se os seguintes passos:
      1-como "data" funciona como array (contendo basicamente 20 elementos/blocos de informações de filmes),
   o forEach executa um bloco de códigos para cada elemento.
      2-Como eu precisava que cada filme se organizasse da forma que estabeleci no html (com div e classes),
      necessitava criar o elemento div e adicionar as classes a essa div criada no js. 
      3- Logo depois, retornei o texto com as formatações utilizando "block.innerHTML".
      4- "main.innerHTML = ``;" coloquei pra criar um espaço vazio anterior toda vez que
      a função for chamada. Outro fator de ter utilizado é que estava escrevendo no front
      as informações do index.html + as que coloquei no arquivo script.js.
      5-  "main.appendChild(block);" foi crucial para funcionar, pois inclui o block como elemento filho da main
 */

function makeHTML(data) {
    main.innerHTML = ``;

    data.forEach(movie => {
        const { title, original_title, original_language, poster_path, vote_average, overview, release_date } = movie;
        const block = document.createElement('div');
        block.classList.add('movie');
        block.innerHTML += `
        <div class="movie">
        <img src="${IMG + poster_path}" alt="${title}">
        <div class="info">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="green">${vote_average}</span>
            </div>
            <div class="movie-info-two">
            <h4>Language:${original_language}</h4>
            </h4>Release:${release_date}</h4>
            </div>
        </div>
        <div class="overview">
            <h3 class="original-title">${original_title}</h3>
            <h3>Overview:</h3>
            ${overview}

        </div>

        </div>
        
        `
        main.appendChild(block);

    })
}


/*
TENTATIVA MAL SUCEDIDA DE FAZER O SEARCH. 
TAVA VENDO ALGUNS MATERIAIS, MAS NÃO CONSEGUI MONTAR UMA LÓGICA DE TAL MANEIRA QUE
EU CONSEGUISSE DESENVOLVER O PROCESSO.


const searchURL = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.proventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL)
    } else {
        getMovies(API);
    }
})
*/