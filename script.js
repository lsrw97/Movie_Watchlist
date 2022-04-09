let movieList = document.getElementById("movie-list")
const movieTitle = document.getElementById("searchFilm")
const searchBtn = document.getElementById("submit")
const watchList = document.getElementsByClassName('add-watchlist')
let watchlistLink = ''
let searchFilmLink = ''
let myWatchlist = []
let index = 0



searchBtn.addEventListener('click', () => {
    fetch(`https://www.omdbapi.com/?apikey=6ead165b&s=${movieTitle.value}`)
    .then(res => res.json())
    .then(data => {
        getMoviesListHtml(data)
        setTimeout(() => {
            for (var i = 0; i < watchList.length; i++) {
                let id = watchList[i].id
                watchList[i].addEventListener("click", function () {
                    console.log(id)
                    myWatchlist.push(id)
                    localStorage.setItem('watchlist', JSON.stringify(myWatchlist))
                });
            }
        }, 1000)
    })
    
})

function getMoviesListHtml(data){
    movieList.innerHTML = ''
    const array = data.Search
    array.forEach(movie => {
        fetch(`http://www.omdbapi.com/?apikey=6ead165b&t=${movie.Title}&plot=short`)
            .then(res => res.json())
            .then(movieInfos => {
                movieList.innerHTML += `
                <div class="container">
                    <div class="movie-container">
                        <img src="${movieInfos.Poster}" id="movie-poster">
                        <div class="movie-info">
                            <div class="info-title"><h2 id="movie-title">${movieInfos.Title}</h2><p id="movie-rating"><img src="images/star.png" class="star">${movieInfos.imdbRating}</p></div>
                            <div class="info-specs"><span id="movie-duration">${movieInfos.Runtime}</span><span id="movie-genre">${movieInfos.Genre}</span><a id="${movie.Title}" class="add-watchlist"><img src="images/add.png" class="add-icon">Watchlist</a></div>
                            <div class="info-description"><span id="movie-description">${movieInfos.Plot}</span></div>
                        </div>
                    </div>
                </div>
                `
            })
    })
}

function getWatchlistHtml() {
    let arr = JSON.parse(localStorage.getItem('watchlist'))
    console.log(arr[0])
    document.body.innerHTML = 
    `
    <header>
        <div class="title">
            <h1>My Watchlist</h1>
            <a  class="myWatchlist" id='searchFilmLink'>Search for movies</a>
        </div>
    </header>
    <main id="movie-list">
    </main>
    <script src="script.js"></script>
    `
    movieList = document.getElementById("movie-list")
    arr.forEach(movie => {
        fetch(`http://www.omdbapi.com/?apikey=6ead165b&t=${movie}&plot=short`)
            .then(res => res.json())
            .then(movieInfos => {
                movieList.innerHTML += `
                <div class="container">
                    <div class="movie-container">
                        <img src="${movieInfos.Poster}" id="movie-poster">
                        <div class="movie-info">
                            <div class="info-title"><h2 id="movie-title">${movieInfos.Title}</h2><p id="movie-rating"><img src="images/star.png" class="star">${movieInfos.imdbRating}</p></div>
                            <div class="info-specs"><span id="movie-duration">${movieInfos.Runtime}</span><span id="movie-genre">${movieInfos.Genre}</span><a id="${movie.Title}" class="add-watchlist"><img src="images/add.png" class="add-icon">Watchlist</a></div>
                            <div class="info-description"><span id="movie-description">${movieInfos.Plot}</span></div>
                        </div>
                    </div>
                </div>
                `
            })
    })
        
    searchFilmLink = document.getElementById('searchFilmLink')
    searchFilmLink.addEventListener('click', getIndexHtml)
}

function getIndexHtml() {
    document.body.innerHTML =
    `
    <header>
        <div class="title">
            <h1>Find your film</h1>
            <a class="myWatchlist" id="myWatchlist">My Watchlist</a>
        </div>
        <div class="search-input">
            <input type="search" id="searchFilm">
            <button id="submit">Search</button>
        </div>
    </header>   
    <main id="movie-list">
        <div class="background-default">
            <span class="material-icons md-48 md-light md-inactive">theaters</span>
            <p class="subtitle-default">Start exploring</p>
        </div>
    </main>
    <script src="script.js"></script>
    `
    watchlistLink = document.getElementById('myWatchlist')
    watchlistLink.addEventListener('click', getWatchlistHtml)
}

watchlistLink = document.getElementById('myWatchlist')
watchlistLink.addEventListener('click', getWatchlistHtml)