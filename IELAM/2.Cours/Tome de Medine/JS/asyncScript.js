const section = document.querySelector("section");
const exerciceIds = ["exercice-1", "exercice-2", "exercice-3"];

const scriptUrls = {
  "exercice-1":
    "https://raw.githubusercontent.com/IAM-B/Frontend-Projects/main/IELAM/2.Cours/Tome%20de%20Medine/JSON/tome1-vocab1.json",
  "exercice-2":
    "https://raw.githubusercontent.com/IAM-B/Frontend-Projects/main/IELAM/2.Cours/Tome%20de%20Medine/JSON/tome1-vocab2.json",
  "exercice-3":
    "https://raw.githubusercontent.com/IAM-B/Frontend-Projects/main/IELAM/2.Cours/Tome%20de%20Medine/JSON/tome1-vocab3.json",
};

let currentExerciceIndex = parseInt(
  localStorage.getItem("currentExerciceIndex")
);

if (isNaN(currentExerciceIndex) || currentExerciceIndex >= exerciceIds.length) {
  currentExerciceIndex = 0;
}

// Charger le fichier JSON
fetch(scriptUrls[exerciceIds[currentExerciceIndex]])
  .then((response) => response.json())
  .then((data) => {
    const vocabularies = data;
    generateVocabularies(vocabularies);
    processVocabularies(vocabularies);

    const script = document.createElement("script");
    script.src = scriptUrls[exerciceIds[currentExerciceIndex]];

    const submitButton = document.querySelector(".btnExo.submit");
    const correctButton = document.querySelector(".btnExo.correct");

    submitButton.addEventListener("click", () => {
      vocab(vocabularies);
    });

    correctButton.addEventListener("click", () => {
      showCorrections(vocabularies);
    });


    const footerElement = document.querySelector("footer");
    const parentElement = footerElement.parentNode;
    parentElement.insertBefore(script, footerElement.nextSibling);

    section.id = exerciceIds[currentExerciceIndex];
    currentExerciceIndex = (currentExerciceIndex + 1) % exerciceIds.length;
    localStorage.setItem("currentExerciceIndex", currentExerciceIndex.toString());
  })
  .catch((error) => {
    console.error("Une erreur s'est produite lors du chargement du fichier JSON:", error);
  });
