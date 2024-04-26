// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?



function getAllDirectors(movies) {
  const directors = movies
    .map((movie) => {
      return movie.director;
    })
    .filter((value, index, originalArray) => {
      return originalArray.indexOf(value) === index;
    });
  return directors;
}

console.log(getAllDirectors(movies));


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?



function howManyMovies(movies) {
  const dramaMoviesDirectedByStevenSpielberg = movies.filter((movie) => {
    const isMovieDirectedByStevenSpielberg =
      movie.director === 'Steven Spielberg';
    const isMovieADrama = movie.genre.indexOf('Drama') >= 0;
    return isMovieDirectedByStevenSpielberg && isMovieADrama;
  });
  return dramaMoviesDirectedByStevenSpielberg.length;
}

console.log(howManyMovies(movies));



// Iteration 3: All scores average - Get the average of all scores with 2 decimals


function scoresAverage(movies) {
  if (movies.length === 0) {
    return 0;
  }
  const sumOfScores = movies.reduce((accumulator, movie) => {
    if (movie.score) {
      return accumulator + movie.score;
    } else {
      return accumulator;
    }
  }, 0);
  const averageScore = sumOfScores / movies.length;
  return round(averageScore, 2);
}

const round = (value, digits) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

console.log(scoresAverage(movies));




// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter((movie) => {
    return movie.genre.includes('Drama');
  });
  averageScore = scoresAverage(dramaMovies);
  return averageScore;
}

console.log(dramaMoviesScore(movies));



// Iteration 5: Ordering by year - Order by year, ascending (in growing order)


function orderByYear(movies) {
  const moviesClone = [...movies];
  moviesClone.sort((first, second) => {
    if (first.year > second.year) {
      return 1;
    } else if (first.year < second.year) {
      return -1;
    } else {
      return first.title.localeCompare(second.title);
    }
  });
  return moviesClone;
}

console.log(orderByYear(movies));



// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles


function orderAlphabetically(movies) {
  const titles = movies.map((movie) => movie.title);
  titles.sort((first, second) => first.localeCompare(second));
  const first20Titles = titles.slice(0, 20);
  return first20Titles;
}

console.log(orderAlphabetically(movies));


// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes


const convertDurationToNumberOfMinutes = (duration) => {
  const minutes = duration.split(' ').reduce((accumulator, value) => {
    let number = parseInt(value);
    if (value.includes('h')) number *= 60;
    return accumulator + number;
  }, 0);
  return minutes;
};

function turnHoursToMinutes(movies) {
  const moviesWithHoursTurnedToMinutes = movies.map((movie) => {
    const movieWithHoursTurnedToMinutes = { ...movie };
    movieWithHoursTurnedToMinutes.duration = convertDurationToNumberOfMinutes(
      movie.duration
    );
    return movieWithHoursTurnedToMinutes;
  });
  return moviesWithHoursTurnedToMinutes;
}

console.log(turnHoursToMinutes(movies));




// BONUS - Iteration 8: Best yearly score average - Best yearly score average

const bestYearAvg = (array) => {
  if (array.length === 0) {
    return null;
  }

  const movieAverageScoreByYear = array.reduce((accumulator, movie) => {
    const yearOfMovie = movie.year;
    const scoreOfMovie = movie.score;

    if (typeof accumulator[yearOfMovie] === 'undefined') {
      accumulator[yearOfMovie] = [scoreOfMovie];
    } else {
      accumulator[yearOfMovie].push(scoreOfMovie);
    }

    return accumulator;
  }, {});

  for (let year in movieAverageScoreByYear) {
    const averageScoreOfYear = movieAverageScoreByYear[year].reduce(
      (accumulator, score, index, originalArray) =>
        accumulator + score / originalArray.length,
      0
    );
    movieAverageScoreByYear[year] = averageScoreOfYear;
  }

  const auxiliaryArray = Object.entries(movieAverageScoreByYear);

  auxiliaryArray.sort((a, b) => {
    const scoreOfYearA = a[1];
    const scoreOfYearB = b[1];
    if (scoreOfYearA > scoreOfYearB) {
      return -1;
    } else {
      return 1;
    }
  });

  const year = auxiliaryArray[0][0];
  const score = auxiliaryArray[0][1];

  return `The best year was ${year} with an average score of ${score}`;
};

console.log(bestYearAvg(movies));



