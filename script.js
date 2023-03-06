const games = {
}
games.init = function() {
    games.getGames();
}
games.getGames = function() {
    fetch("https://api.rawg.io/api/games?key=846afc6b4381418ab6cfc847bfc018bc")
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data.results);
        let info = data.results;
        // games.filterRatings(data.results);
        games.playTimeType(data.results);
        games.searchPlayTime(data.results);
        games.searchGames(data.results);
        games.showGames(info);
    });
}

games.showGames = function(gamesList) {
    let games = document.querySelector(".games");
    for(let i = 0; i < gamesList.length; i++) {
        let cardImage = document.createElement("div");
        let cardTitle = document.createElement("div");
        let cardInfo = document.createElement("div");
        let card = document.createElement("div");
        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        card.appendChild(cardInfo);
        cardImage.className = "card-image";
        cardTitle.className = "card-title";
        cardInfo.className = "card-Info";
        card.className = "card";
        games.appendChild(card);

        let img = document.createElement("img");
        img.src = `${gamesList[i].background_image}`;
        cardImage.appendChild(img);

        let textTitle = document.createElement("h2");
        textTitle.innerHTML = `${gamesList[i].name}`;
        cardTitle.appendChild(textTitle);

        let releaseDateContainer = document.createElement("div");
        releaseDateContainer.className = "info";
        cardInfo.appendChild(releaseDateContainer);
        let releaseDateValue = document.createElement("div");
        releaseDateValue.className = "value";
        releaseDateValue.innerHTML = `${gamesList[i].released}`;
        releaseDateContainer.appendChild(releaseDateValue);
        let releaseDateText = document.createElement("div");
        releaseDateText.className = "value-text";
        releaseDateText.innerHTML = "Release Date";
        releaseDateContainer.appendChild(releaseDateText);

        let ratingContainer = document.createElement("div");
        ratingContainer.className = "info";
        ratingContainer.classList.add("border");
        cardInfo.appendChild(ratingContainer);
        let ratingValue = document.createElement("div");
        ratingValue.className = "value";
        ratingValue.innerHTML = `${gamesList[i].esrb_rating.name}`;
        ratingContainer.appendChild(ratingValue);
        let ratingText = document.createElement("div");
        ratingText.className = "value-text";
        ratingText.innerHTML = "Rating";
        ratingContainer.appendChild(ratingText);
        
        let playTimeContainer = document.createElement("div");
        playTimeContainer.className = "info";
        cardInfo.appendChild(playTimeContainer);
        let playTimeValue = document.createElement("div");
        playTimeValue.className = "value";
        playTimeValue.innerHTML = `${gamesList[i].playtime}`;
        playTimeContainer.appendChild(playTimeValue);
        let playTimeText = document.createElement("div");
        playTimeText.className = "value-text";
        playTimeText.innerHTML = "PlayTime";
        playTimeContainer.appendChild(playTimeText);
    }   
}

let resultsBtn = document.querySelector(".results");
let searchBtn = document.querySelector(".search");
let ratingBtn = document.querySelector(".rating")

// games.filterRatings = function (grading) {
//     let games = [];
//     for (let i = 0; i < grading.length; i++) {
//         for (let j = 0; j < grading[i].esrb_rating; j++) {
//             games.push(grading[i].esrb_rating[j].name)
//         }
//     }
//     let uniqueGrades = [...new Set(games)];

//     let select = document.querySelector('#rating-type');

//     uniqueGrades.forEach(function(gr) {
//             let opt = document.createElement("option");
//             opt.textContent = gr;
//             opt.value = gr;
//             select.appendChild(opt);   
//     })
//     return games.showRatings(grading);
// }

// games.showRatings = function() {

// }

games.playTimeType = function (show) {
  let gamesShow = [];
  for (let i = 0; i < show.length; i++) {
    gamesShow.push(show[i].playtime);
  }

  let newShows = [...new Set(gamesShow)];

  let select = document.querySelector("#playTime-type");
  newShows.forEach(function (shows) {
    let opt = document.createElement("option");
    opt.textContent = shows;
    opt.value = shows;
    select.appendChild(opt);
  });

  return games.searchPlayTime(show);
};

games.searchPlayTime = function (gamesShow) {
  searchBtn.addEventListener("click", function () {
       let clearPage = document.querySelector(".games");
       clearPage.innerHTML = "";
    let select = document.querySelector("#playTime-type");
    let value = select.options[select.selectedIndex].value;
     console.log(value);
    let filter = gamesShow.filter(function (gamesPicture) {
      return gamesPicture.playtime == value;
    });

    games.showGames(filter);
  });
};

games.searchGames = function(search) {
     resultsBtn.addEventListener("click", function () {
         console.log("Hello");
       let clearPage = document.querySelector(".games");
       clearPage.innerHTML = "";
       resultsBtn.style.display = "block";
       let inputVal = document.getElementById("results").value;
       let filter = search.filter(function (ga) {
         return ga.name == inputVal;
       });

       games.showGames(filter);
     });
}

games.init();

//api for games
//the layout of the project would be the image of the game
//title of the game
//in three small spots beside each other you would have the release date
//rating of the game
//and platforms
