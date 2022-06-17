
 
// Example image tag
// <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>


const imageBaseUrl = "https://image.tmdb.org/t/p/w400"
const movieGridElem = document.querySelector(".movie-grid")
const searchEngine = document.querySelector("#search-input")
const mainWebsite = document.querySelector(".popup")
const ratings = document.querySelectorAll(".movie-votes")
const webtitle = document.querySelector(".now-playing")
const myApi = "e8308ebddbe7e86e8a3e6b1c2cb2b96e"
var apiMovies = new Array()
var searchedMovies = new Array()
var loadingSearches = false;
var lastSearchedWord = ""

var curMovies = new Array()
// var curIndex = 0;
const LOADSIZE = 10;

// function updateCurrent(num) {
//     for (let i = curIndex; i < curIndex + num; i++) {
//         curMovies.push(movies[i])
//     }
//     curIndex += num
// }

const getResults = async () => {
    try {
        console.log("in api request")
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&page=1`)
        const data = await res.json()
        // console.log(data)
        // console.log(data.results)
        for (let i = 0; i < data.results.length; i++) {
            // var movie_url = imageBaseUrl + data.results[i].poster_path
            const curMovie = {
                id: data.results[i].id,
                title: data.results[i].title,
                posterPath: data.results[i].poster_path,
                voteAverage: data.results[i].vote_average,
            }
            // console.log(curMovie)
            apiMovies.push(curMovie)
        }
    } catch (error) {
        console.log(error)
    }
}


function addMovies(movie) {
    console.log("add movie")
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
    // console.log(movie_url)
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
    // const curRate = document.querySelector(`#movie-${movie.id}`)
    // console.log(curRate)
    // curRate.addEventListener("click", () => openPopup(movie_url))
}



const loadMore = async () => {
    var nextPage = (apiMovies.length / 20) + 1;
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
    

    

    // var curIndex = curMovies.length
    // for (let i = curIndex; i < curIndex + 5; i++) {
    //     if (i >= movies.length) {
    //         break;
    //     }
    //     addMovies(movies[i])
    //     curMovies.push(movies[i])
    // }
}

const searchMovieResults = async (word) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myApi}&query=${word}&page=1`)
    const data = await res.json()
    console.log(data.results)
    // word = word.toUpperCase()
    var newResult = new Array()
    for (let i = 0; i < data.results.length; i++) {
        const curMovie = {
            id: data.results[i].id,
            title: data.results[i].title,
            posterPath: data.results[i].poster_path,
            voteAverage: data.results[i].vote_average,
        }
        // console.log(curMovie)
        newResult.push(curMovie)
    }
    return newResult
    // for (let i = 0; i < movies.length; i++) {
    //     var curTitle = movies[i].title.toUpperCase()
    //     if (curTitle.includes(word)) {
    //         newResult.push(movies[i])
    //     }
    // }
    // return newResult
}

async function searchMovie() {
    if (searchEngine.value != "") {
        webtitle.innerHTML = "Search Results"
        lastSearchedWord = searchEngine.value
        movieGridElem.innerHTML = ``
        searchedMovies = await searchMovieResults(searchEngine.value)
        searchedMovies.forEach(addMovies)
        searchEngine.value = null
        searchEngine.placeholder = "Search Movie..."
        loadingSearches = true
    }
    else {
        backToStandard()
    }
}

function scrollToTop() {
    console.log("test")
    window.scrollTo(0, 0);
}

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        searchMovie()
    }
})

function backToStandard() {
    webtitle.innerHTML = "Now Playing"
    searchedMovies = new Array()
    movieGridElem.innerHTML = ``
    apiMovies.forEach(addMovies)
    loadingSearches = false
}

function disappearPopup() {
    const popUpElement = document.querySelector(".popup")
    const popUpChildElement = document.querySelector(".popupChild")
    popUpElement.classList.remove("fadeIn")
    popUpElement.classList.add("fadeOut")
    setTimeout(() => {
        popUpElement.removeChild(popUpChildElement)
        popUpElement.style.visibility = "hidden";
    }, 1000)
}

const openPopup = async (curID) => {
    const youtubeLink = "https://www.youtube.com/embed/"

    console.log("clicked")
    console.log(curID)
    
    const res = await fetch(`https://api.themoviedb.org/3/movie/${curID}?api_key=${myApi}`)
    const data = await res.json()
    console.log(data)
    const resVid = await fetch(`https://api.themoviedb.org/3/movie/${curID}/videos?api_key=${myApi}`)
    const dataVid = await resVid.json()
    console.log(dataVid.results)
    var trailerKey = dataVid.results[0].key
    console.log(trailerKey)
    console.log(data.overview)

    var trailer_url = youtubeLink + trailerKey
    var trailer_summary = data.overview

    const popUpElement = document.querySelector(".popup")
    if (popUpElement.classList.length > 1) {
        popUpElement.classList.remove("fadeOut")
    }
    popUpElement.classList.add("fadeIn")

    // trailer_url = "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" 
    // trailer_summary = "test summary"
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


window.onload = async function () {
    await getResults()
    console.log(apiMovies)
    // for (let i = 0; i < 10; i++) {
    //     curMovies.push(movies[i])
    // }
    // curMovies.forEach(addMovies)
    apiMovies.forEach(addMovies)


    // for (let i = 0; i < ratings.length; i++) {
    //     ratings[i].addEventListener('click', function(event){
    //         openPopup();
    //     });
    // }
}

// updateCurrent(8)
// curMovies.forEach(addMovies)