import mysql from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);


async function criarConexao() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Caladan",
    port: 3306
  });
}


app.get('/produtos', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const conn = await criarConexao();
    const [rows] = await conn.query("SELECT * FROM produtos");
    reply.status(200).send(rows);
  } catch (erro: any) {
    tratarErro(erro, reply);
  }
});


app.post('/produtos', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, nome, preco, categoria } = request.body as any;


  if (id == null || !nome || preco == null || !categoria) {
    return reply.status(400).send({ mensagem: "Campos obrigatórios: id, nome, preco, categoria" });
  }

  try {
    const conn = await criarConexao();
    await conn.query(
      "INSERT INTO produtos (id, nome, preco, categoria) VALUES (?,?,?,?)",
      [id, nome, preco, categoria]
    );
    reply.status(201).send({ id, nome, preco, categoria });
  } catch (erro: any) {
    tratarErro(erro, reply);
  }
});


app.put('/produtos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const { nome, preco, categoria } = request.body as any;

  if (!nome && preco == null && !categoria) {
    return reply.status(400).send({ mensagem: "Informe pelo menos um campo para atualizar" });
  }

  try {
    const conn = await criarConexao();
    const campos: string[] = [];
    const valores: any[] = [];

    if (nome)     { campos.push("nome = ?"); valores.push(nome); }
    if (preco != null)   { campos.push("preco = ?"); valores.push(preco); }
    if (categoria){ campos.push("categoria = ?"); valores.push(categoria); }

    valores.push(id);

    const sql = `UPDATE produtos SET ${campos.join(", ")} WHERE id = ?`;
    await conn.query(sql, valores);

    reply.status(200).send({ mensagem: "Produto atualizado com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  }
});


app.delete('/produtos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  try {
    const conn = await criarConexao();
    await conn.query("DELETE FROM produtos WHERE id = ?", [id]);
    reply.status(200).send({ mensagem: "Produto removido com sucesso" });
  } catch (erro: any) {
    tratarErro(erro, reply);
  }
});


function tratarErro(erro: any, reply: FastifyReply) {
  switch (erro.code) {
    case "ECONNREFUSED":
      reply.status(500).send({ mensagem: "ERRO: conexão recusada (ligue o LARAGÃO!)" });
      break;
    case "ER_BAD_DB_ERROR":
      reply.status(500).send({ mensagem: "ERRO: banco de dados não encontrado" });
      break;
    case "ER_ACCESS_DENIED_ERROR":
      reply.status(500).send({ mensagem: "ERRO: usuário/senha inválidos" });
      break;
    case "ER_DUP_ENTRY":
      reply.status(400).send({ mensagem: "ERRO: entrada duplicada (ID já existe)" });
      break;
    case "ER_NO_SUCH_TABLE":
      reply.status(500).send({ mensagem: "ERRO: tabela 'produtos' não existe" });
      break;
    default:
      console.error(erro);
      reply.status(500).send({ mensagem: "ERRO desconhecido", detalhe: erro.message });
  }
}


app.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
