const express = ('express')
const app = express()
const port = process.env.port

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

listaprodutos = [{
    id: 1,
    descricao: 'Milho',
    preco: 7.89
},
{
    id: 2,
    descricao: 'feijão',
    preco: 4.89
},
]

app.get('/produtos'), (req, res) => {
    res.status(200).send({ produtos: listaprodutos })
}

app.post('/produtos', (req, res) => {
    var produto = {
        id: listaprodutos.length + 1,
        descricao: req.body.descricao,
        preco : req.body.preco,
    }
    listaprodutos.push(produto)
    req.status(201).send({message: 'Produto inserido com sucesso',
    produtoEnviado: produto
})

})

app.get('/produtos/:idproduto', (req, res) => {
    var idproduto = req.params.idproduto
    var produto = ''
    for (let prod of listaprodutos){
        if (prod.id == idproduto)
            produto = prod
    }
    if (produto == ''){
        res.status(404).send({
            message: 'Produto não encontrado'
        })
    } else {
        res.status(200).send(produto)
    }
})

app.put('/produtos/:idproduto', (req, res) => {
    var idproduto = req.params.idproduto
    var produto = ''
    
    for(let prod of listaprodutos){
        if(prod.id == idproduto){
            prod.descricao = req.body.descricao
            prod.preco = req.body.preco
            produto = prod
        }
    }
    if(produto == '' ){
        res.status(404).send({
            message: 'Produto não encontrado'
        })
    }else{
        res.status(200).send(produto)
    }

})
/*
app.delete('/produtos/:id', (req, res) => {
    var id = req.params.id;
    var index = produtos.findIndex(p => p.id == id);
    produtos.splice(index, 1);
    res.send({message: "Método DELETE executado com sucesso", produtos})
})*/

app.listen(port, () => { console.log(`executando em http:/localhost:${port}`) })