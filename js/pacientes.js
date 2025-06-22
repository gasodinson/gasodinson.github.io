const API_TOKEN = "WWwHg03JkIGjxAzIMppFEMr73zYDX2Up"; // Tu token de Baserow
const TABLE_ID_PACIENTES = "580419"; // ID de la tabla "Pacientes"
const API_URL_PACIENTES = `https://api.baserow.io/api/database/rows/table/${TABLE_ID_PACIENTES}/`;

// Reemplazá estos IDs por los field_ID reales de tu tabla "Pacientes"
const FIELD_ID_PACIENTE = "field_4675524";      // IDPaciente
const FIELD_NOMBRE_PACIENTE = "field_4675525";  // Nombre del paciente
const FIELD_PROPIETARIO = "field_4675526";      // Relación con Propietario (link)
const FIELD_EDAD = "field_4675527";              // Edad
const FIELD_ESPECIE = "field_4675528";           // Especie

document.getElementById("formPaciente").addEventListener("submit", function (e) {
  e.preventDefault();

  const idPaciente = document.getElementById("idPaciente").value.trim();
  const nombrePaciente = document.getElementById("nombrePaciente").value.trim();
  const propietario = document.getElementById("propietario").value.trim();
  const edad = document.getElementById("edad").value;
  const especie = document.getElementById("especie").value;

  fetch(API_URL_PACIENTES, {
    method: "POST",
    headers: {
      "Authorization": `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [FIELD_ID_PACIENTE]: idPaciente,
      [FIELD_NOMBRE_PACIENTE]: nombrePaciente,
      [FIELD_PROPIETARIO]: propietario, // ⚠ Debe ser el ID numérico del registro del propietario
      [FIELD_EDAD]: edad,
      [FIELD_ESPECIE]: especie,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("✅ Paciente agregado correctamente.");
      document.getElementById("formPaciente").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Error al agregar el paciente.");
    });
});
