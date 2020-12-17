window.addEventListener("DOMContentLoaded", getData);

const gamesInfo = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail?_embed&per_page=20";

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_game_id = urlParams.get("page");
    console.log(the_game_id);

    if (true) {
        fetch("https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail/25?_embed")
            //        fetch("https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail/" + the_game_id + "?_embed")
            .then(res => res.json())
            .then(stuffReceived);
    } else {
        fetch(gamesInfo)
            .then(res => res.json())
            .then(handleData);
    }
}

function handleData(games) {
    console.log("games?");
    console.log(games);
}

function stuffReceived(stuff) {
    showGame(stuff);
    createImages(stuff);
}

function createImages(lan) {
    console.log(lan);
    console.log("languages here");
    lan.languages.forEach((lang) => {
        console.log(lang.guid);
        console.log("here it is");
        const lan_img = document.createElement("img");
        lan_img.src = lang.guid;
        document.querySelector(".languages").appendChild(lan_img);
    })
}

function showGame(game) {
    console.log(game);

    const template = document.querySelector("#single_game").content;
    const clone = template.cloneNode(true);

    // populate with information
    const images = game._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
    clone.querySelector(".header_container img").src = images;
    const h1 = clone.querySelector(".header_description h1");
    h1.textContent = game.title.rendered;
    const shortDescription = clone.querySelector(".header_description p");
    shortDescription.innerHTML = game.excerpt.rendered;

    const longDescription = clone.querySelector(".long_description p");
    longDescription.innerHTML = game.content.rendered;
    //    const denmark = game.languages[0].guid;
    //    clone.querySelector(".inner_details .denmark").src = denmark;
    //    const germany = game.languages[1].guid;
    //    clone.querySelector(".inner_details .germany").src = germany;
    //    const norway = game.languages[2].guid;
    //    clone.querySelector(".inner_details .norway").src = norway;
    /// rest of the flags later
    const fileSize = clone.querySelector(".file_size");
    fileSize.textContent = game.file_size;
    const releaseDate = clone.querySelector(".release_date");
    releaseDate.textContent = game.release_date;
    const players = clone.querySelector(".players");
    players.textContent = game.players;
    const category = clone.querySelector(".category");
    category.textContent = game.genre;



    // append child
    document.querySelector("main").appendChild(clone);
}
