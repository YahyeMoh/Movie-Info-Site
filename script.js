const movie_genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TvMovie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
}

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6518e3caa298b7bfb38189407addc15d&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w400'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6518e3caa298b7bfb38189407addc15d&query="'

const mainSection = document.getElementById('main-section')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    mainSection.innerHTML = ''

    movies.forEach((movie) => {
        let { title, backdrop_path, vote_average, overview, genre_ids} = movie

        let list = ''

        for(let i = 0; i < genre_ids.length; i++)
        {
            list += (movie_genres[genre_ids[i]]) + ", "
        }

        list = list.slice(0, -2);

        if (backdrop_path === null)
        {
            backdrop_path = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1280px-HD_transparent_picture.png';
        }
        else 
        {
            backdrop_path = IMG_PATH + backdrop_path;
        }

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = 
        `
        <img src="${backdrop_path}" alt="${title}">
        <div class="info">
            <div class="movie-info">
                <h3 class="title">${title.toUpperCase()}</h3>
                <div class="rating-genres">
                    <span class="genres">${list}</span> 
                    <span class="${getClassByRate(vote_average)}">${vote_average}/10</span>
                </div>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        </div>
        `
        mainSection.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
