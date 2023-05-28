const sectionPacientes = document.querySelector('#pacientes');

function pintarPacientes(pList, pDom) {
  if (pList.length !== 0) {
    pDom.innerHTML = "";
    pList.forEach(paciente => pintarUnPaciente(paciente, pDom));
  } else {
    pDom.innerHTML = '<h2>No hay resultados</h2>';
  }
}

/*
        <article>
            <h2>Nombre y apellidos</h2>
            <ul>
                <li>Edad: 46</li>
                <li>Seguridad Social: A123456</li>
            </ul>
            <div class="diagnostico">
                GRIPE
            </div>
        </article>
*/

function pintarUnPaciente(pPaciente, pDom) {
  const article = document.createElement('article');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');
  const div = document.createElement('div');
  div.classList.add('diagnostico');
  //div.className = 'diagnostico';

  ul.innerHTML = `<li>Edad: ${pPaciente.edad}</li>
                    <li>Seguridad Social: ${pPaciente.numeroSS}</li>`;
  h2.textContent = `${pPaciente.nombre} ${pPaciente.apellido}`

  div.textContent = `${pPaciente.diagnostico}`;
  article.append(h2, ul, div);
  pDom.appendChild(article);

}

pintarPacientes(pacientes, sectionPacientes);

/* filtro por edad */

const filterForm = document.querySelector('#filterForm');
filterForm.addEventListener('submit', getDataForm);

function getDataForm(event) {
  event.preventDefault(); //sin esto se recargaria la pagina o me llevaria a otro pagina lo que eliminaria cualquier accion.
  let edadmin = parseInt(event.target.edadmin.value);
  let edadmax = parseInt(event.target.edadmax.value);

  if (edadmax >= edadmin) {
    let listaFiltrada = filtrarPorEdad(pacientes, edadmin, edadmax);
    pintarPacientes(listaFiltrada, sectionPacientes);
  } else {
    alert('La edad minima no puede ser mayor que la máxima');
  }
  filterForm.reset();
}

function filtrarPorEdad(pList, pEdadMin, pEdadMax) {
  return pList.filter(paciente => paciente.edad >= pEdadMin && paciente.edad <= pEdadMax);
}

const select = document.querySelector('#selectDiagnostico');
select.addEventListener('change', getDiagnosis);

function getDiagnosis(event) {
  let diagnostico = event.target.value;
  let listaFiltrada = filtrarPorDiagnostico(pacientes, diagnostico);

  pintarPacientes(listaFiltrada, sectionPacientes);

}

function filtrarPorDiagnostico(pList, pDiagnostico) {
  return pList.filter(paciente => paciente.diagnostico.includes(pDiagnostico));
}

function pintarDiagnosticos(pList, pDom) {
  pList.forEach(enfermedad => pintarUnaEnfermedad(enfermedad, pDom));
}

function pintarUnaEnfermedad(pEnfermedad, pDom) {
  const option = document.createElement('option');
  option.value = pEnfermedad;
  option.textContent = pEnfermedad.toUpperCase();
  pDom.appendChild(option);

}


function filtrarEnfermedadesSinRepeticion(pList) {
  const lista = pList.map(paciente => paciente.diagnostico);

  const conjunto = new Set(lista);
  return Array.from(conjunto);

}

const listaEnfermedades = filtrarEnfermedadesSinRepeticion(pacientes);

pintarDiagnosticos(listaEnfermedades, select);

const buscador = document.querySelector('#buscador');
buscador.addEventListener('input', getSearch);

function getSearch(event) {
  let busqueda = event.target.value;
  let listaFiltrada = filtrarPorTexto(pacientes, busqueda);
  pintarPacientes(listaFiltrada, sectionPacientes);
}

function filtrarPorTexto(pList, pBusqueda) {
  return pList.filter(paciente => paciente.nombre.toLowerCase().includes(pBusqueda.toLowerCase()) || paciente.apellido.toLowerCase().includes(pBusqueda.toLowerCase()) || paciente.numeroSS.toLowerCase().includes(pBusqueda.toLowerCase()))
}

