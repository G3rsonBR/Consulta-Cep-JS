const ceps = localStorage.getItem('ceps') ? JSON.parse(localStorage.getItem('ceps')) : [];

function consultCep() {
  const getCep = document.querySelector('#cep');
  const cep = validarCEP(getCep.value)
  
  if (!cep) {
    alert('Digite um CEP válido')
    return
  }

  const url = `https://viacep.com.br/ws/${getCep.value}/json/`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      const id = "id" + Math.random().toString(16).slice(2)

      const newCeps = {
        id: id,
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf
      };

      ceps.push(newCeps);

      localStorage.setItem('ceps', JSON.stringify(ceps))
      addCep(data);
      getCep.value = '';
    })
    .catch(error => console.log(error));
}


function addCep(info) {
  const divCepNow = document.querySelector('.listNow')
  divCepNow.innerHTML = '';

  const cep = info.cep;
  const logradouro = info.logradouro;
  const bairro = info.bairro;
  const localidade = info.localidade;
  const uf = info.uf;

  const h3 = document.createElement('h3');
  h3.innerHTML = 'Resultado da Pesquisa:';
  divCepNow.appendChild(h3);

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'listCep');
  ul.innerHTML = `<li><b>CEP:</b> ${cep}</li><li><b>Logradouro:</b> ${logradouro}</li><li><b>Bairro:</b> ${bairro}</li><li><b>Cidade:</b> ${localidade}</li><li><b>UF:</b> ${uf}</li>`;

  divCepNow.appendChild(ul);
}

function validarCEP(cep) {
  cep = cep.replace(/\s+|-/g, "");
  if (cep.length !== 8) {
    return false;
  }
  return cep.split("").every((char) => !isNaN(char));
}