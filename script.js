// HTML DOM elements
const movieGridElem = document.querySelector(".movie-grid")
const searchEngine = document.querySelector("#search-input")
const mainWebsite = document.querySelector(".popup")
const ratings = document.querySelectorAll(".movie-votes")
const webtitle = document.querySelector(".now-playing")

// global variables 
const imageBaseUrl = "https://image.tmdb.org/t/p/w400"
const myApi = "e8308ebddbe7e86e8a3e6b1c2cb2b96e"
var apiMovies = new Array()
var searchedMovies = new Array()
var loadingSearches = false;
var lastSearchedWord = ""
var curMovies = new Array()

// get first 20 movies from now playing movies using movie database api
const getResults = async () => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&page=1`)
        const data = await res.json()
        for (let i = 0; i < data.results.length; i++) {
            const curMovie = {
                id: data.results[i].id,
                title: data.results[i].title,
                posterPath: data.results[i].poster_path,
                voteAverage: data.results[i].vote_average,
            }
            apiMovies.push(curMovie)
        }
    } catch (error) {
        console.log(error)
    }
}

// add passed in movie onto screen and display it
function addMovies(movie) {
    // pick rotten tomatoes icon based on voter rating
    var movie_url = imageBaseUrl + movie.posterPath
    var tomatoType = "fresh tomato"
    var tomatoPic = "fresh-tomato.png"
    if (movie.voteAverage < 6.5) {
        tomatoType = "rotten tomato"
        tomatoPic = "rotten-tomato.png"
    }
    if (movie.voteAverage > 7.5) {
        tomatoType = "certified tomato"
        tomatoPic = "certified-tomato.png"
    }
    // add movie onto screen
    movieGridElem.innerHTML += `
        <div class="movie-card" id="movie-${movie.id}" onclick="openPopup(${movie.id})">
            <div class="outer-flip">
                <div class="inner-flip">
                    <img class="movie-poster" src="${movie_url}" alt="${movie.title}">
                    <div class="movie-votes">
                        <div class="movie-rating-title">
                            <h2>Rating: ${movie.voteAverage}</h2>
                            <img class="freshTom" src="${tomatoPic}" alt="${tomatoType}">
                        </div>
                        <p>(Click for More Details)</p>
                    </div>
                </div>
            </div>
            <h3 class="movie-name">${movie.title}</h3>
        </div>`
}

// get another page of movies from movie database api and add it to the bottom of the page
const loadMore = async () => {
    // find which page to get from the movie database api
    var nextPage = (apiMovies.length / 20) + 1;
    // get more movies from now playing movies sections
    if (!loadingSearches) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&page=${nextPage}`)
        const data = await res.json()
        for (let i = 0; i < data.results.length; i++) {
            const curMovie = {
                id: data.results[i].id,
                title: data.results[i].title,
                posterPath: data.results[i].poster_path,
                voteAverage: data.results[i].vote_average,
            }
            addMovies(curMovie)
            apiMovies.push(curMovie)
        }
    }
    // get more movies from the searched results 
    else {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myApi}&query=${lastSearchedWord}&page=${nextPage}`)
        const data = await res.json()
        for (let i = 0; i < data.results.length; i++) {
            const curMovie = {
                id: data.results[i].id,
                title: data.results[i].title,
                posterPath: data.results[i].poster_path,
                voteAverage: data.results[i].vote_average,
            }
            addMovies(curMovie)
            searchedMovies.push(curMovie)
        }
    }
}

// get first 20 movies from word passed into search engine using movie database api
const searchMovieResults = async (word) => {
    // search results
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myApi}&query=${word}&page=1`)
    const data = await res.json()
    var newResult = new Array()
    for (let i = 0; i < data.results.length; i++) {
        const curMovie = {
            id: data.results[i].id,
            title: data.results[i].title,
            posterPath: data.results[i].poster_path,
            voteAverage: data.results[i].vote_average,
        }
        newResult.push(curMovie)
    }
    return newResult
}

// onclick function for searching a movie
async function searchMovie() {
    // if valid search is passed
    if (searchEngine.value != "") {
        // get searched word
        webtitle.innerHTML = "Search Results"
        lastSearchedWord = searchEngine.value
        movieGridElem.innerHTML = ``
        // add search results to screen
        searchedMovies = await searchMovieResults(searchEngine.value)
        searchedMovies.forEach(addMovies)
        // reset search engine back to placeholder
        searchEngine.value = null
        searchEngine.placeholder = "Search Movie..."
        loadingSearches = true
    }
    // if non-valid, go back to home screen
    else {
        backToStandard()
    }
}

// onclick function to smoothly scroll to the top of the page
function scrollToTop() {
    console.log("test")
    window.scrollTo(0, 0);
}

// call search function whenever user hits enter key
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        searchMovie()
    }
})

// goes back to home screen with first 20 pages showing
function backToStandard() {
    webtitle.innerHTML = "Now Playing"
    searchedMovies = new Array()
    movieGridElem.innerHTML = ``
    apiMovies.forEach(addMovies)
    loadingSearches = false
}

// close the popup window 
function disappearPopup() {
    const popUpElement = document.querySelector(".popup")
    const popUpChildElement = document.querySelector(".popupChild")
    // put in the correct transition
    popUpElement.classList.remove("fadeIn")
    popUpElement.classList.add("fadeOut")
    // remove popup
    setTimeout(() => {
        popUpElement.removeChild(popUpChildElement)
        popUpElement.style.visibility = "hidden";
    }, 1000)
}

// onclick function to open the popup window
const openPopup = async (curID) => {
    // get movie summary
    const res = await fetch(`https://api.themoviedb.org/3/movie/${curID}?api_key=${myApi}`)
    const data = await res.json()
    // get movie trailer
    const youtubeLink = "https://www.youtube.com/embed/"
    const resVid = await fetch(`https://api.themoviedb.org/3/movie/${curID}/videos?api_key=${myApi}`)
    const dataVid = await resVid.json()

    var trailerKey = dataVid.results[0].key
    var trailer_url = youtubeLink + trailerKey
    var trailer_summary = data.overview

    // remove any unneeded transitions (called previously) and add correct transition
    const popUpElement = document.querySelector(".popup")
    if (popUpElement.classList.length > 1) {
        popUpElement.classList.remove("fadeOut")
    }
    popUpElement.classList.add("fadeIn")

    // add popup onto screen
    mainWebsite.innerHTML += `
        <div class="popupChild">
            <button id="close" type="button" class="btn btn-default" onclick="disappearPopup()">X</button>
            <iframe id="trailer" type="text/html" 
            src="${trailer_url}" frameborder="0"></iframe>
            <h2>ABOUT</h2>
            <p id="summary">${trailer_summary}</p>
        </div>`
    popUpElement.style.visibility = "visible";
}

// display first 20 now playing movies everytime window loads
window.onload = async function () {
    await getResults()

    apiMovies.forEach(addMovies)
}