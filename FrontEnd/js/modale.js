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
