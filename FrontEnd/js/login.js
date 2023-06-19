//detecter un clic qur submit du formulaire ******

const login = document.querySelector("#login");
const email = document.getElementById("email");
const password = document.getElementById("password");

login.addEventListener("submit", function (event) {
  event.preventDefault();

  const loginInfo = {
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(loginInfo),
  })
    .then((response) => {
      console.log(response);
      if (response.status == 404)
        alert(
          "Utilisateur non trouvé, Veuillez verifier les parametres d'accès !!"
        );
      if (response.status == 401)
        alert("Veuillez verifier les parametres d'accès !!");
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      console.log("I'm here", data);
      // si data est different de undefined
      if (data) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";
      }
    })
    .catch((error) => {
      // traitement d'un cas d'erreur
      console.log(error);
      alert(
        "Une erreur est survenue Veuillez contacter l'administrateur du site !!"
      );
    });
});
