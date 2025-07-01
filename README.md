Banco de dados provisório
```
create database Maison;
USE Maison;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  marca VARCHAR(100) NOT NULL
);
CREATE TABLE estoque (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INT,
  marca VARCHAR(100) NOT NULL
);

INSERT INTO produtos (id, nome, preco, marca) VALUES
  (01,'Rosa Z', 995.00, 'Christian Louboutin'),
  (02,'Sandale Du Desert', 995.00, 'Christian Louboutin'),
  (03,'DAGGER HEEL', 1275.00, 'PACIOTTI'),
  (04,'Scarpin Medusa Aevitas', 15.643, 'Versace'),
  (05,'Sandália Pin-Point', 9.386, 'Versace');
  
  ```
