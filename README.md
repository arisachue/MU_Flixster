## Week 1 Assignment: Flixster

Submitted by: Arisa Chue

Estimated time spent: 25 hours spent in total

### Application Features

#### CORE FEATURES

- [X] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [X] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [X] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [X] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [X] Website accounts for basic HTML/CSS accessibility features
- [X] Website should be responsive

#### STRETCH FEATURES

- [ ] Deploy website using GitHub Pages. 
- [X] Allow user to view more details about a movie within a popup.
- [X] Improve the user experience through CSS & animation.
- [X] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [X] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video


https://user-images.githubusercontent.com/62860690/174506401-0554e423-6526-43bf-97fa-34dcb59c4727.mp4


https://www.screencast.com/t/Uh3KQ7S0bWC

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the labs were very helpful for understanding the fundamentals of HTML, CSS, Javascript, DOM elements, and getting data from APIs. It would be helpful if we went over CSS grids and more indepth CSS layout information since I felt unprepared when trying to position each element. I also struggled with async functions.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have added more stretch features. I would like to add in a placeholder movie posters for movies that do not have a valid poster, keep the header of the website visible while the user scrolls down, and add more animations. It would also be interesting if the website doesn't go back to the homepage after each search, but to the previously searched page.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I am really proud of what I accomplished in just a few days. I was able to turn in a functional website that has some stretch features. One thing I would like to try is to add a loading animation at the bottom of the page to wait for all the movies to populate when the user tries to load more movies (Robert's idea).

### Shout out

Shout out to Yilika and Phineas for kindly debugging through my code whenever I ran into a bug. Shout out to my peers for sharing creative ideas that I could incorporate into my website, and Preeti for working with me even back at our hotel!
