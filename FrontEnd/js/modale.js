const modal = document.getElementById("myModal");

//Ouverture de la modale//
const openModal = document.querySelectorAll(".btnModifier");
openModal.forEach(function (openModal) {
  openModal.addEventListener("click", () => {
    console.log("je suis cliqué!!!");
    modal.style.display = "block";
  });
});

//fermeture de la modale//
const closeModal = document.getElementsByClassName("close")[0];
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function creataGallerie() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())

    .then((gallerieImg) => {
      for (let i = 0; i < gallerieImg.length; i++) {
        const projet = gallerieImg[i];
        const galleryModal = document.querySelector(".modale-gallery");
        const elementsProjet = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;

        galleryModal.appendChild(elementsProjet);
        elementsProjet.appendChild(imageElement);

        console.log(projet);
      }
    });
}

creataGallerie();
