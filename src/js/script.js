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
  showDepartamentValue(5);
  showMostValuableDept();
  showMostAndLeastValuableProduct();
}

function showTotalStoreStock() {
  for (product of products) {
    totalStock += Number(product.qtdEstoque);
  }
  console.log(`Quantidade total de itens em estoque: ${totalStock}`);

  let totalStockShow = document.getElementById('total-items');
  let p = document.createElement('p');
  p.innerHTML = `Quantidade total de itens em estoque: <strong>${totalStock}</strong>
  `;
  totalStockShow.appendChild(p);
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

  let highlighted = document.getElementById('total-items-highlight');
  let p = document.createElement('p');
  p.innerHTML = `Quantidade total de itens em destaque: <strong>${totalHighlighted}</strong>
  `;
  highlighted.appendChild(p);

  let available = document.getElementById('total-items-available');
  let p2 = document.createElement('p');
  p2.innerHTML = `Quantidade total de itens disponíveis: <strong>${totalAvailable}</strong>
  `;
  available.appendChild(p2);
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

  let totalInvent = document.getElementById('total-inventory');
  let p = document.createElement('p');
  p.innerHTML = `Valor total do inventário da empresa: <strong>${result}</strong>
  `;
  totalInvent.appendChild(p);
  let totalTicket = document.getElementById('total-ticketm-geral');
  let p2 = document.createElement('p');
  p2.innerHTML = `Valor total do inventário da empresa: <strong>${resultAverage}</strong>
  `;
  totalTicket.appendChild(p2);
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
  console.log(new Departament(deptName, totalDeptItemsNum, totalDeptInvent)); // Somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele) e valor total do inventário por departamento (similar ao item anterior)
  console.log(averageTicketDept); // Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)

  let result = totalDeptInvent.toLocaleString('pt-br', format);
  let deptDiv = document.getElementById('dept-info');
  let p = document.createElement('p');
  p.innerHTML = `Informações sobre o departamento: <strong>${deptName}</strong>`;
  deptDiv.appendChild(p);

  let p2 = document.createElement('p');
  p2.innerHTML = `<ol id="dept-info-list"><li>Total de itens: ${totalDeptItemsNum}</li> 
  <li>Valor total do inventário: ${result}</li> 
  <li>Valor do ticket médio: ${averageTicketDept[1].averageTicket}</li></ol>
  <h5>(Para selecionar outro departamento, passe o id do mesmo na função).</h5>
  `;
  deptDiv.appendChild(p2);
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

      let deptDiv = document.getElementById('dept-most-valuable');
      let p = document.createElement('p');
      p.innerHTML = `Departamento mais valioso: <strong>${key}</strong>`;
      deptDiv.appendChild(p);
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

      let deptDiv = document.getElementById('product-most-valuable');
      let p = document.createElement('p');
      p.innerHTML = `Produto mais barato da loja: <strong>${item.name}</strong>,
      localizado em "<strong>${item.departament}</strong>"`;
      deptDiv.appendChild(p);
    }
    if (mostValuable === product.preco) {
      console.log('Produto mais caro da loja:');
      console.log(item);

      let deptDiv = document.getElementById('product-least-valuable');
      let p = document.createElement('p');
      p.innerHTML = `Produto mais caro da loja: <strong>${item.name}</strong>,
      localizado em "<strong>${item.departament}</strong>"`;
      deptDiv.appendChild(p);
    }
  }
}
