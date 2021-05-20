CREATE TABLE `Departamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `preco` decimal(7,2) DEFAULT NULL,
  `qtdEstoque` int DEFAULT NULL,
  `disponivel` int NOT NULL,
  `destaque` int NOT NULL,
  `deptid` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_deptid FOREIGN KEY (deptid) REFERENCES Departamentos(id)
);

CREATE TABLE `Clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `whatsapp` varchar(14) NOT NULL,
  `senha` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Cidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Tipo_enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoenderecoid` int NOT NULL,
  `tipologradouro` varchar(10) NOT NULL,
  `logradouro` varchar(50) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(45) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cep` int NOT NULL,
  `cidadeid` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_tipoenderecoid FOREIGN KEY (tipoenderecoid) REFERENCES Tipo_enderecos(id),
  CONSTRAINT fk_cidadeid FOREIGN KEY (cidadeid) REFERENCES Cidades(id)
);

CREATE TABLE `Cliente_enderecos` (
  `clienteid` int NOT NULL,
  `enderecoid` int NOT NULL,
  CONSTRAINT fk_clienteid FOREIGN KEY (clienteid) REFERENCES Clientes(id),
  CONSTRAINT fk_enderecoid FOREIGN KEY (enderecoid) REFERENCES Enderecos(id)
);

CREATE TABLE `Status_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` DATETIME NOT NULL,
  `clienteid` int NOT NULL,
  `statusid` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (clienteid) REFERENCES Clientes(id),
  CONSTRAINT fk_statusid FOREIGN KEY (statusid) REFERENCES Status_pedido(id)
);

CREATE TABLE `Pedidos_produtos` (
  `pedidoid` int NOT NULL,
  `produtoid` int NOT NULL,
  `valorindividual` decimal(7,2) NOT NULL,
  `quantidade` int NOT NULL,
  `valortotal` decimal(7,2) NOT NULL,  
  CONSTRAINT fk_pedidoid FOREIGN KEY (pedidoid) REFERENCES Pedidos(id),
  CONSTRAINT fk_produtoid FOREIGN KEY (produtoid) REFERENCES Produtos(id)
);
