
 
// Example image tag
// <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>

// id, posterPath, title, voteAverage
const movies = [
   {
   id: 338953,
   posterPath: "/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg",
   title: "Fantastic Beasts: The Secrets of Dumbledore",
   voteAverage: 6.9
   },
   {
   id: 526896,
   posterPath: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
   title: "Morbius",
   voteAverage: 6.4
   },
   {
   id: 752623,
   posterPath: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
   title: "The Lost City",
   voteAverage: 6.8
   },
   {
   id: 675353,
   posterPath: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
   title: "Sonic the Hedgehog 2",
   voteAverage: 7.7
   },
   {
   id: 639933,
   posterPath: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
   title: "The Northman",
   voteAverage: 7.3
   },
   {
   id: 818397,
   posterPath: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
   title: "Memory",
   voteAverage: 7.3
   },
   {
   id: 507086,
   posterPath: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
   title: "Jurassic World Dominion",
   voteAverage: 6.7
   },
   {
   id: 453395,
   posterPath: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
   title: "Doctor Strange in the Multiverse of Madness",
   voteAverage: 7.4
   },
   {
   id: 831946,
   posterPath: "/cpWUtkcgRKeauhTyVMjYHxAutp4.jpg",
   title: "Interceptor",
   voteAverage: 6.3
   },
   {
   id: 610150,
   posterPath: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
   title: "Dragon Ball Super: Super Hero",
   voteAverage: 6.8
   },
   {
   id: 414906,
   posterPath: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
   title: "The Batman",
   voteAverage: 7.8
   },
   {
   id: 628900,
   posterPath: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
   title: "The Contractor",
   voteAverage: 6.6
   },
   {
   id: 629542,
   posterPath: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
   title: "The Bad Guys",
   voteAverage: 7.8
   },
   {
   id: 825808,
   posterPath: "/g2n1lFIFXC0lpG32ysUhFi0Uz61.jpg",
   title: "See for Me",
   voteAverage: 6
   },
   {
   id: 763285,
   posterPath: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
   title: "Ambulance",
   voteAverage: 7
   },
   {
   id: 648579,
   posterPath: "/bmxCAO0tz79xn40swJAEIJPRnC1.jpg",
   title: "The Unbearable Weight of Massive Talent",
   voteAverage: 7.3
   },
   {
   id: 361743,
   posterPath: "/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg",
   title: "Top Gun: Maverick",
   voteAverage: 8.3
   }
];

const imageBaseUrl = "https://image.tmdb.org/t/p/w300"
const movieGridElem = document.querySelector(".movie-grid")
const searchEngine = document.querySelector("#search")
const mainWebsite = document.querySelector(".popup")
const ratings = document.querySelectorAll(".movie-rating")
const myApi = "e8308ebddbe7e86e8a3e6b1c2cb2b96e"
var apiMovies = new Array()

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
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}`)
        const data = await res.json()
        // console.log(data)
        // console.log(data.results)
        for (let i = 0; i < data.results.length; i++) {
            var movie_url = imageBaseUrl + data.results[i].poster_path
            const curMovie = {
                id: data.results[i].id,
                title: data.results[i].title,
                posterPath: data.results[i].poster_path,
                voteAverage: data.results[i].vote_average,
                url: imageBaseUrl + data.results[i].poster_path
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
    // var movie_url = imageBaseUrl + movie.posterPath
    // console.log(movie_url)
    movieGridElem.innerHTML += `
        <div class="movie-item" id="movie-${movie.id}" onclick="openPopup(${movie.id})">
            <div class="outer-flip">
                <div class="inner-flip">
                    <img class="movie-poster" src="${movie.url}" alt="${movie.title}">
                    <h2 class="movie-rating">${movie.voteAverage}</h2>
                </div>
            </div>
            <h3 class="movie-name">${movie.title}</h3>
        </div>`
    // const curRate = document.querySelector(`#movie-${movie.id}`)
    // console.log(curRate)
    // curRate.addEventListener("click", () => openPopup(movie_url))
}



function loadMore() {
    var curIndex = curMovies.length
    for (let i = curIndex; i < curIndex + 5; i++) {
        if (i >= movies.length) {
            break;
        }
        addMovies(movies[i])
        curMovies.push(movies[i])
    }
}

function searchMovieResults(word) {
    word = word.toUpperCase()
    var newResult = new Array()
    for (let i = 0; i < movies.length; i++) {
        var curTitle = movies[i].title.toUpperCase()
        if (curTitle.includes(word)) {
            newResult.push(movies[i])
        }
    }
    return newResult
}

function searchMovie() {
    if (searchEngine.value != "") {
        movieGridElem.innerHTML = ``
        var newMovies = searchMovieResults(searchEngine.value)
        newMovies.forEach(addMovies)
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
    movieGridElem.innerHTML = ``
    curMovies.forEach(addMovies)
}

function disappearPopup() {
    document.querySelector(".popup").style.visibility = "hidden";
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

    // trailer_url = "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" 
    // trailer_summary = "test summary"
    mainWebsite.innerHTML = `
        <button id="close" type="button" class="btn btn-default" onclick="disappearPopup()">X</button>
        <iframe id="trailer" type="text/html" 
        src="${trailer_url}" frameborder="0"></iframe>
        <p id="summary">${trailer_summary}</p>
    `
    document.querySelector(".popup").style.visibility = "visible";
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