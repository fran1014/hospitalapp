const sectionPacientes = document.querySelector('#pacientes');

function pintarPacientes(pList, pDom) {
  pDom.innerHTML = "";
  pList.forEach(paciente => pintarUnPaciente(paciente, pDom));
}

function pintarUnPaciente(pPaciente, pDom) {
  const article = document.createElement('article');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');
  const div = document.createElement('div');
  div.classList.add('diagnostico');

  ul.innerHTML = `<li>Edad: ${pPaciente.edad}</li>
  <li>Seguridad Social: ${pPaciente.numeroSS}</li>`

  h2.textContent = `${pPaciente.nombre} ${pPaciente.apellido}`;

  div.textContent = `${pPaciente.diagnostico}`;
  article.append(h2, ul, div);
  pDom.appendChild(article);

}

pintarPacientes(pacientes, sectionPacientes)
