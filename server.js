const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const pg = require('pg');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const consStr = process.env.DATABASE_URL;
const pool = new pg.Pool({
    connectionString: consStr
});

app.get('/conexao', (req, res) => {
    pool.connect((err, client) => {
        if (err) {

            return res.status(500).send({ message: "Erro ao conectar com o banco de dados", err: err.message });
        }
        return res.send({ message: "Conexão realizada com sucesso" });

    })
})

app.get('/produtos', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            res.send({ message: "Erro ao conectar ao banco de dados", err: err.message });
        }

        client.query('SELECT * FROM produto', (err, result) => {
            if (err) {
                res.send({ message: "Erro ao executar a query", err: err.message });
            }
            res.send({ message: "Método GET executado com sucesso", produtos: result.rows });
        }
        )

    })
})

app.post('/produtos', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({ message: 'Erro ao conectar ao banco de dados' });
        }
        //var sql = `insert into produto(descricao, preco)values(${req.body.descricao}, ${req.body.preco})`
        var sql = 'insert into produto(descricao, preco)values($1, $2)'
        var dados = [req.body.descricao, req.body.preco]
        client.query(sql, dados, (error, result) => {
            if (err) {
                res.send({ message: "Erro ao executar a query de inserir registro", err: err.message });
            }
            return res.status.apply(201).send({ message: 'produto inserido com sucesso' })
        })

    })
})

app.get('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            res.send({ message: "Erro ao conectar ao banco de dados", err: err.message });
        }

        client.query('SELECT * FROM produto where id = $1', [req.params.idproduto], (err, result) => {
            if (err) {
                res.send({ message: "Erro pesquisar dado específico", err: err.message });
            }
            return res.status(200).send(result.rows[0])
        }
        )

    })
})

app.delete('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            res.send({ message: "Erro ao conectar ao banco de dados", err: err.message });
        }

        client.query('delete FROM produto where id = $1', [req.params.idproduto], (err, result) => {
            if (err) {
                res.send({ message: "Erro ao excluir os dados", err: err.message });
            }
            return res.status(200).send(result.rows[0])
        }
        )

    })
})
/* FALTA AJUSTAR ESSE PUT */
app.put('/produtos/:idproduto', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send({
                message: 'Erro ao conectaro no database'
            })
        }
        var sql = 'update produto set descricao = $1, preco = $2 where id = $3'
        var dados = [req.body.descricao, req.body.preco, req.params.idproduto]
        client.query(sql, dados, (error, result) => {
            if (error) {
                res.send({
                    message: 'Erro ao atualizar dados',
                    error: error.message
                })
            }
            return res.status(200).send({ message: 'atualizado com sucesso' })
        })
    })
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})