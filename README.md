 🌊☆⋆｡🪼Tema do Projeto𖦹°‧★🐚
-
O Caladan Ecorefúgio é um sistema de gerenciamento de vendas de produtos confeccionados à mão para angariar fundos para um projeto de resgate e tratamento de animais marinhos em situação de vulnerabilidade.

🪼 Funcionalidades Implementadas
-
1. Foi utilizado React no frontend, e a navegação entre as páginas é feita com a biblioteca react-router-dom.
   
4. Backend em Fastify (index.ts)
   -
API RESTful com endpoints para consulta.
Conexão com MySQL para armazenamento dos dados.
Tratamento de erros detalhado para auxiliar no desenvolvimento.

🐚 Como Executar o Projeto Localmente
-
1.Pré-requisitos
Node.js 
MySQL (Laragon para gestão do banco)
Git (opcional, para clonar o repositório)

comandos do terminal 
-
```
npm install fastify mysql2 @fastify/cors
 npm run dev
```

Código MySql
-
```CREATE DATABASE  Caladan;
USE Caladan;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
INSERT INTO categorias (nome) VALUES
('Brinquedos'),
('Acessórios'),
('Produtos Gerais'),
('Ofertas'),
('Pelúcias'),
('Camisetas');

INSERT INTO produtos (nome, preco, categoria_id) VALUES
('Pelúcia Tartaruga-Cabeçuda', 150.00, 5),
('Colar Ametista', 30.00, 2),
('Pulseira Coral Natural', 45.00, 2),
('Camiseta EcoRefúgio Verde', 60.00, 6),
('Brinquedo Orca Saltadora', 120.00, 1),
('Pelúcia Tubarão Martelo', 140.00, 5),
('Kit Canudos Reutilizáveis', 25.00, 3),
('Camiseta EcoRefúgio Azul', 65.00, 6),
('Oferta Especial – Colar de Concha', 20.00, 4),
('Oferta Especial – Pulseira de Praia', 18.00, 4);

SELECT p.id, p.nome, p.preco, c.nome AS categoria
       FROM produtos p
       INNER JOIN categorias c ON p.categoria_id = c.id;


  ```
Diagrama
-
<img width="414" height="280" alt="image" src="https://github.com/user-attachments/assets/e37792c1-6938-47aa-b05e-6a41d23b0629" />











































