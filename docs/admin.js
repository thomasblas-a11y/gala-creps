async function refresh() {
  const sheetUrl = window.GALA_CONFIG?.sheetUrl || "";
  const downloadLink = document.getElementById("download-link");
  if (sheetUrl) {
    downloadLink.href = sheetUrl;
    downloadLink.textContent = "Ouvrir le Google Sheet";
    document.getElementById("rows").innerHTML = `
      <tr>
        <td colspan="5">Les réponses sont disponibles dans le Google Sheet lié au formulaire.</td>
      </tr>
    `;
    return;
  }

  const response = await fetch("/api/responses");
  const rows = await response.json();
  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  document.getElementById("total").textContent = rows.length;
  document.getElementById("internes").textContent = rows.filter((row) => row.statut === "Interne").length;
  document.getElementById("externes").textContent = rows.filter((row) => row.statut === "Externe").length;

  for (const row of rows.toReversed()) {
    const tr = document.createElement("tr");
    const date = new Date(row.date).toLocaleString("fr-FR");
    tr.innerHTML = `
      <td>${date}</td>
      <td>${escapeHtml(row.nom)}</td>
      <td>${escapeHtml(row.prenom)}</td>
      <td>${escapeHtml(row.statut)}</td>
      <td>${row.certification ? "Oui" : "Non"}</td>
    `;
    tbody.appendChild(tr);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

refresh();
setInterval(refresh, 5000);
