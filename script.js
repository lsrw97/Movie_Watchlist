let movieList = document.getElementById("movie-list")
let movieTitle = document.getElementById("searchFilm")
let searchBtn = document.getElementById("submit")

let html = ''
let watchlistLink = ''
let searchFilmLink = ''
let myWatchlist = []


function searchMovies(){
    fetch(`https://www.omdbapi.com/?apikey=6ead165b&s=${movieTitle.value}`)
    .then(res => res.json())
    .then(data => {
        getMoviesListHtml(data)
        //console.log(watchList[0])
        //console.log(watchList.length)
        //    for (var i = 0; i < watchList.length; i++) {
        //        let id = watchList[i].id
        //        console.log(id)
        //        watchList[i].addEventListener("click", function () {
        //            console.log(watchList[i])
        //            myWatchlist.push(id)
        //            localStorage.setItem('watchlist', JSON.stringify(myWatchlist))
        //        });
        //    }
        
    })
}

searchBtn.addEventListener('click', searchMovies)

function getMoviesListHtml(data){
    html = ''
    const array = data.Search
    
    array.forEach((movie, idx, arr) => {
        fetch(`http://www.omdbapi.com/?apikey=6ead165b&t=${movie.Title}&plot=short`)
            .then(res => res.json())
            .then(movieInfos => {
                if(idx === arr.length - 1){
                    console.log('last child')
                    html += `
                    <div class="container-last">
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
                }
                else
                {
                html += `
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
                `}
            })

    })
    
    setTimeout(() => {
        movieList.innerHTML = html
        console.log(movieList)
        const watchList = document.getElementsByClassName('add-watchlist')
        for (var i = 0; i < watchList.length; i++) {
            let id = watchList[i].id
            console.log(id)
            watchList[i].addEventListener("click", function (e) {
                console.log(e.path[0].id)
                myWatchlist.push(id)
                localStorage.setItem('watchlist', JSON.stringify(myWatchlist))
            });
        }
    }, 1000)
}

function getWatchlistHtml() {
    let arr = JSON.parse(localStorage.getItem('watchlist'))
    console.log(arr)
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
    arr.forEach((movie, idx, array) => {
            fetch(`http://www.omdbapi.com/?apikey=6ead165b&t=${movie}&plot=short`)
            .then(res => res.json())
            .then(movieInfos => {
                if(idx === arr.length - 1)
                {
                    movieList.innerHTML += `
                    <div class="container last">
                        <div class="movie-container">
                            <img src="${movieInfos.Poster}" id="movie-poster">
                            <div class="movie-info">
                                <div class="info-title"><h2 id="movie-title">${movieInfos.Title}</h2><p id="movie-rating"><img src="images/star.png" class="star">${movieInfos.imdbRating}</p></div>
                                <div class="info-specs"><span id="movie-duration">${movieInfos.Runtime}</span><span id="movie-genre">${movieInfos.Genre}</span><a id="${movieInfos.Title}" class="remove-watchlist"><img src="images/delete.png" class="add-icon">Remove from Watchlist</a></div>
                                <div class="info-description"><span id="movie-description">${movieInfos.Plot}</span></div>
                            </div>
                        </div>
                    </div>
                `
                }
                else
                {
                    movieList.innerHTML += `
                    <div class="container">
                        <div class="movie-container">
                            <img src="${movieInfos.Poster}" id="movie-poster">
                            <div class="movie-info">
                                <div class="info-title"><h2 id="movie-title">${movieInfos.Title}</h2><p id="movie-rating"><img src="images/star.png" class="star">${movieInfos.imdbRating}</p></div>
                                <div class="info-specs"><span id="movie-duration">${movieInfos.Runtime}</span><span id="movie-genre">${movieInfos.Genre}</span><a id="${movieInfos.Title}" class="remove-watchlist"><img src="images/delete.png" class="add-icon">Remove from Watchlist</a></div>
                                <div class="info-description"><span id="movie-description">${movieInfos.Plot}</span></div>
                            </div>
                        </div>
                    </div>`
                }
            })
            

    })
    setTimeout(() => {
        const watchList = document.getElementsByClassName('remove-watchlist')
        for (var i = 0; i < watchList.length; i++) {
            watchList[i].addEventListener("click", function (e) {
                const arr = JSON.parse(localStorage.getItem("watchlist"))
                const index = arr.indexOf(e.path[0].id, 0)
                console.log(e.path[0].id)
                console.log(myWatchlist)
                console.log(arr)
                console.log(index)
                arr.splice(index, 1)
                console.log(arr)
                localStorage.clear()
                myWatchlist = arr
                localStorage.setItem('watchlist', JSON.stringify(arr))
            });
        }
    }, 1000)
    
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
    `
        
        movieList = document.getElementById("movie-list")
        console.log(movieList.innerHTML)
        movieTitle = document.getElementById("searchFilm")
        searchBtn = document.getElementById("submit")
        searchBtn.addEventListener('click', searchMovies)
        watchlistLink = document.getElementById('myWatchlist')
        watchlistLink.addEventListener('click', getWatchlistHtml)

}

watchlistLink = document.getElementById('myWatchlist')
watchlistLink.addEventListener('click', getWatchlistHtml)