// COMPLETAR CON TU INFO REAL
const BASE_URL_PROPIETARIOS = 'https://api.baserow.io/api/database/rows/table_ID_PROPIETARIOS/';
const BASE_URL_PACIENTES = 'https://api.baserow.io/api/database/rows/table_ID_PACIENTES/';
const TOKEN = 'Token TU_TOKEN';

document.getElementById('formularioPropietario').addEventListener('submit', async (e) => {
  e.preventDefault();
  await guardarPropietario();
});

async function buscarPropietario() {
  const dniBuscado = document.getElementById('dniBusqueda').value;

  const response = await fetch(`${BASE_URL_PROPIETARIOS}?user_field_names=true`, {
    headers: {
      Authorization: `Token ${TOKEN}`
    }
  });

  const data = await response.json();
  const propietario = data.results.find(p => p.DNI === dniBuscado);

  if (propietario) {
    document.getElementById('dni').value = propietario.DNI;
    document.getElementById('nombre').value = propietario.Nombre;
    document.getElementById('telefono').value = propietario.Telefono;
    document.getElementById('email').value = propietario.Email;
    document.getElementById('formularioPropietario').dataset.id = propietario.id;

    mostrarMascotas(propietario.id);
  } else {
    alert('Propietario no encontrado. Podés cargarlo como nuevo.');
    document.getElementById('formularioPropietario').reset();
    document.getElementById('dni').value = dniBuscado;
    document.getElementById('formularioPropietario').dataset.id = '';
    document.getElementById('mascotasDelPropietario').innerHTML = '';
  }
}

async function guardarPropietario() {
  const dni = document.getElementById('dni').value;
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const idExistente = document.getElementById('formularioPropietario').dataset.id;

  const datos = {
    DNI: dni,
    Nombre: nombre,
    Telefono: telefono,
    Email: email
  };

  const url = idExistente
    ? `${BASE_URL_PROPIETARIOS}${idExistente}/`
    : BASE_URL_PROPIETARIOS;

  const metodo = idExistente ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${TOKEN}`
    },
    body: JSON.stringify(datos)
  });

  if (response.ok) {
    alert('Propietario guardado correctamente.');
    document.getElementById('formularioPropietario').reset();
    document.getElementById('formularioPropietario').dataset.id = '';
    document.getElementById('mascotasDelPropietario').innerHTML = '';
  } else {
    alert('Error al guardar el propietario.');
  }
}

async function mostrarMascotas(idPropietario) {
  const response = await fetch(`${BASE_URL_PACIENTES}?user_field_names=true`, {
    headers: {
      Authorization: `Token ${TOKEN}`
    }
  });

  const data = await response.json();
  const mascotas = data.results.filter(p => p.Propietario?.includes(idPropietario));

  const contenedor = document.getElementById('mascotasDelPropietario');
  contenedor.innerHTML = mascotas.length
    ? mascotas.map(m => `🐾 ${m.Nombre} - ${m.Especie || 'Sin especie'}`).join('<br>')
    : 'Este propietario no tiene mascotas registradas.';
}