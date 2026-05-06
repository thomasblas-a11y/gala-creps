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
    if (appsScriptUrl) {
      await fetch(appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      form.reset();
      status.textContent = "Merci, votre présence au gala du CREPS est confirmée.";
      return;
    }

    const response = await fetch("/api/inscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    form.reset();
    status.textContent = "Merci, votre présence au gala du CREPS est confirmée.";
  } catch (error) {
    status.textContent = error.message || "Impossible d'enregistrer votre réponse.";
  }
});
