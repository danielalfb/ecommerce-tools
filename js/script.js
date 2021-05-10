let produtos = [];
let qtdEstoqueTotal;
let qtdEmDestaque = 0;
let qtdDisponivel = 0;
let valorTotalInvent;

render();

function fetchJson(url) {
  return fetch(url).then((ans) => {
    return ans.json();
  });
}

async function render() {
  const data = await fetchJson('./database/listaDeProdutos.json');
  produtos = data.produtos;
  totalEstoque();
  totalEmDestaque();
  totalDisponivel();
  totalInventario();
}

// Quantidade total de itens em estoque (somatória das quantidades de todos os produtos)
function totalEstoque() {
  let qtdEstoqueArr = [];
  for (let i = 0; i < produtos.length; i++) {
    qtdEstoqueArr.push(produtos[i].qtdEstoque);
  }
  qtdEstoqueTotal = qtdEstoqueArr.reduce((acc, crr) => acc + crr);
  console.log(`Quantidade total de itens em estoque: ${qtdEstoqueTotal}`);
}

// Quantidade total de itens em destaque (somatória das quantidades dos itens marcados como "emDestaque : sim")
function totalEmDestaque() {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].emDestaque === 'sim') {
      qtdEmDestaque++;
    }
  }
  console.log(`Quantidade total de itens em destaque: ${qtdEmDestaque}`);
}
// Quantidade total de itens disponíveis (similar ao anterior)
function totalDisponivel() {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].disponivel === 'sim') {
      qtdDisponivel++;
    }
  }
  console.log(`Quantidade total de itens disponíveis: ${qtdDisponivel}`);
}
// Valor total do inventário da empresa (somatória dos valores individuais multiplicado pela quantidade em estoque)
function totalInventario() {
  let valorIndiv = [];
  for (let i = 0; i < produtos.length; i++) {
    valorIndiv.push(produtos[i].qtdEstoque * produtos[i].preco);
  }
  valorTotalInvent = valorIndiv
    .reduce((acc, crr) => acc + crr)
    .toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    });
  console.log(`Valor total do inventário da empresa: ${valorTotalInvent}`);
}
// Somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele)

// Valor total do inventário por departamento (similar ao item anterior)

// Valor do ticket médio dos produtos da empresa (basicamente o valor total do inventário dividido pelo número de itens)

// Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)

// Departamento mais valioso (qual o departamento que tem a maior somatória dos valores dos itens)

// Produto mais caro da loja (bem como seu departamento)

// Produto mais barato da loja (bem como seu departamento)
