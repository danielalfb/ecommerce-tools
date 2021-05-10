let produtos = [];
let formato = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
};

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
  totalDestaqueDisponivel();
  totalInventario();
  indivDepartamento(1);
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
// Quantidade total de itens disponíveis (similar ao anterior)

function totalDestaqueDisponivel() {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].emDestaque === 'sim') {
      qtdEmDestaque++;
    }
    if (produtos[i].disponivel === 'sim') {
      qtdDisponivel++;
    }
  }
  console.log(`Quantidade total de itens em destaque: ${qtdEmDestaque}`);
  console.log(`Quantidade total de itens disponíveis: ${qtdDisponivel}`);
}

// Valor total do inventário da empresa (somatória dos valores individuais multiplicado pela quantidade em estoque)
// Valor do ticket médio dos produtos da empresa (basicamente o valor total do inventário dividido pelo número de itens)

function totalInventario() {
  let valorIndiv = [];
  let ticketMedioGeral = 0;

  for (let i = 0; i < produtos.length; i++) {
    valorIndiv.push(produtos[i].qtdEstoque * produtos[i].preco);
  }
  valorTotalInvent = valorIndiv.reduce((acc, crr) => acc + crr);
  ticketMedioGeral = valorTotalInvent / produtos.length;
  console.log(
    `Valor total do inventário da empresa: ${valorTotalInvent.toLocaleString(
      'pt-BR',
      formato
    )}`
  );
  console.log(
    `Valor do ticket médio dos produtos da empresa: ${ticketMedioGeral.toLocaleString(
      'pt-BR',
      formato
    )}`
  );
}

// Somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele)
// Valor total do inventário por departamento (similar ao item anterior)

function indivDepartamento(dept) {
  let totalItensDepto = 0;
  let nomeDepto;
  let qtdInventarioDepto = [];

  for (let i = 0; i < produtos.length; i++) {
    if (dept === produtos[i].departamento.idDepto) {
      totalItensDepto++;
      nomeDepto = produtos[i].departamento.nomeDepto;
      qtdInventarioDepto.push(totalItensDepto * produtos[i].preco);
    }
  }

  valorTotalInvent = qtdInventarioDepto.reduce((acc, crr) => acc + crr);
  console.log(
    `Quantidade de itens no departamento "${nomeDepto}": ${totalItensDepto}`
  );
  console.log(
    `Valor total de inventário do departamento "${nomeDepto}": ${valorTotalInvent.toLocaleString(
      'pt-BR',
      formato
    )}`
  );
}

// Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)

// Departamento mais valioso (qual o departamento que tem a maior somatória dos valores dos itens)

// Produto mais caro da loja (bem como seu departamento)

// Produto mais barato da loja (bem como seu departamento)
