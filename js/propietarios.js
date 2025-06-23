const API_TOKEN = "WWwHg03JkIGjxAzIMppFEMr73zYDX2Up";
const TABLE_ID_PROPIETARIOS = "580424";
const API_URL_PROPIETARIOS = `https://api.baserow.io/api/database/rows/table/${TABLE_ID_PROPIETARIOS}/`;

const FIELD_ID_PROPIETARIO = "IDPropietario";
const FIELD_NOMBRE = "Nombre";
const FIELD_DOMICILIO = "Domicilio";
const FIELD_TELEFONO = "Telefono";
const FIELD_EMAIL = "Email";

const TABLE_ID_PACIENTES = "580419";
const API_URL_PACIENTES = `https://api.baserow.io/api/database/rows/table/${TABLE_ID_PACIENTES}/`;
const FIELD_PROPIETARIO_PACIENTE = "field_4675583"; // ID del campo "Propietario" en la tabla Pacientes
const FIELD_NOMBRE_PACIENTE = "Nombre";
const FIELD_IDPACIENTE = "IDPaciente";

let rowIdPropietarioEncontrado = null;

document.getElementById("formBuscarPropietario").addEventListener("submit", function (e) {
  e.preventDefault();
  const dni = document.getElementById("buscarIDPropietario").value.trim();
  if (!dni) return;

  const url = `${API_URL_PROPIETARIOS}?user_field_names=true&filter__${FIELD_ID_PROPIETARIO}__equal=${dni}`;

  fetch(url, {
    headers: { "Authorization": `Token ${API_TOKEN}` },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.count === 0) {
        alert("No se encontró ningún propietario con ese DNI.");
        rowIdPropietarioEncontrado = null;
        document.getElementById("formPropietario").reset();
        document.getElementById("IDPropietario").value = dni;
        document.getElementById("mascotasPropietario").innerHTML = "";
        document.getElementById("btnAgregarMascota").style.display = "none";
      } else {
        const propietario = data.results[0];
        rowIdPropietarioEncontrado = propietario.id;
        document.getElementById("IDPropietario").value = propietario[FIELD_ID_PROPIETARIO] || "";
        document.getElementById("Nombre").value = propietario[FIELD_NOMBRE] || "";
        document.getElementById("Domicilio").value = propietario[FIELD_DOMICILIO] || "";
        document.getElementById("Telefono").value = propietario[FIELD_TELEFONO] || "";
        document.getElementById("Email").value = propietario[FIELD_EMAIL] || "";

        mostrarMascotasDelPropietario(rowIdPropietarioEncontrado);
      }
    })
    .catch((error) => {
      console.error("Error al buscar propietario:", error);
      alert("❌ Error al buscar propietario.");
    });
});

document.getElementById("formPropietario").addEventListener("submit", function (e) {
  e.preventDefault();

  const IDPropietario = document.getElementById("IDPropietario").value.trim();
  const Nombre = document.getElementById("Nombre").value.trim();
  const Domicilio = document.getElementById("Domicilio").value.trim();
  const Telefono = document.getElementById("Telefono").value.trim();
  const Email = document.getElementById("Email").value.trim();

  const payload = JSON.stringify({
    [FIELD_ID_PROPIETARIO]: IDPropietario,
    [FIELD_NOMBRE]: Nombre,
    [FIELD_DOMICILIO]: Domicilio,
    [FIELD_TELEFONO]: Telefono,
    [FIELD_EMAIL]: Email,
  });

  let url = API_URL_PROPIETARIOS;
  let method = "POST";

  if (rowIdPropietarioEncontrado) {
    url += `${rowIdPropietarioEncontrado}/`;
    method = "PATCH";
  }

  fetch(url, {
    method: method,
    headers: {
      "Authorization": `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("✅ Propietario guardado/modificado correctamente.");
      rowIdPropietarioEncontrado = data.id;
      mostrarMascotasDelPropietario(rowIdPropietarioEncontrado);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Error al guardar/modificar el propietario.");
    });
});

function mostrarMascotasDelPropietario(propietarioRowID) {
  const contenedor = document.getElementById("mascotasPropietario");
  contenedor.innerHTML = "<p>Buscando mascotas...</p>";

  const url = `${API_URL_PACIENTES}?user_field_names=true&filter__${FIELD_PROPIETARIO_PACIENTE}__contains=${propietarioRowID}`;


  fetch(url, {
    headers: { "Authorization": `Token ${API_TOKEN}` },
  })
    .then((response) => response.json())
    .then((data) => {
      contenedor.innerHTML = "";

      if (!data.results || data.results.length === 0) {
        contenedor.innerHTML = "<p>Este propietario aún no tiene mascotas registradas.</p>";
      } else {
        data.results.forEach((paciente) => {
          const btn = document.createElement("button");
          btn.className = "button";
          btn.textContent = `${paciente[FIELD_NOMBRE_PACIENTE]} (${paciente[FIELD_IDPACIENTE]})`;
          btn.onclick = () => {
            window.location.href = `pacientes.html?IDPaciente=${paciente.id}`;
          };
          contenedor.appendChild(btn);
        });
      }

      const btnAgregar = document.getElementById("btnAgregarMascota");
      btnAgregar.style.display = "inline-block";
      btnAgregar.onclick = () => {
        window.location.href = `pacientes.html?nuevo=${document.getElementById("IDPropietario").value.trim()}`;
      };

    })
    .catch((error) => {
      console.error("Error al buscar mascotas:", error);
      contenedor.innerHTML = "<p style='color:red;'>❌ Error al buscar mascotas.</p>";
    });
}
