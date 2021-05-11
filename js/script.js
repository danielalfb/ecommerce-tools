let products = [];
let deptList = [];
let format = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
};

let totalHighlighted = 0;
let totalAvailable = 0;
let total = 0;
let totalStock = 0;
let averageTicket = 0;

let result;

render();

function fetchJson(url) {
  return fetch(url).then((ans) => {
    return ans.json();
  });
}

async function render() {
  const data = await fetchJson('./database/listaDeProdutos.json');
  products = data;
  totalStoreStock();
  highlightedAndAvailable();
  totalInventory();
  Departament(4);
}

// Quantidade total de itens em estoque (somatória das quantidades de todos os produtos)

function totalStoreStock() {
  for (let product of products) {
    totalStock += Number(product.qtdEstoque);
  }
  console.log(`Quantidade total de itens em estoque: ${totalStock}`);
}

// Quantidade total de itens em destaque (somatória das quantidades dos itens marcados como "emDestaque : sim")
// Quantidade total de itens disponíveis (similar ao anterior)

function highlightedAndAvailable() {
  for (let product of products) {
    if (product.emDestaque === 'sim') {
      totalHighlighted++;
    }
    if (product.disponivel === 'sim') {
      totalAvailable++;
    }
  }
  console.log(`Quantidade total de itens em destaque: ${totalHighlighted}`);
  console.log(`Quantidade total de itens disponíveis: ${totalAvailable}`);
}

// Valor total do inventário da empresa (somatória dos valores individuais multiplicado pela quantidade em estoque)
// Valor do ticket médio dos produtos da empresa (basicamente o valor total do inventário dividido pelo número de itens)

function totalInventory() {
  for (let product of products) {
    total += product.qtdEstoque * product.preco;
  }
  averageTicket = total / totalStock; //  total / products.length

  console.log(
    `Valor total do inventário da empresa: ${total.toLocaleString(
      'pt-BR',
      format
    )}`
  );
  console.log(
    `Valor do ticket médio dos produtos da empresa: ${averageTicket.toLocaleString(
      'pt-BR',
      format
    )}`
  );
}

// Somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele)
// Valor total do inventário por departamento (similar ao item anterior)
class Dept {
  constructor(name, totalItems, totalInvent) {
    this.name = name;
    this.totalItems = totalItems;
    this.totalInvent = totalInvent.toLocaleString('pt-br', format);
  }
}

function Departament(dept) {
  let deptName;
  let totalDeptItems = 0;
  let totalDeptInvent = 0;

  for (let product of products) {
    if (dept === product.departamento.idDepto) {
      totalDeptItems++;
      deptName = product.departamento.nomeDepto;
      totalDeptInvent += totalDeptItems * product.preco;
    }
  }
  result = new Dept(deptName, totalDeptItems, totalDeptInvent);
  console.log(result);
}

// Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)
function allDepartaments() {
  for (let product of products) {
  }
}

// Departamento mais valioso (qual o departamento que tem a maior somatória dos valores dos itens)

// Produto mais caro da loja (bem como seu departamento)

// Produto mais barato da loja (bem como seu departamento)
