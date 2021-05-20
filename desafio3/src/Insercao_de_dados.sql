# Arquivo SQL com os scripts de inserção de dados, respeitando as restrições de chaves estrangeiras

# Departamentos 
INSERT INTO departamentos (nome)
VALUES ('Adaptadores'), ('Ferramentas'), ('Eletronicos'), ('Casa');

# Produtos
INSERT INTO produtos (descricao, preco, qtdEstoque, disponivel, destaque, deptid)
VALUES ('ADAPTADOR BLUETOOH USB RECEPTOR DE AUDIO P2', '5.0', '10', '1', '1', '1'), 
('ALICATE PARA CRIMPAR TL-315 3 EM 1', '15.0', '16', '1', '1', '2'),
('CAMERA WEBCAM LOGITECH C270 HD 960-000694', '41.0', '27', '1', '0', '3'),
('ASPIRADOR NAPPO NLAR-063 ROBOT WIFI 350ML PRETO', '87.0', '2', '1', '0', '4');

# Clientes
INSERT INTO clientes (nome, email, whatsapp, senha)
VALUES ('Daniela Barbosa', 'daluifernandes@gmail.com', '(31)99999-9999', 's3nha123'),
('Lidiane Mara', 'lidi@gmail.com', '(31)99999-9995', 'senha74123'),
('Bruna Menezes', 'bruna@gmail.com', '(31)99929-8899', '123senha!'),
('Jéssica Gonçalvez', 'jessik@gmail.com', '(31)99497-9339', 's!nha741');

# Cidades
INSERT INTO cidades (cidade, estado)
VALUES ('Rio de Janeiro', 'Rio de Janeiro'), ('São Paulo', 'São Paulo'), ('Belo Horizonte', 'Minas Gerais');

# Tipos de endereço
INSERT INTO tipo_enderecos (nome)
VALUES ('Residencial'), ('Comercial'), ('Presente');

# Endereços
INSERT INTO enderecos (tipoenderecoid, tipologradouro, logradouro, numero, complemento, bairro, cep, cidadeid)
VALUES ('1', 'Rua', 'Albuquerque Lins', '902', 'Apt 202', 'Santa Cecilia','01230001', '2'),
('2', 'Avenida', ' Europa', '158', 'Sala 2', 'Jardim Europa', '01449000', '2'),
('1', 'Rua', 'Muniz Barreto', '396', 'Apto 202', 'Botafogo', '22251090', '1'),
('1', 'Rua', 'da Bahia', '1148', 'Bloco H Apt 601', 'Centro','30160906', '3'),
('3', 'Rua', 'Augusto de Lima', '46', 'Apto 403', 'Centro','30190001', '3');

# Conexão entre clientes e endereços
INSERT INTO cliente_enderecos(clienteid, enderecoid)
VALUES ('1', '2'), ('1', '4'), ('2', '1'), ('3', '3'), ('4', '5');

# Status do pedido 
INSERT INTO status_pedido(nome)
VALUES ('Novo pedido'), ('Cancelado'),  ('Aguardando pagamento'),  ('Pagamento autorizado'),
('Pagamento negado'), ('Em separação'), ('Em transporte'), ('Entregue');

# Pedidos
INSERT INTO pedidos (data, clienteid, statusid)
VALUES ('2021-05-19',  '1', '3'), ('2021-05-19',  '4', '3'), ('2021-05-19', '2', '3'), 
('2021-05-19',  '3', '8');

# Especificação de Produtos em Pedidos
INSERT INTO pedidos_produtos (pedidoid, produtoid, valorindividual, quantidade, valortotal)
VALUES ('1', '4', '87', '1', (quantidade * valorindividual)), ('2', '4', '87', '1', (quantidade * valorindividual)), 
('3', '3', '41', '1', (quantidade * valorindividual)), ('4', '1', '5', '1', (quantidade * valorindividual))


