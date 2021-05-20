# Quantos produtos estão em destaque atualmente?
select sum(qtdEstoque) as totalestoque from Produtos;

# Listar todos os pedidos não finalizados, contemplando data de realização, atual status e os principais dados de contato do cliente responsável (nome, cpf e email).
select pedidos.id, clientes.nome, clientes.email, pedidos.data, status_pedido.nome from pedidos
inner join status_pedido on pedidos.statusid = status_pedido.id
inner join clientes on pedidos.clienteid = clientes.id
where pedidos.statusid != 8;

# Mostrar todos os pedidos do cliente 'Lidiane', o item da compra e o valor total
select clientes.nome, produtos.descricao, pedidos_produtos.valortotal from pedidos
inner join clientes on pedidos.clienteid = clientes.id
inner join pedidos_produtos on pedidos.id = pedidos_produtos.pedidoid
inner join produtos on pedidos_produtos.produtoid = produtos.id
where clienteid = 2;

# Listar todos os produtos vendidos, mostrando seu nome, departamento e preço individual, listar quantas vezes eles foram vendidos e o valor total de vendas de cada produto
select departamentos.nome as departamento, produtos.descricao as produto, produtos.preco, count(pedidos_produtos.produtoid) as qtdvendas, sum(produtos.preco) as totalvendas from pedidos_produtos
inner join produtos on pedidos_produtos.produtoid = produtos.id
inner join departamentos on produtos.deptid = departamentos.id
group by produtos.id;

# Listar por nome todos os clientes que fizeram pedidos, mostrar seu endereço e o valor total do pedido
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







