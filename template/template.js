// Tableau des vocabulaires
const vocabularies = [
  {
    fr: "Parole(s), propos :",
    ar: ["أَقْوَال", "/", "قَوْل", "ou", "كَلَام"],
  },
  {
    fr: "Lettre(s) de l’alphabet, particule(s) :",
    ar: ["حُرُوف", "/", "حَرْف"],
  },
  {
    fr: "Verbe(s) :",
    ar: ["أَفْعَال", "/", "فِعْل"],
  },
  {
    fr: "Langue(s) vivante(s) :",
    ar: ["لُغَات", "/", "لُغَة"],
  },
  {
    fr: "Mot(s) :",
    ar: ["كَلِمَات", "/", "كَلِمَة"],
  },
  {
    fr: "Nom(s) :",
    ar: ["أَسْمَاء", "/", "اِسْم"],
  },
  {
    fr: "Phrase(s) :",
    ar: ["جُمَل", "/", "جُمْلَة"],
  },
  {
    fr: "L’arabe (langue) :",
    ar: ["الْعَرَبِيَّة"],
  },
  {
    fr: "Masculin :",
    ar: ["مُذَكَّر"],
  },
  {
    fr: "Féminin :",
    ar: ["مُؤَنَّث"],
  },
];

// Fonction pour créer les éléments span HTML pour la section vocabulaire
function createVocabularySection(vocabulary) {
  const vocabDiv = document.createElement("div");
  vocabDiv.classList.add("vocabulary");

  const label = document.createElement("label");
  label.classList.add("vocabFR");
  label.textContent = vocabulary.fr;
  vocabDiv.appendChild(label);

  const inlineVocabDiv = document.createElement("div");
  inlineVocabDiv.classList.add("inline-vocabulary");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  contentDiv.appendChild(buttonsDiv);
  inlineVocabDiv.appendChild(contentDiv);

  // Ajout de l'élément div avec les propriétés spécifiées
  const buttonModalDiv = document.createElement("div");
  buttonModalDiv.id = "one";
  buttonModalDiv.classList.add("buttonModal");
  buttonModalDiv.innerHTML = `<img style="width: 30px; margin: 5px;" src="https://d1yei2z3i6k35z.cloudfront.net/3164252/6457c2ea8e1c7_dialog.png" alt="dialog" />`;
  

  for (let i = 0; i < vocabulary.ar.length; i++) {
    const span = document.createElement("span");
    span.classList.add("vocabAR");
    span.textContent = vocabulary.ar[i];

    if (vocabulary.ar[i] === "/") {
      span.classList.add("or");
    } else if (vocabulary.ar[i] === "ou") {
      span.classList.add("and");
    }

    buttonsDiv.appendChild(span);
    span.appendChild(buttonModalDiv);
  }

  vocabDiv.appendChild(inlineVocabDiv);

  // Ajout du code HTML supplémentaire
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";
  modalContainer.classList.add("modal-container");

  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <h2>I'm a Modal</h2>
    <p>Hear me roar.</p>
    <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
      <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
    </svg>
  `;

  modalBackground.appendChild(modal);
  modalContainer.appendChild(modalBackground);

  vocabDiv.appendChild(modalContainer);

  const buttons = vocabDiv.querySelectorAll(".buttonModal");
  buttons.forEach((modal) => {
    modal.addEventListener("click", function () {
      const buttonId = this.getAttribute("id");
      const modalContainer = document.getElementById("modal-container");
      modalContainer.removeAttribute("class");
      modalContainer.classList.add(buttonId);
      document.body.classList.add("modal-active");
    });
  });

  modalContainer.addEventListener("click", function () {
    this.classList.add("out");
    document.body.classList.remove("modal-active");
  });

  return vocabDiv;
}

// Fonction pour générer les éléments HTML pour toutes les sections de vocabulaire
function generateVocabularies() {
  const exoForm = document.getElementById("vocab");

  for (let i = 0; i < vocabularies.length; i++) {
    const vocabSection = createVocabularySection(vocabularies[i]);
    exoForm.appendChild(vocabSection);
  }
}
generateVocabularies();

// Fonction pour créer les éléments input HTML pour la section exercice
let counter = -1;
vocabularies.forEach((vocab) => {
  const vocabularyDiv = document.createElement("div");
  vocabularyDiv.classList.add("vocabulary");

  const vocabLabel = document.createElement("label");
  vocabLabel.classList.add("vocabFR");
  vocabLabel.textContent = vocab.fr;

  const inputDiv = document.createElement("div");
  inputDiv.classList.add("inline-input");

  vocab.ar.reverse().forEach((word, i) => {
    if (word !== "/" && word !== "ou") {
      const vocabInput = document.createElement("input");
      vocabInput.setAttribute("type", "text");
      vocabInput.setAttribute("required", "");
      vocabInput.classList.add("InputFill");
      vocabInput.setAttribute("autocomplete", "off");

      vocabInput.setAttribute("id", `input-${counter}`);
      counter++;

      if (i > 0 && (vocab.ar[i - 1] === "/" || vocab.ar[i - 1] === "ou")) {
        if (vocab.ar[i - 1] === "/") {
          vocabInput.setAttribute(
            "placeholder",
            `...${vocab.ar[i - 1]} اَلْجَمْعُ`
          );
          console.log(`input-${counter} correspond à : اَلْجَمْعُ/... ${word}`);
        } else {
          vocabInput.setAttribute("placeholder", `...${vocab.ar[i - 1]}`);
          console.log(
            `input-${counter} correspond à : ${word} ...${vocab.ar[i - 1]}`
          );
        }
      } else {
        vocabInput.setAttribute("placeholder", "...");
        console.log(`input-${counter} correspond à : ${word} ...`);
      }

      vocabInput.setAttribute("id", `${counter}`);
      inputDiv.insertBefore(vocabInput, inputDiv.firstChild);
    }
  });

  vocabularyDiv.appendChild(vocabLabel);
  vocabularyDiv.appendChild(inputDiv);
  document.querySelector("#exo").appendChild(vocabularyDiv);
});

// Fonction qui enleve les caractères spéciaux
const removePunctuation = (str) => {
  if (!str) {
    return false;
  }
  return str.replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\b ]/g, "");
};

// Fonction qui vérifie les réponses
const vocab = () => {
  const results = [];
  for (let i = 0; i <= counter; i++) {
    results.push(
      removePunctuation(document.getElementById(i).value.toUpperCase())
    );
  }
  const section = document.getElementById("exerciceSection");
  const offset = section.offsetTop - 100;
  window.scrollTo({ top: offset, behavior: "smooth" });

  const ChampTxt = document.getElementById("Aff");
  let score = 0;
  let goodRep = [];
  let goodRep2 = [];
  for (let i = 0; i < vocabularies.length; i++) {
    const arVocabulary = vocabularies[i].ar;
    const filteredArVocabulary = arVocabulary
      .filter((word) => !["ou", "/"].includes(word))
      .map((word) => word.replace(/[ًٌٍَُِّْ]/g, ""));
    goodRep = goodRep.concat(filteredArVocabulary);
    const filteredArVocabulary2 = arVocabulary.filter(
      (word) => !["ou", "/"].includes(word)
    );
    goodRep2 = goodRep2.concat(filteredArVocabulary2);
  }

  const n = goodRep.length;
  let allAnswersProvided = true;
  for (let i = 0; i < results.length; i++) {
    if (!results[i]) {
      allAnswersProvided = false;
      break;
    }
  }

  if (allAnswersProvided) {
    let score = 0;
    for (let i = 0; i < results.length; i++) {
      const isCorrect = results[i] === goodRep[i] || results[i] === goodRep2[i];
      if (!isCorrect) {
        document.getElementById(i).style.color = "#ff0000";
        document.getElementById(i).classList.remove("correct-answer");
      } else {
        score++;
        document.getElementById(i).style.color = "#00ff00";
        document.getElementById(i).classList.add("correct-answer");
      }
    }
    if (score == n) {
      ChampTxt.innerHTML =
        '<p class="alert p1">اللهم بارك<br/>Toutes les r&eacute;ponses sont correctes</p>';
    } else {
      ChampTxt.innerHTML =
        '<p class="alert p2">اللهم يسهل عليك<br/>Corrigez les r&eacute;ponses fausses en rouge et r&eacute;essayez</p><br><p class="alert p3">ATTENTION<br>L\'auto-complétion compte pour une erreur</p>';
    }
  } else {
    ChampTxt.innerHTML =
      '<p class="alert p4">بارك الله فيك<br/>Rempli tous les champs</p>';
  }
};

// Fonction qui montre les corrections
const showCorrections = () => {
  const results = [];
  for (let i = 0; i <= counter; i++) {
    results.push(
      removePunctuation(document.getElementById(i).value.toUpperCase())
    );
  }
  const section = document.getElementById("exerciceSection");
  const offset = section.offsetTop - 100;
  window.scrollTo({ top: offset, behavior: "smooth" });

  const ChampTxt = document.getElementById("Aff");
  let score = 0;
  let goodRep = [];
  let goodRep2 = [];

  for (let i = 0; i < vocabularies.length; i++) {
    const arVocabulary = vocabularies[i].ar;
    const filteredArVocabulary = arVocabulary
      .filter((word) => !["ou", "/"].includes(word))
      .map((word) => word.replace(/[ًٌٍَُِّْ]/g, ""));
    goodRep = goodRep.concat(filteredArVocabulary);
    const filteredArVocabulary2 = arVocabulary.filter(
      (word) => !["ou", "/"].includes(word)
    );
    goodRep2 = goodRep2.concat(filteredArVocabulary2);
  }
  const corrections = [];

  for (let i = 0; i < goodRep.length && i < goodRep2.length; i++) {
    corrections.push(goodRep[i] + "/" + goodRep2[i]);
  }
  console.log(`corrections=[${corrections}]`);

  const n = goodRep.length;

  // Parcourir les réponses
  for (let i = 0; i < n; i++) {
    if (goodRep[i] !== results[i] && goodRep2[i] !== results[i]) {
      const isCorrect = false;
      for (const correctAnswer of [goodRep[i], goodRep2[i]]) {
        if (correctAnswer === results[i]) {
          isCorrect = true;
          break;
        }
      }
      if (!isCorrect) {
        document.getElementById(i).style.color = "#755503";
        document.getElementById(i).classList.remove("correct-answer");
        document.getElementById(i).value = corrections[i];
      }
    }
  }
};

// Fonction qui réinitialise le formulaire
let nbAttempts = 0;
const submitButton = document.querySelector(".submit");
const correctionButton = document.querySelector(".correct");
const resetButton = document.querySelector(".reset");
const resetForm = () => {
  for (let i = 0; i <= counter; i++) {
    document.getElementById(i).value = "";
  }
  const allInputs = document.querySelectorAll("input[type='text']");
  allInputs.forEach((input) => {
    input.style.color = "black";
    input.classList.add("correct-answer");
  });
  const section = document.getElementById("exerciceSection");
  const offset = section.offsetTop - 100;
  window.scrollTo({ top: offset, behavior: "smooth" });

  const alertElement = document.querySelectorAll(".alert");
  alertElement.forEach((alert) => {
    alert.remove();
  });
};

// Fonction qui cache le vocabulaires et affiche la section exercice
const showExerciseSection = () => {
  const vocabSection = document.querySelector("#vocabLI");
  const exerciseSection = document.querySelector("#exerciceSection");

  vocabSection.classList.add("fade-out");
  exerciseSection.classList.add("fade-in");

  setTimeout(() => {
    vocabSection.style.display = "none";
    exerciseSection.style.display = "block";
    const offset = exerciseSection.offsetTop - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, 500);
};
