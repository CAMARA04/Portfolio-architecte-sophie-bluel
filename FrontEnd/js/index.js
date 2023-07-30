// Stockage des données Catégories et Projets
let allCategories = [{ id: "0", name: "Tous" }];
let allProjects = [];

// Récupération des données Catégories
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
        data.forEach((element) => {
          allCategories.push(element);
        });
        fillCategories(allCategories);
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

// ******Catégories********

// Fonction pour filtrer par catégorie de projet

function filterImagesByCategory(categoryId) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Efface le contenu actuel de la galerie

  // Pour verifier si le bouton "TOUS" est selectionné
  if (categoryId === "0") {
    fillWorks(allProjects); //Affiche toutes les images sans filtres
  } else {
    // Filtre les images en fonction de la catégorie sélectionnée
    const filteredProjects = allProjects.filter((project) => {
      return project.categoryId == categoryId;
    });

    // Remplie la galerie avec les images filtrées
    fillWorks(filteredProjects);
  }
}

// Fonction pour remplir les différentes catégories
function fillCategories(tableauCategories) {
  tableauCategories.forEach((element) => {
    const a = createCategorie(element);
    document.querySelector(".filter-bar").appendChild(a);
    if (element.id != 0) {
      const option = createOption(element);
      document.getElementById("category").appendChild(option);
    }
  });
}

// Options des catégories
function createOption(categorie) {
  const option = document.createElement("option");
  option.setAttribute("value", categorie.id);
  option.textContent = categorie.name;

  return option;
}

// Fonction pour creer les catégories
function createCategorie(categorie) {
  const a = document.createElement("a");
  a.setAttribute("class", "filter");
  a.setAttribute("id", categorie.id);
  a.textContent = categorie.name;

  // Ajoute des événements sur le filtre lors de sa creation
  a.addEventListener("click", function () {
    filterImagesByCategory(categorie.id);
  });
  return a;
}

getAllCategories();
getAllWorks();

//*********CREATION DES CARTES WORKS********//

// Récupération des données works
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

// Fonction remplir la partie "Gallery"
function fillWorks(tableauWorks) {
  tableauWorks.forEach((element) => {
    const projet = createWork(element);
    document.querySelector(".gallery").appendChild(projet);
  });
}

// Fonction pour creer les figures
function createWork(work) {
  // console.log("Image - ID de catégorie associé :", work.categoryId);
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

// ******Affichage page editeur *****
displayPage();
function displayPage() {
  //dans le cas ou je suis authentifié
  if (localStorage.getItem("token") && localStorage.getItem("userId")) {
    //Affiche le bouton logout et cache login
    const login = document.getElementById("loginHeader");
    login.style.display = "none";
    const logout = document.getElementById("logoutHeader");
    logout.style.display = "block";
    logout.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.clear();
      displayPage();
    });

    //affiche les boutons modifier
    const listBtnModifier = document.querySelectorAll(".btnModifier");
    listBtnModifier.forEach((element) => {
      element.style.display = "flex";
    });
    //affiche la barre noir
    const edition = document.querySelector(".edition");
    edition.style.display = "flex";

    //cache les filtres
    const filter = document.querySelector(".filter-bar");
    filter.style.display = "none";
  }
  //si je ne suis pas connecté
  else {
    //cache le bouton logout et affiche login
    const login = document.getElementById("loginHeader");
    login.style.display = "block";
    const logout = document.getElementById("logoutHeader");
    logout.style.display = "none";

    //cache les boutons modifier
    const listBtnModifier = document.querySelectorAll(".btnModifier");
    listBtnModifier.forEach((element) => {
      element.style.display = "none";
    });
    //cache la barre noir
    const edition = document.querySelector(".edition");
    edition.style.display = "none";
    //affiche les filtres
    const filter = document.querySelector(".filter-bar");
    filter.style.display = "flex";
  }
}
