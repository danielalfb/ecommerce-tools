let products = [];
let format = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
};
let total = 0;
let totalStock = 0;
let averageTicket = 0;

render();

function fetchJson(url) {
  return fetch(url).then((ans) => {
    return ans.json();
  });
}

async function render() {
  const data = await fetchJson('./database/Products.json');
  products = data;

  showTotalStoreStock();
  showHighlightedAndAvailable();
  showTotalInventory();
  showDepartamentValue(1);
  showMostValuableDept();
  showMostAndLeastValuableProduct();
}

// Quantidade total de itens em estoque (somatória das quantidades de todos os produtos)

function showTotalStoreStock() {
  for (product of products) {
    totalStock += Number(product.qtdEstoque);
  }
  console.log(`Quantidade total de itens em estoque: ${totalStock}`);
}

// Quantidade total de itens em destaque (somatória das quantidades dos itens marcados como "emDestaque : sim")
// Quantidade total de itens disponíveis (similar ao anterior)

function showHighlightedAndAvailable() {
  let totalHighlighted = 0;
  let totalAvailable = 0;
  for (product of products) {
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

function showTotalInventory() {
  for (product of products) {
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
// Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)

class Departament {
  constructor(name, totalItems, totalInvent, averageTicket) {
    this.name = name;
    this.totalItems = totalItems;
    this.totalInvent = totalInvent.toLocaleString('pt-br', format);
  }
}

function showDepartamentValue(dept) {
  let deptName = '';
  let result = '';
  let totalDeptItemsNum = 0;
  let totalDeptInvent = 0;
  let averageTicketDept = 0;

  const departaments = products.filter((product) => product.idDepto == dept);

  for (let departament of departaments) {
    totalDeptItemsNum++;
    deptName = departament.nomeDepto;
    totalDeptInvent += totalDeptItemsNum * departament.preco;
    averageTicketDept = [
      { name: departament.nomeDepto },
      {
        averageTicket: (totalDeptInvent / totalDeptItemsNum).toLocaleString(
          'pt-br',
          format
        ),
      },
    ];
  }
  result = new Departament(deptName, totalDeptItemsNum, totalDeptInvent);
  console.log(result);
  console.log(averageTicketDept);
}

// Departamento mais valioso (qual o departamento que tem a maior somatória dos valores dos itens)
function showMostValuableDept() {
  const deptList = new Map(); //método apresentado pelo Welisson (https://www.javascripttutorial.net/es6/javascript-map/)
  for (product of products) {
    deptList.set(
      product.nomeDepto,
      products
        .filter((item) => item.nomeDepto === product.nomeDepto)
        .reduce((acc, cur) => acc + cur.preco, 0)
    );
  }
  let mostValuable = Math.max(...deptList.values());
  for (let item of deptList.values()) {
    if (item === mostValuable) {
      console.log(` O departamento mais valioso é o "${product.nomeDepto}"`);
    }
  }
}

class Product {
  constructor(name, departament) {
    this.name = name;
    this.departament = departament;
  }
}
function showMostAndLeastValuableProduct() {
  let productsPrice = [];
  for (product of products) {
    productsPrice.push(product.preco);
  }
  let mostValuable = Math.max(...productsPrice);
  let leastValuable = Math.min(...productsPrice);

  for (product of products) {
    let item = new Product(product.descricao, product.nomeDepto);
    // Produto mais caro da loja (bem como seu departamento)
    if (mostValuable === product.preco) {
      console.log(item);
    }
    // Produto mais barato da loja (bem como seu departamento)
    if (leastValuable === product.preco) {
      console.log(item);
    }
  }
}
