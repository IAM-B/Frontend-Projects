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

  for (let i = 0; i < vocabulary.ar.length; i++) {
    const span = document.createElement("span");
    span.classList.add("vocabAR");
    span.textContent = vocabulary.ar[i];

    if (vocabulary.ar[i] === "/") {
      span.classList.add("or");
    } else if (vocabulary.ar[i] === "ou") {
      span.classList.add("and");
    }

    inlineVocabDiv.appendChild(span);
  }

  vocabDiv.appendChild(inlineVocabDiv);

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
          console.log(
            `input-${counter}correspond à : ...${
              vocab.ar[i - 1]
            } اَلْجَمْعُ ${word}`
          );
        } else {
          vocabInput.setAttribute("placeholder", `...${vocab.ar[i - 1]}`);
          console.log(
            `input-${counter}correspond à : ...${vocab.ar[i - 1]} ${word}`
          );
        }
      } else {
        vocabInput.setAttribute("placeholder", "...");
        console.log(`input-${counter}correspond à : ${word}`);
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

  console.log(`goodRep=[${goodRep}]`);
  console.log(`goodRep2=[${goodRep2}]`);
  console.log(`result=[${results}]`);
  console.log(`inputs=[${counter}]`);

  const n = goodRep.length;

  // Vérifier si tous les champs sont remplis
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

    // Vérifier le score
    if (score == n) {
      ChampTxt.innerHTML =
        '<p style="color:#00ff00;text-align: center;font-size: 20px;font-weight: bolder;margin: 50px auto;">الله بارك<br/>Toutes les r&eacute;ponses sont correctes</p>';
    } else {
      ChampTxt.innerHTML =
        '<p style="color:#683f19;text-align: center;font-size: 20px;font-weight: bolder;margin: 50px 0 10px;">الله يسهل عليك<br/>Corrigez les r&eacute;ponses fausses en rouge et r&eacute;essayez</p><br><p style="color:#ff0000;text-align: center;font-size: 20px;font-weight: bolder;margin: 10px auto;">ATTENTION<br>L\'auto-complétion compte pour une erreur</p>';
    }
  } else {
    ChampTxt.innerHTML =
      '<p style="color:#ff0000;text-align: center;font-size: 20px;font-weight: bolder;margin: 50px auto;">بارك الله فيك<br/>Rempli tous les champs</p>';
  }
};

const showCorrections = () => {
  const results = [];
  for (let i = 0; i <= 17; i++) {
    results.push(
      removePunctuation(document.getElementById(i).value.toUpperCase())
    );
  }

  const ChampTxt = document.getElementById("Aff");
  let score = 0;

  // Réponses correctes
  const goodRep = [
    "كلام",
    "قول",
    "أقوال",
    "حرف",
    "حروف",
    "فعل",
    "أفعال",
    "لغة",
    "لغات",
    "كلمة",
    "كلمات",
    "اسم",
    "أسماء",
    "جملة",
    "جمل",
    "العربية",
    "مذكر",
    "مؤنث",
  ];
  const goodRep2 = [
    "كَلَام",
    "قَوْل",
    "أَقْوَال",
    "حَرْف",
    "حُرُوف",
    "فِعْل",
    "أَفْعَال",
    "لُغَة",
    "لُغَات",
    "كَلِمَة",
    "كَلِمَات",
    "اِسْم",
    "أَسْمَاء",
    "جُمْلَة",
    "جُمَل",
    "الْعَرَبِيَّة",
    "مُذَكَّر",
    "مُؤَنَّث",
  ];
  const corrections = [
    "كَلَام/كلام",
    "قَوْل/قول",
    "أَقْوَال/أقوال",
    "حَرْف/حرف",
    "حُرُوف/حروف",
    "فِعْل/فعل",
    "أَفْعَال/أفعال",
    "لُغَة/لغة",
    "لُغَات/لغات",
    "كَلِمَة/كلمة",
    "كَلِمَات/كلمات",
    "اِسْم/اسم",
    "أَسْمَاء/اسماء",
    "جُمْلَة/جملة",
    "جُمَل/جمل",
    "الْعَرَبِيَّة/العربية",
    "مُذَكَّر/مذكر",
    "مُؤَنَّث/مؤنث",
  ];

  const n = goodRep.length;

  // Parcourir les réponses
  for (let i = 0; i < n; i++) {
    const hasVowels = /[ًٌٍَُِّْ]/.test(results[i]);
    if (
      goodRep[i] !== results[i] &&
      (!hasVowels || goodRep2[i] !== results[i])
    ) {
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

let nbAttempts = 0;
const submitButton = document.querySelector(".submit");
const correctionButton = document.querySelector(".correct");
const resetButton = document.querySelector(".reset");

const resetForm = () => {
  // Effacer les valeurs des champs de saisie
  for (let i = 0; i <= counter; i++) {
    document.getElementById(i).value = "";
  }

  // Réinitialiser la couleur des textes en noir
  const allInputs = document.querySelectorAll("input[type='text']");
  allInputs.forEach((input) => {
    input.style.color = "black";
    input.classList.add("correct-answer");
  });

  // Fais defiler la page vers le haut de la section exercice
  const section = document.getElementById("exerciceSection");
  section.scrollIntoView({ behavior: "smooth" });
};

// Ajout de l'écouteur sur le bouton "Valider"
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  nbAttempts++;
  let allAnswersCorrect = true;

  if (nbAttempts === 1) {
    correctionButton.style.display = "inline-block";
  }
});

// Ajout de l'écouteur sur le bouton "Corriger"
correctionButton.addEventListener("click", (event) => {
  event.preventDefault();
  showCorrections();
  nbAttempts++;
  let allAnswersCorrect = true;

  // Vérifier si toutes les réponses sont correctes
  const allInputs = document.querySelectorAll("input[type='text']");
  allInputs.forEach((input) => {
    if (!input.classList.contains("correct-answer")) {
      allAnswersCorrect = false;
      return;
    }
  });
  if (nbAttempts === 2) {
    resetButton.style.display = "inline-block";
    correctionButton.style.display = "none";
  }
});

// Ajout de l'écouteur sur le bouton "Réinitialiser"
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  resetForm();
  nbAttempts = 0;
  correctionButton.style.display = "none";
  resetButton.style.display = "none";
});

// btnVocab
const btnVocab = document.querySelector(".btnVocab");
const Vocab = document.getElementById("vocabLI");
const exerciceSection = document.getElementById("exerciceSection");

function toggleVocab() {
  if (Vocab.classList.contains("Vocab-hidden")) {
    Vocab.classList.remove("Vocab-hidden");
    btnVocab.textContent = "Cacher le vocabulaire";
    Vocab.scrollIntoView({ behavior: "smooth" });
  } else {
    Vocab.classList.add("Vocab-hidden");
    btnVocab.textContent = "Afficher le vocabulaire";
    exerciceSection.scrollIntoView({ behavior: "smooth" });
  }
}

btnVocab.addEventListener("click", toggleVocab);
