const modal = document.getElementById("myModal");

//Ouverture de la modale//
const listBtnModifier = document.querySelectorAll(".btnModifier");
listBtnModifier.forEach(function (bouttonModifier) {
  bouttonModifier.addEventListener("click", () => {
    modal.style.display = "block";
    creataGallerie();
  });
});

//fermeture de la modale//
const listBtnClose = document.querySelectorAll(".close");
listBtnClose.forEach(function (bouttonClose) {
  bouttonClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function creataGallerie() {
  console.log(allProjects);

  const galleryModal = document.querySelector(".modale-gallery");
  document.querySelector(".modale-gallery").innerHTML = "";
  for (let i = 0; i < allProjects.length; i++) {
    const projet = allProjects[i];
    const elementsProjet = document.createElement("figure");
    elementsProjet.setAttribute("id", "figure-modal" + projet.id);
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;

    const iconTrash = document.createElement("div");
    iconTrash.className = "iconTrash";
    iconTrash.addEventListener("click", (event) => {
      console.log("je veux supprimer cet element", projet.id);
      deleteProject(projet.id);
    });
    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash-can";
    iconTrash.appendChild(trash);

    const btnEditer = document.createElement("button");
    btnEditer.innerText = "Editer";
    btnEditer.className = "editer-btn";

    elementsProjet.appendChild(imageElement);
    elementsProjet.appendChild(iconTrash);
    elementsProjet.appendChild(btnEditer);

    galleryModal.appendChild(elementsProjet);
  }
}

function deleteProject(id) {
  // coder le fetch de suppression d'un projet
}
