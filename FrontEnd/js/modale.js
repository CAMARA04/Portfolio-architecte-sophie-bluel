const modal = document.getElementById("myModal");

//Ouverture de la modale//
const listBtnModifier = document.querySelectorAll(".btnModifier");
listBtnModifier.forEach(function (bouttonModifier) {
  bouttonModifier.addEventListener("click", () => {
    modal.style.display = "block";
    creataGallerie();
    displayGallery();
  });
});

function displayGallery() {
  const modalwindow1 = document.querySelector(".content-gallery");
  const modalwindow2 = document.querySelector(".content-ajout");
  modalwindow2.style.display = "none";
  modalwindow1.style.display = "flex";
}
function displayAjout() {
  const modalwindow1 = document.querySelector(".content-gallery");
  const modalwindow2 = document.querySelector(".content-ajout");
  modalwindow1.style.display = "none";
  modalwindow2.style.display = "flex";
}

function displayModals() {
  const ajoutPhoto = document.querySelector(".Ajout-photo");
  const returnM1 = document.getElementById("return_m1");

  // ******Bouton ajout modale**********
  ajoutPhoto.addEventListener("click", () => {
    displayAjout();
  });

  // ******Bouton retour modale 1**********
  returnM1.addEventListener("click", () => {
    displayGallery();
    document.getElementById("file").value = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.querySelector("#photo-add-m2").style.display = "flex";
  });
}
displayModals();

//fermeture de la modale//
const listBtnClose = document.querySelectorAll(".close");
listBtnClose.forEach(function (bouttonClose) {
  bouttonClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "block";
  }
});

function creataGallerie() {
  console.log(allProjects);

  const galleryModal = document.querySelector(".modale-gallery");
  document.querySelector(".modale-gallery").innerHTML = "";
  for (let i = 0; i < allProjects.length; i++) {
    const projet = allProjects[i];
    const elementsProjet = createProjetModal(projet);
    galleryModal.appendChild(elementsProjet);
  }
}

function createProjetModal(projet) {
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
  return elementsProjet;
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

// *********Rendre le bouton Ajout Photo sous forme d'un INPUT

document.querySelector(".ajout-photo").onclick = function () {
  document.getElementById("file").click();
};

// Ajout d'un projet //
function addproject() {
  const addNewPict = document.getElementById("valider_m2");
  addNewPict.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const image = document.getElementById("file").files[0];
    const category = document.getElementById("category").value;
    const categoryId = parseInt(category);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", image);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((projet) => {
        // l'ajouter sur le tableau globale
        allProjects.push(projet);
        // Ajouter sur la page index
        const figureIndex = createWork(projet);
        document.querySelector(".gallery").appendChild(figureIndex);
        // Ajouter l'element dans la modale
        const figureModale = createProjetModal(projet);
        document.querySelector(".modale-gallery").appendChild(figureModale);
        displayGallery();
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
addproject();

function deleteWorks() {
  for (let i = 0; i < allProjects.length; i++) {
    deleteProject(allProjects[i].id);
  }
}

// Valider la suppression de la galerie au click//
const deleteGalerie = document.getElementById("delete_works");
deleteGalerie.addEventListener("click", () => {
  const resultDeleteGalerie = confirm(
    "Souhaitez-vous vraiment supprimer tous les projets?"
  );
  if (resultDeleteGalerie) {
    deleteWorks();
  }
});

// code pour le preview image modale 2

const containerAjout = document.querySelector(".photo-add-m2");
const inputFile = document.getElementById("file");
const previewImage = document.getElementById("previewImage");
const photoAjoutee = document.getElementById("photo-ajoutee");
const beforeAjout = document.getElementById("beforeAjout");
const apercuPhoto = document.getElementById("apercu-photo");

inputFile.addEventListener("change", function () {
  // Pour vérifier si un objet a été selectionné//
  if (inputFile.files && inputFile.files[0]) {
    // Création objet File Reader
    const reader = new FileReader();

    // Fonction pour rappel lors du changement de fichier //
    reader.onload = function (e) {
      // containerAjout.style.padding = "0";
      apercuPhoto.style.display = "block";
      beforeAjout.style.display = "none";

      // Affichage de l'apercu de la photo à ajoutée //
      photoAjoutee.src = e.target.result;
      photoAjoutee.style.display = "block";
    };
    reader.readAsDataURL(inputFile.files[0]);
  }
});
