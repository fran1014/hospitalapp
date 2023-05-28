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
}