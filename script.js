async function getAllManga() {
  let url = "https://ninja-manga-api.herokuapp.com/api/manga";

  const response = await fetch(url).then(resp => resp.json());

  var mangalar = response["mangas"];
  var c = 0;
  mangalar.forEach(manga => {
    if (c%2 == 0) {
      document.querySelector("#cards1").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    } else {
      document.querySelector("#cards2").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    }
    if (c < 3) {
      if (c == 0) {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"], manga["ID"], " active");
      } else {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"], manga["ID"]);
      }
    }
    c += 1;
  });

}

async function searchManga() {
  let url = "https://ninja-manga-api.herokuapp.com/api/manga/search/";

  let keywordDiv = document.querySelector("#keywords");
  let keyword = keywordDiv.value.trim();

  const response = await fetch(url+keyword).then(resp => resp.json());

  if (response["message"] == "No manga found.") {
    document.querySelector("#cards1").innerHTML = "<h3>Manga bulunamadı.</h3><p><small>Küçük büyük harflere dikkat edip tekrar deneyiniz.</small></p>";
    document.querySelector("#cards2").innerHTML = "";
    return;
  }

  var mangalar = response["mangas"];
  var c = 0;

  document.querySelector("#cards1").innerHTML = "";
  document.querySelector("#cards2").innerHTML = "";

  mangalar.forEach(manga => {
    if (c%2 == 0) {
      document.querySelector("#cards1").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    } else {
      document.querySelector("#cards2").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    }
    if (c < 3) {
      if (c == 0) {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"], manga["ID"], " active");
      } else {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"], manga["ID"]);
      }
    }
    c += 1;
  });

}

async function searchTag(tag) {
  let url = "https://ninja-manga-api.herokuapp.com/api/manga/tag/"+tag;
  const response = await fetch(url).then(resp => resp.json());

  console.log(response);

  if (response["message"] == "No manga with that tag.") {
    document.querySelector("#cards1").innerHTML = "<h3>Manga bulunamadı.</h3><p><small>Bu tag'a sahip manga bulunamadı.</small></p>";
    document.querySelector("#cards2").innerHTML = "";
    return;
  }

  var mangalar = response["mangas"];
  var c = 0;

  document.querySelector("#cards1").innerHTML = "";
  document.querySelector("#cards2").innerHTML = "";

  mangalar.forEach(manga => {
    if (c%2 == 0) {
      document.querySelector("#cards1").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    } else {
      document.querySelector("#cards2").innerHTML += newCard(manga["title"], manga["description"], manga["cover"], manga["artist"], manga["ID"]);
    }
    if (c < 3) {
      if (c == 0) {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"], manga["ID"], " active");
      } else {
        document.querySelector("#carousel").innerHTML += newCarousel(manga["title"], manga["cover"], manga["description"],manga["ID"]);
      }
    }
    c += 1;
  });
}

async function getMangaById(id) {
  let labelObj = document.querySelector("#label");
  let descriptionObj = document.querySelector("#description");
  let imageObj = document.querySelector("#image");
  let artistObj = document.querySelector("#artist");
  let chaptersObj = document.querySelector("#chapters");

  let url = "https://ninja-manga-api.herokuapp.com/api/manga/"+id;

  const response = await fetch(url).then(resp => resp.json());
  const respChapter = await fetch("https://ninja-manga-api.herokuapp.com/api/manga/chapters/"+id).then(res => res.json());


  if (response["message"] != "Success.") {
    labelObj.innerHTML = "Manga not found.";
    return;
  } else {
    manga = response["manga"];
    labelObj.innerHTML = manga["title"];
    descriptionObj.innerHTML = manga["description"];
    imageObj.src = manga["cover"];
    artistObj.innerHTML = "by "+manga["artist"];
  }

  if (respChapter["message"] == "Success.") {
    var chapters = respChapter["chapters"];
    chapters.forEach(chapter => {
      chaptersObj.innerHTML += "<li>"+chapter["title"]+"</li>";
    });
  }

}

function newCard(title, description, image, artist, id) {
  return "<div class='card mb-3' style='max-width: 540px;'><div class='row g-0'><div class='col-md-4'><img src='"+image+"' class='img-fluid rounded-start' alt='manga kapağı'></div><div class='col-md-8'><div class='card-body'><h5 class='card-title'><a href='/manga.html?manga="+id+"'>"+title+"</a></h5><p class='card-text'>"+description+"</p><p class='card-text'><small class='text-muted'>"+artist+"</small></p></div></div></div></div>";
}

function newCarousel(label, image, desc, id, active = '') {
  return "<a href='/manga.html?manga="+id+"'><div class='carousel-item"+active+"'><img src='"+image+"' class='d-block w-100 carousel-item-img' alt='...'><div class='carousel-caption d-none d-md-block'><h5>"+label+"</h5><p>"+desc+"</p></div></div></a>";
}

