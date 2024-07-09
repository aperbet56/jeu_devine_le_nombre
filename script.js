// Récupération des différents éléments
const livesDiv = document.querySelector(".lives");
const message = document.querySelector("#message");
const form = document.querySelector("#form__input");
const input = document.querySelector("#number");
const tryBtn = document.querySelector("#try__btn");
const replayBtn = document.querySelector("#replay__btn");
const body = document.getElementsByTagName("body")[0];

// Modèle de coeurs
const emptyHeart = '<ion-icon name="heart-outline"></ion-icon>';
const fullHeart = '<ion-icon name="heart"></ion-icon>';

// Fonds
const backgroundCold =
  "linear-gradient(120deg, rgb(237, 243, 253) 0%, rgb(223, 245, 255) 100%)";
const backgroundLukewarm =
  "linear-gradient(120deg, rgb(255, 194, 4) 0%, rgb(255, 160, 132) 100%)";
const backgroundHot = "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)";
const backgroundBurning =
  "linear-gradient(-60deg, rgb(255, 41, 41) 0%, rgb(255, 162, 27) 100%)";

const backgroundWin =
  "linear-gradient(-225deg, rgb(54, 1, 251) 0%, rgb(124, 1, 251) 29%, rgb(253, 6, 88) 67%, rgb(255, 248, 0) 100%)";
const backgroundLoose = "linear-gradient(rgb(6, 6, 6) 0%, rgb(253, 2, 2) 100%)";

// Déclaration de la fonction play qui contient toute la logique du jeu
const play = () => {
  // nombre aléatoire stocké dans une constante
  const randomNumber = Math.floor(Math.random() * 51);
  const totallives = 3;
  let lives = totallives;
  console.log(randomNumber);

  // Ecoute de la soumission du formulaire et actualisation à chaque essai
  form.addEventListener("submit", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    const inputValue = parseInt(input.value);

    // Mise en place de conditions
    if (inputValue < 0 || inputValue > 50) return;

    if (inputValue === randomNumber) {
      body.style.backgroundImage = backgroundWin;
      message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}.`;
      replayBtn.style.display = "block";
      tryBtn.setAttribute("disabled", "");
    }

    if (inputValue !== randomNumber) {
      if (randomNumber < inputValue + 3 && randomNumber > inputValue - 3) {
        body.style.backgroundImage = backgroundBurning;
        message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
      } else if (
        randomNumber < inputValue + 6 &&
        randomNumber > inputValue - 6
      ) {
        body.style.backgroundImage = backgroundHot;
        message.textContent = "C'est Chaud ! 🔥 ";
      } else if (
        randomNumber < inputValue + 11 &&
        randomNumber > inputValue - 11
      ) {
        body.style.backgroundImage = backgroundLukewarm;
        message.textContent = "C'est Tiède. 😐 ";
      } else {
        body.style.backgroundImage = backgroundCold;
        message.textContent = "C'est Froid. ❄️ ";
      }
      // Réduction du nombre de vies
      lives--;

      // Appel de la fonction verifyLoose
      verifyLoose();
    }
    // Appel de la fonction
    updateStatusHeart(lives);
  });

  // Déclaration de la fonction verifyLoose qui va vérifier si le joueuer a perdu et mettre à jour le status du jeu
  const verifyLoose = () => {
    if (lives === 0) {
      body.style.backgroundImage = backgroundLoose;
      body.style.color = "#ffffff";
      tryBtn.setAttribute("disabled", "");
      message.textContent = `Vous avez perdu. La réponse était ${randomNumber}.`;
      replayBtn.style.display = "block";
    }
  };

  // Déclaration de la fonction updateStatusHeart qui va mettre à jour les coeurs
  const updateStatusHeart = (lives) => {
    livesDiv.innerHTML = "";
    // Création de la variable arrayLives
    let arraylives = [];
    for (let i = 0; i < lives; i++) {
      arraylives.push(fullHeart);
    }
    for (let i = 0; i < totallives - lives; i++) {
      arraylives.push(emptyHeart);
    }
    arraylives.forEach((heart) => {
      livesDiv.innerHTML += heart;
    });
  };

  //Appel de la fonction updateStatusHeart
  updateStatusHeart(lives);

  // Ecoute de l'événement "click" sur le bouton rejouer
  replayBtn.addEventListener("click", () => {
    message.style.display = "none";
    document.location.reload(true);
  });
};
// Appel de la fonction play()
play();
