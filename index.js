const express = require('express')
const app = express()
//const port = 8080
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        message: 'Ola bem vindo'
    })

})
/*
app.get('/cadastro', (req, res) => {
    res.send({
        message: 'Ola você está na página de cadastro'
    })
})*/

app.get('/contatos/:idcontato', (req, res) => {
    res.send({
        message: 'Pagina de pesquisa por id',
        contatoid: req.params.idcontato
    })
})

app.get('/contatos', (req, res) => {
    res.send({
        message: 'Ola você está no endpoint cadastro de contato'
    })
})
app.post('/contatos', (req, res) => {
    var contato = {
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone
    }
    res.send({
        message: 'Ola você está no endpoint cadastro de contato - POST',
        contatoEnviado: contato
    })
    //salvar no banco de dados
})

app.put('/contatos/:idcontato', (req, res) => {
    var contato = {
        id: req.params.idcontato,
        nome: req.body.nome,
        email: req.body.email,
        fone: req.body.fone
    }
    res.send({
        message: 'Alteração de contato',
        contatoAlterado: contato
    })
})

app.delete('/produtos/:idproduto', (req, res) => {
    var idproduto = req.params.idproduto
    for(let i = 0; i< listaprodutos.lenght; i++){
        if(listaprodutos[i].id == idproduto){
            listaprodutos.splice(i, 1)
        }
    }
    res.status(200).send({
        message: 'Registro excluído com sucesso!',
        id: idproduto
    })

})

app.listen(port, () => { console.log(`executando em http:/localhost:${port}`);})