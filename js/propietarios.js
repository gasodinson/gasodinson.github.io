const API_TOKEN = 'WWwHg03JkIGjxAzIMppFEMr73zYDX2Up';
const TABLE_ID = 580424;
const FIELD_ID_DNI = 4675567;
const FIELD_ID_NOMBRE = 4675568;
const FIELD_ID_DOMICILIO = 4675569;
const FIELD_ID_TELEFONO = 4675570;
const FIELD_ID_EMAIL = 4675571;
const API_URL = `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/`;

document.getElementById('propietarioForm').addEventListener('submit', guardarPropietario);

async function buscarPropietario() {
  const dniBuscar = document.getElementById('buscarDNI').value;

  try {
    const respuesta = await fetch(`${API_URL}?filter__field_${FIELD_ID_DNI}__equal=${dniBuscar}`, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });

    const data = await respuesta.json();
    const row = data?.results?.[0];

    if (row) {
      document.getElementById('dni').value = row[`field_${FIELD_ID_DNI}`] || '';
      document.getElementById('nombre').value = row[`field_${FIELD_ID_NOMBRE}`] || '';
      document.getElementById('domicilio').value = row[`field_${FIELD_ID_DOMICILIO}`] || '';
      document.getElementById('telefono').value = row[`field_${FIELD_ID_TELEFONO}`] || '';
      document.getElementById('email').value = row[`field_${FIELD_ID_EMAIL}`] || '';
      document.getElementById('dni').readOnly = true;
      document.getElementById('propietarioForm').setAttribute('data-row-id', row.id);
    } else {
      alert('No se encontró un propietario con ese DNI.');
      document.getElementById('propietarioForm').removeAttribute('data-row-id');
      limpiarFormulario();
      document.getElementById('dni').value = dniBuscar;
      document.getElementById('dni').readOnly = false;
    }
  } catch (error) {
    console.error('Error al buscar el propietario:', error);
  }
}

async function guardarPropietario(evento) {
  evento.preventDefault();
  const rowId = document.getElementById('propietarioForm').getAttribute('data-row-id');

  const datos = {
    [`field_${FIELD_ID_DNI}`]: document.getElementById('dni').value,
    [`field_${FIELD_ID_NOMBRE}`]: document.getElementById('nombre').value,
    [`field_${FIELD_ID_DOMICILIO}`]: document.getElementById('domicilio').value,
    [`field_${FIELD_ID_TELEFONO}`]: document.getElementById('telefono').value,
    [`field_${FIELD_ID_EMAIL}`]: document.getElementById('email').value
  };

  try {
    const respuesta = await fetch(rowId ? `${API_URL}${rowId}/` : API_URL, {
      method: rowId ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${API_TOKEN}`
      },
      body: JSON.stringify(datos)
    });

    if (respuesta.ok) {
      alert(rowId ? 'Propietario actualizado correctamente' : 'Propietario agregado correctamente');
      document.getElementById('propietarioForm').removeAttribute('data-row-id');
      limpiarFormulario();
      document.getElementById('dni').readOnly = false;
    } else {
      alert('Hubo un error al guardar los datos.');
    }
  } catch (error) {
    console.error('Error al guardar el propietario:', error);
  }
}

function limpiarFormulario() {
  document.getElementById('dni').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('domicilio').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('email').value = '';
}