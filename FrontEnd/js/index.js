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
