//importa o framework Express e o middleware CORS
const express= require ('express');
const cors= require ('cors');

//carrega as variaveis de ambiente do arq .env
require('dotenv').config();

//importa as rotas criadas na pasta de rotas
const autenticacaoRotas= require('./src/rotas/autenticacaoRotas');
const ubsRotas= require('./src/rotas/ubsRotas');
const mapaRotas= require('./src/rotas/mapaRotas');


//inicializa a aplicação Express
const app= express();


//configuração globais (middlewares)
app.use(cors()); //libera a conexão do frontend 
app.use(express.json()); //premite receber dados em formato JSON


//rota de testa para verificar se o servidor está rodando
app.get('/',(req,res) =>{
    return res.json({mensagem: 'API rodando com sucesso!'});
});


//registar os modulos de rota
app.use('/autenticacao', autenticacaoRotas);
app.use('/ubs', ubsRotas);
app.use('/mapa', mapaRotas);


//define a porta do servidor
const PORTA= process.env.PORT || 3333;


//inicia o servidor
app.listen(PORTA,() =>{
    console.log(`Servidor rodando na porta ${PORTA}`);
})
