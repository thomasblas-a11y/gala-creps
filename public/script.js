const form = document.getElementById("gala-form");
const status = document.getElementById("status");
const appsScriptUrl = window.GALA_CONFIG?.appsScriptUrl || "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  status.textContent = "Enregistrement en cours...";

  const payload = {
    nom: data.get("nom"),
    prenom: data.get("prenom"),
    statut: data.get("statut"),
    certification: data.get("certification") === "on"
  };

  try {
    const formData = new URLSearchParams();
    formData.append("nom", payload.nom);
    formData.append("prenom", payload.prenom);
    formData.append("statut", payload.statut);
    formData.append("certification", payload.certification ? "true" : "false");

    await fetch(appsScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });

    form.reset();
    status.textContent = "Merci, votre présence au gala du CREPS est confirmée.";
  } catch (error) {
    status.textContent = "Impossible d'enregistrer votre réponse.";
  }
});
