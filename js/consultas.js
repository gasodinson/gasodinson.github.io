const API_TOKEN = "WWwHg03JkIGjxAzIMppFEMr73zYDX2Up"; // Token de Baserow
const TABLE_ID_CONSULTAS = "580423"; // ID de la tabla "Consultas"
const API_URL_CONSULTAS = `https://api.baserow.io/api/database/rows/table/${TABLE_ID_CONSULTAS}/`;

// Reemplazá estos IDs por los field_ID reales de tu tabla "Consultas"
const FIELD_ID_CONSULTA = "field_4675355";         // IDConsulta (manual)
const FIELD_PACIENTE = "field_4675356";            // Link a Paciente (ID numérico del registro en Pacientes)
const FIELD_FECHA = "field_4675357";               // Fecha
const FIELD_MOTIVO = "field_4675358";              // MotivoConsulta
const FIELD_ANAMNESIS = "field_4675359";           // Anamnesis
const FIELD_ECOGRAFIA_RX = "field_4675360";        // EcografiaRX
const FIELD_TEMPERATURA = "field_4675361";         // Temperatura
const FIELD_GLUCEMIA = "field_4675362";            // Glucemia
const FIELD_DIAG_PRESUNTIVO = "field_4675363";     // DiagPresuntivo
const FIELD_TRATAMIENTO = "field_4675364";         // Tratamiento
const FIELD_NOTAS = "field_4675365";               // Notas

document.getElementById("formConsulta").addEventListener("submit", function (e) {
  e.preventDefault();

  const idConsulta = document.getElementById("idConsulta").value.trim();
  const paciente = document.getElementById("paciente").value.trim();
  const fecha = document.getElementById("fecha").value;
  const motivoConsulta = document.getElementById("motivoConsulta").value.trim();
  const anamnesis = document.getElementById("anamnesis").value.trim();
  const ecografiaRX = document.getElementById("ecografiaRX").value.trim();
  const temperatura = document.getElementById("temperatura").value;
  const glucemia = document.getElementById("glucemia").value;
  const diagPresuntivo = document.getElementById("diagPresuntivo").value.trim();
  const tratamiento = document.getElementById("tratamiento").value.trim();
  const notas = document.getElementById("notas").value.trim();

  fetch(API_URL_CONSULTAS, {
    method: "POST",
    headers: {
      "Authorization": `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [FIELD_ID_CONSULTA]: idConsulta,
      [FIELD_PACIENTE]: paciente,
      [FIELD_FECHA]: fecha,
      [FIELD_MOTIVO]: motivoConsulta,
      [FIELD_ANAMNESIS]: anamnesis,
      [FIELD_ECOGRAFIA_RX]: ecografiaRX,
      [FIELD_TEMPERATURA]: temperatura || null,
      [FIELD_GLUCEMIA]: glucemia || null,
      [FIELD_DIAG_PRESUNTIVO]: diagPresuntivo,
      [FIELD_TRATAMIENTO]: tratamiento,
      [FIELD_NOTAS]: notas,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("✅ Consulta agregada correctamente.");
      document.getElementById("formConsulta").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Error al agregar la consulta.");
    });
});
