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
      const result = confirm("Souhaitez-vous supprimer cet element ?");
      if (result) {
        deleteProject(projet.id);
      }
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

// Suppression d'un projet //
function deleteProject(id) {
  const options = {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(`http://localhost:5678/api/works/${id}`, options)
    .then((response) => {
      console.log(response);
      if (response.status == 204) {
        //1/ Supprimer l'element du tableau global allProjects
        allProjects = allProjects.filter((element) => element.id != id);
        console.log(allProjects);
        //2/ Supprimer la figure de la page index
        document.getElementById("figure" + id).remove();
        //3/ Supprimer la figure depuis la modale
        document.getElementById("figure-modal" + id).remove();
      } else {
        alert("Veuillez vous reconnecter !");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Erreur de suppression du projet " + id + " ! ");
    });
}
