const movieList = document.getElementById("movie-list")
const movieTitle = document.getElementById("searchFilm")
const searchBtn = document.getElementById("submit")

searchBtn.addEventListener('click', () => {
    console.log(movieTitle)

    fetch(`https://www.omdbapi.com/?apikey=6ead165b&s=${movieTitle.value}`)
    .then(res => res.json())
    .then(data => {
        getMoviesHtml(data)
    })
})
//${movieTitle} 


function getMoviesHtml(data){
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
                            <div class="info-specs"><span id="movie-duration">${movieInfos.Runtime}</span><span id="movie-genre">${movieInfos.Genre}</span><a href="watchlist.html" id="movie-add-watchlist"><img src="images/add.png" class="add">Watchlist</a></div>
                            <div class="info-description"><span id="movie-description">${movieInfos.Plot}</span></div>
                        </div>
                    </div>
                </div>
                `
            })
    })
}