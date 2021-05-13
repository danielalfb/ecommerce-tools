# **Planejamento das tarefas no ciclo ágil**

### **Projeto:** Criação de ferramentas para gestão de eCommerces

### **Time:** XPDB 🌟

---

### **Epic**

Criar soluções para ajudar gestores de eCommerce a extrair dados de inventários de estoques.

---

## **_Sprint 01 -_** Detalhamento do JSON com a lista dos produtos

#### **Objetivo da Sprint:**

Manipular os objetos no JSON e elaborar listas de visualização dos produtos.

#### **Duração da Sprint:**

1 semana.

#### **Descrição das atividades:**

|    ID | Tarefa                                                                                                                                                                        | Estimativa | Início | Término | Status |
| ----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | :----: | :-----: | :----: |
| 01-00 | Configurar o ambiente de desenvolvimento para Javascript                                                                                                                      |     2      | 07/05  |  07/05  |  DONE  |
| 01-01 | Criar o script e função fetchJson                                                                                                                                             |     1      | 07/05  |  07/05  |  DONE  |
| 01-02 | Criar script para calcular e mostrar a quantidade de todos os produtos (somatória da qtdEstoque de todos os produtos)                                                         |     1      | 08/05  |  08/05  |  DONE  |
| 01-03 | Criar script para calcular e mostrar a quantidade total de itens em destaque (somatória das quantidades dos itens marcados como "emDestaque : sim")                           |     1      | 08/05  |  08/05  |  DONE  |
| 01-04 | Criar script para calcular e mostrar a quantidade total de itens disponíveis (qtdEstoque)                                                                                     |     1      | 08/05  |  08/05  |  DONE  |
| 01-05 | Criar script para calcular e mostrar o valor total do inventário da empresa (somatória do preco \* qtdEstoque)                                                                |     2      | 10/05  |  10/05  |  DONE  |
| 01-06 | Criar script para calcular a somatória de itens por departamento, retornar um objeto com o nomeDepto e o total de itens nele                                                  |     2      | 10/05  |  10/05  |  DONE  |
| 01-07 | Criar script para calcular o valor total do inventário por departamento, retornar um objeto contendo o nomeDepto e o total da somatória do preco \* qtdEstoque dos seus itens |     2      | 11/05  |  11/05  |  DONE  |
| 01-08 | Criar script para calcular e mostrar o valor do ticket médio dos produtos da empresa (valor total do inventário / número de itens)                                            |     2      | 11/05  |  11/05  |  DONE  |
| 01-09 | Criar script para calcular o valor do ticket médio por departamento, retornar uma lista de objetos que contenha cada nome do departamento e o seu ticket médio                |     2      | 12/05  |  12/05  |  DONE  |
| 01-10 | Criar script para determinar e mostrar o departamento mais valioso (departamento com a maior somatória dos valores dos seus itens)                                            |     2      | 12/05  |  12/05  |  DONE  |
| 01-11 | Criar script para determinar e mostrar o produto mais caro da loja, bem como seu departamento                                                                                 |     2      | 13/05  |  13/05  |  DONE  |
| 01-12 | Criar script para determinar e mostrar o produto mais barato da loja, bem como seu departamento                                                                               |     2      | 13/05  |  13/05  |  DONE  |

---

## **_Sprint 02 -_** Criação do Database

#### **Objetivo da Sprint:**

Estruturar o Banco de Dados e elaborar queries de teste.

#### **Duração da Sprint:**

1 semana.

#### **Descrição das atividades:**

|    ID | Tarefa                                                                                       | Estimativa | Início | Término | Status  |
| ----: | :------------------------------------------------------------------------------------------- | :--------: | :----: | :-----: | :-----: |
| 02-00 | Configurar o ambiente                                                                        |     2      | 15/05  |  15/05  | Backlog |
| 02-01 | Criar um modelo entidade/relacionamento contendo produtos, departamentos, usuários e pedidos |     3      | 15/05  |  17/05  | Backlog |
| 02-02 | Converter o modelo MER para o modelo relacional                                              |     3      | 17/05  |  18/05  | Backlog |
| 02-03 | Elaborar arquivo SQL com as instruções de criação de todas as tabelas                        |     1      | 18/05  |  18/05  | Backlog |
| 02-04 | Criar banco de dados                                                                         |     1      | 18/05  |  18/05  | Backlog |
| 02-05 | Criar o script de cadastro de produtos                                                       |     3      | 18/05  |  19/05  | Backlog |
| 02-06 | Teste unitário do script de cadastro de produtos                                             |     1      | 19/05  |  19/05  | Backlog |
| 02-07 | Criar scipt de cadastro de usuário                                                           |     3      | 19/05  |  20/05  | Backlog |
| 02-08 | Teste unitário do scipt de cadastro de usuário                                               |     1      | 20/05  |  20/05  | Backlog |
| 02-09 | Elaborar arquivo SQL com todos os scripts de inserção de dados                               |     1      | 20/05  |  20/05  | Backlog |
| 02-10 | Criar consultas de contagem ou totalização                                                   |     1      | 20/05  |  20/05  | Backlog |
| 02-11 | Criar consultas de junção entre duas tabelas                                                 |     1      | 20/05  |  20/05  | Backlog |
| 02-12 | Criar consultas de junção entre três tabelas                                                 |     1      | 20/05  |  20/05  | Backlog |
| 02-13 | Criar consultas de junção entre duas tabelas + operação de totalização e agrupamento         |     1      | 20/05  |  20/05  | Backlog |
| 02-14 | Criar consultas de junção entre três ou mais tabelas + operação de totalização e agrupamento |     1      | 20/05  |  20/05  | Backlog |
| 02-15 | Elaborar relatório de entrega                                                                |     3      | 20/05  |  21/05  | Backlog |
