let allCategories = [];
let allProjects = [];
function getAllCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      // traitement de la reponse
      console.log(response);
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      // traitement des données
      if (data) {
        console.log(data);
        allCategories = data;
        fillCategories(data);
      }
    })
    .catch((error) => {
      // traitement d'un cas d'erreur
      console.log(error);
      alert(
        "Une erreur est survenue Veuillez contacter l'administrateur du site !!"
      );
    });
}

function fillCategories(tableauCategories) {
  tableauCategories.forEach((element) => {
    const a = createCategorie(element);
    document.querySelector(".filter-bar").appendChild(a);
  });
}

function createCategorie(categorie) {
  const a = document.createElement("a");
  a.setAttribute("class", "filter");
  a.setAttribute("id", categorie.id);
  a.textContent = categorie.name;

  return a;
}

getAllCategories();

//*********CREATION DES CARTES WORKS********//

function getAllWorks() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      // traitement de la reponse
      console.log(response);
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      // traitement des données
      if (data) {
        console.log(data);
        allProjects = data;
        fillWorks(data);
      }
    })
    .catch((error) => {
      // traitement d'un cas d'erreur
      console.log(error);
      alert(
        "Une erreur est survenue Veuillez contacter l'administrateur du site !!"
      );
    });
}

function fillWorks(tableauWorks) {
  tableauWorks.forEach((element) => {
    const projet = createWork(element);
    document.querySelector(".gallery").appendChild(projet);
  });
}

function createWork(work) {
  const figure = document.createElement("figure");
  figure.setAttribute("id", "figure" + work.id);
  const img = document.createElement("img");
  img.setAttribute("src", work.imageUrl);
  img.setAttribute("alt", work.title);
  figure.appendChild(img);

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  figure.appendChild(figcaption);
  return figure;
}

getAllWorks();

// ******Affichage page editeur *****
displayPage();
function displayPage() {
  //dans le cas ou je suis authentifié
  if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    //Afficher le bouton logout et cacher login
    const login = document.getElementById("loginHeader");
    login.style.display = "none";
    const logout = document.getElementById("logoutHeader");
    logout.style.display = "block";
    logout.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.clear();
      displayPage();
    });

    //afficher les boutons modifier
    const listBtnModifier = document.querySelectorAll(".btnModifier");
    listBtnModifier.forEach((element) => {
      element.style.display = "flex";
    });
    //afficher la barre noir
    const edition = document.querySelector(".edition");
    edition.style.display = "block";

    //cacher les filtres
    const filter = document.querySelector(".filter-bar");
    filter.style.display = "none";
  }
  //si je ne suis pas connecté
  else {
    //cacher le bouton logout et afficher login
    const login = document.getElementById("loginHeader");
    login.style.display = "block";
    const logout = document.getElementById("logoutHeader");
    logout.style.display = "none";

    //cacher les boutons modifier
    const listBtnModifier = document.querySelectorAll(".btnModifier");
    listBtnModifier.forEach((element) => {
      element.style.display = "none";
    });
    //cacher la barre noir
    const edition = document.querySelector(".edition");
    edition.style.display = "none";
    //afficher les filtres
    const filter = document.querySelector(".filter-bar");
    filter.style.display = "flex";
  }
}
