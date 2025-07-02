Banco de dados provisório
create database Caladan;
USE Caladan;

create table produtos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);
 
INSERT INTO produtos (id,nome,categoria,preco) VALUES
(01,"pelúcia de tartaruga-cabeçuda ","Brinquedos", 150.00),
(02,"Colar ametista","Acessórios", 30.00);

  ```
