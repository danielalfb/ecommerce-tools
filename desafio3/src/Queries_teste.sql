# Arquivo SQL contendo pelo menos 5 consultas contemplando cada condição

-- Consulta contemplando contagem ou totalização:
# Situação: Quantidade total de itens em estoque.
select sum(qtdEstoque) as totalestoque from Produtos;
# Situação: Quantidade total de itens em destaque
select COUNT(destaque) as produtosdestaque from Produtos
where destaque = 1;

-- Consulta contemplando a junção entre 2 tabelas:
# Situação: Listar todos os pedidos não finalizados, contemplando id do cliente responsável pelo pedido, data de realização e atual status.
select pedidos.id, pedidos.clienteid, pedidos.data, status_pedido.nome as statusdopedido from pedidos
inner join status_pedido on pedidos.statusid = status_pedido.id
where pedidos.statusid != 8;

-- Consulta contemplando a junção entre 3 tabelas:
# Situação: Mostrar todos os pedidos da cliente 'Lidiane', o item da compra e o valor total.
select produtos.descricao, pedidos_produtos.valortotal from pedidos
inner join pedidos_produtos on pedidos.id = pedidos_produtos.pedidoid
inner join produtos on pedidos_produtos.produtoid = produtos.id
where clienteid = 2;

-- Consulta contemplando a junção entre 2 tabelas + uma operação de totalização e agrupamento:
# Situação: Listar todos os produtos vendidos, mostrando seu nome e preço individual, listar quantas vezes eles foram vendidos e o valor total de vendas de cada produto.
select produtos.descricao as produto, produtos.preco, count(pedidos_produtos.produtoid) as qtdvendas, sum(produtos.preco) as totalvendas from pedidos_produtos
inner join produtos on pedidos_produtos.produtoid = produtos.id
group by produtos.id;

-- Consulta contemplando a junção entre 3 ou mais tabelas + uma operação de totalização e agrupamento:
# Situação: Listar por nome todos os clientes que fizeram pedidos, mostrar seu endereço e o valor total do pedido.
select clientes.nome, tipo_enderecos.nome as tipoendereco, enderecos.tipologradouro, 
enderecos.logradouro, enderecos.numero, enderecos.complemento,enderecos.bairro, enderecos.cep, cidades.cidade, 
sum(pedidos_produtos.valortotal) as valortotalpedido from cliente_enderecos
inner join clientes on clientes.id = cliente_enderecos.clienteid
inner join enderecos on enderecos.id = cliente_enderecos.enderecoid
inner join tipo_enderecos on tipo_enderecos.id = enderecos.tipoenderecoid
inner join cidades on cidades.id = enderecos.cidadeid
inner join pedidos on cliente_enderecos.clienteid = pedidos.clienteid
inner join pedidos_produtos on pedidos.id = pedidos_produtos.pedidoid
inner join produtos on pedidos_produtos.produtoid = produtos.id
group by pedidos.id







