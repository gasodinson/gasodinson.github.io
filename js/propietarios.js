const API_TOKEN = 'WWwHg03JkIGjxAzIMppFEMr73zYDX2Up';
const BASE_ID = '243621';
const TABLE_ID = '580424';
const API_URL = `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/`;

document.getElementById('propietarioForm').addEventListener('submit', guardarPropietario);

async function buscarPropietario() {
  const dniBuscar = document.getElementById('buscarDNI').value;

  try {
    const respuesta = await fetch(`${API_URL}?user_field_names=true&filter__IDPropietarios__equal=${dniBuscar}`, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });

    const data = await respuesta.json();
    const row = data?.results?.[0];

    if (row) {
      document.getElementById('dni').value = row.IDPropietarios;
      document.getElementById('nombre').value = row.Nombre || '';
      document.getElementById('domicilio').value = row.Domicilio || '';
      document.getElementById('telefono').value = row.Telefono || '';
      document.getElementById('email').value = row.Email || '';
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
    IDPropietarios: document.getElementById('dni').value,
    Nombre: document.getElementById('nombre').value,
    Domicilio: document.getElementById('domicilio').value,
    Telefono: document.getElementById('telefono').value,
    Email: document.getElementById('email').value
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