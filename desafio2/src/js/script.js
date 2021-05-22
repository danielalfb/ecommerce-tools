let products = [];
let format = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
};
let total = 0;
let totalStock = 0;
let averageTicket = 0;

function fetchJson(url) {
  return fetch(url).then((ans) => {
    return ans.json();
  });
}

function showHTML(id, message, result) {
  let idName = document.getElementById(id);
  let p = document.createElement('p');
  p.innerHTML = `${message} <strong>${result}</strong>`;
  idName.appendChild(p)
}

function showTotalStoreStock() {
  for (product of products) {
    totalStock += Number(product.qtdEstoque);
  }
  console.log(`Quantidade total de itens em estoque: ${totalStock}`);

  showHTML('total-items', 'Quantidade total de itens em estoque:', totalStock);
}

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

  showHTML('total-items-highlight', 'Quantidade total de itens em destaque:', totalHighlighted);
  showHTML('total-items-available', 'Quantidade total de itens disponíveis:', totalAvailable);
}

function showTotalInventory() {
  for (product of products) {
    total += product.qtdEstoque * product.preco;
  }
  averageTicket = total / totalStock;

  let result = total.toLocaleString('pt-BR', format);
  let resultAverage = averageTicket.toLocaleString('pt-BR', format);

  console.log(`Valor total do inventário da empresa: ${result}`);
  console.log(
    `Valor do ticket médio dos produtos da empresa: ${resultAverage}`
  );

  showHTML('total-inventory', 'Valor total do inventário da empresa:', result);
  showHTML('total-ticketm-geral', 'Valor do ticket médio dos produtos da empresa:', resultAverage);
}

class Departament {
  constructor(name, totalItems, totalInvent) {
    this.name = name;
    this.totalItems = totalItems;
    this.totalInvent = totalInvent.toLocaleString('pt-br', format);
  }
}

function showDepartamentValue(dept) {
  let deptName = '';
  let totalDeptItemsNum = 0;
  let totalDeptInvent = 0;
  let averageTicketDept = 0;

  const departaments = products.filter((product) => product.idDepto === dept);

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
  console.log(new Departament(deptName, totalDeptItemsNum, totalDeptInvent)); // Somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele) e valor total do inventário por departamento (similar ao item anterior)
  console.log(averageTicketDept); // Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)

  showHTML('dept-info', 'Informações sobre o departamento:', deptName);
  let result = totalDeptInvent.toLocaleString('pt-br', format);
  let deptDiv = document.getElementById('dept-info');
  let p = document.createElement('p');
  p.innerHTML = `<ol id="dept-info-list"><li>Total de itens: ${totalDeptItemsNum}</li> 
  <li>Valor total do inventário: ${result}</li> 
  <li>Valor do ticket médio: ${averageTicketDept[1].averageTicket}</li></ol>
  <h5>(Para selecionar outro departamento, passe o id do mesmo na função).</h5>
  `;
  deptDiv.appendChild(p);
}

function showMostValuableDept() {
  const deptList = new Map(); //método apresentado pelo Welisson (https://www.javascripttutorial.net/es6/javascript-map/)
  for (product of products) {
    deptList.set(
      product.nomeDepto,
      products
        .filter((item) => item.nomeDepto === product.nomeDepto)
        .reduce((acc, cur) => acc + cur.preco * cur.qtdEstoque, 0)
    );
  }

  let mostValuable = Math.max(...deptList.values());

  for (var [key, value] of deptList.entries()) {
    if (mostValuable === value) {
      console.log(` O departamento mais valioso é o "${key}".`);
      showHTML('dept-most-valuable','Departamento mais valioso:', key);
    }
  }
}

class Product {
  constructor(name, departament, price) {
    this.name = name;
    this.departament = departament;
    this.price = price.toLocaleString('pt-br', format);
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
    let item = new Product(product.descricao, product.nomeDepto, product.preco);
    if (leastValuable === product.preco) {
      console.log('Produto mais barato da loja:');
      console.log(item);
      showHTML('product-least-valuable','Produto mais barato da loja:', item.name);
    }
    if (mostValuable === product.preco) {
      console.log('Produto mais caro da loja:');
      console.log(item);
      showHTML('product-most-valuable','Produto mais caro da loja:', item.name);
    }
  }
}

async function render() {
  const data = await fetchJson('./src/database/Products.json');
  products = data;

  showTotalStoreStock();
  showHighlightedAndAvailable();
  showTotalInventory();
  showDepartamentValue(5);
  showMostValuableDept();
  showMostAndLeastValuableProduct();
}

render();
