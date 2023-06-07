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

function getAllWorks() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      // traitement de la reponse
      console.log(response.tableauWorks);
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      // traitement des données
      if (data) {
        console.log(data);
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
    const img = createWork(element);
    document.querySelector(".gallery").appendChild(img);
  });
}

function createWork(work) {
  const img = document.createElement("img");
  // img.setAttribute("class");
  img.setAttribute("id", work.id);
  img.setAttribute("imageUrl", work.imageUrl);
  img.setAttribute("title", work.title);
  // img.setAttribute("categoryId", work.categoryid);
  img.setAttribute("userId", work.userId);

  return img;
}
getAllWorks();
