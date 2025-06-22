const API_TOKEN = "WWwHg03JkIGjxAzIMppFEMr73zYDX2Up"; 
const DATABASE_ID = "243621"; 
const TABLE_ID = "580424"; 

const API_URL = `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/`;

document.getElementById("formPropietario").addEventListener("submit", function (e) {
  e.preventDefault();

  const idPropietario = document.getElementById("idPropietario").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const domicilio = document.getElementById("domicilio").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "field_4675567": idPropietario,
      "field_4675568": nombre,
      "field_4675569": domicilio,
      "field_4675570": telefono,
      "field_4675571": email,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("✅ Propietario agregado correctamente.");
      document.getElementById("formPropietario").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Error al agregar el propietario.");
    });
});
