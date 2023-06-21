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

if (window.localStorage.getItem("token") !== null) {
  //Bouton "login remplacé par bouto logout"
  const loginHeader = document.querySelector("#loginHeader");
  loginHeader.innerText = "logout";
  loginHeader.addEventListener("click", function (event) {
    event.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("./index.html");
  });

  /////bouton modifier en dessous photo principale////

  const editPhoto = document.querySelector("#main-photo");
  const iconeEdit = document.createElement("i");
  iconeEdit.className = "fa-regular fa-pen-to-square";
  const textPhoto = document.createElement("p");
  textPhoto.innerText = "modifier";
  const btnEditPhoto = document.createElement("button");

  btnEditPhoto.appendChild(iconeEdit);
  btnEditPhoto.appendChild(textPhoto);
  editPhoto.appendChild(btnEditPhoto);

  /////bouton modifier au dessus de la presentation////

  const editPresentation = document.querySelector("#presentation");
  const iconeEditPres = document.createElement("i");
  iconeEditPres.className = "fa-regular fa-pen-to-square";
  const textEditPres = document.createElement("p");
  textEditPres.innerText = "modifier";
  const btnEditPres = document.createElement("button");
  const firstElement = document.querySelector(".first-element-pres");

  btnEditPres.appendChild(iconeEditPres);
  btnEditPres.appendChild(textEditPres);
  editPresentation.appendChild(btnEditPres);

  /////Bouton modifier "MES PROJETS"////

  const editProjets = document.querySelector("#portfolio");
  const iconeEditPojets = document.createElement("i");
  iconeEditPojets.className = "fa-regular fa-pen-to-square";
  const textEditProjets = document.createElement("p");
  textEditProjets.innerText = "modifier";
  const btnEditProjets = document.createElement("button");

  btnEditProjets.appendChild(iconeEditPojets);
  btnEditProjets.appendChild(textEditProjets);
  editProjets.appendChild(btnEditProjets);
}
