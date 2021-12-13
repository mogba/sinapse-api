const req = require('express/lib/request');
const json = require('express/lib/response');


const db = require('./db');

// Lembra de colocar nas rotas o header pra do Acess contorl pra evitar Cors

module.exports = rotas = {
    configurarRotas: (app) => {
        app.get("/", (req, res) => {
            res.send("Hello world! \n\nRetornar aqui a página inicial para criar novas sinapses");
        });


        app.post("/:enderecoSinapse", async(req, res, next) => {
            // Quando alguém pesquisar na barra de endereço por algo como
            // http://sinapse.com.br/nomeficticio, essa função app.post(/:enderecoSinapse)
            // será responsável por receber essa requisição como post, mas antes de criar
            // a nova sinapse, a aplicação irá verificar se já existe uma sinapse com o
            // nome inserido. Se não existir, vai criar a sinapse, e depois vai retornar 
            // os dados da sinapse criada ou que já existia

            const nomeSinapse = req.params.enderecoSinapse.toString();
            console.log(nomeSinapse.toString());

            var returnSinapse = await db.selectByColumn("SINAPSES", "NOME_SINAPSE", nomeSinapse);

            if (returnSinapse.length == 0) {
                var newSinapse = await db.insertSinapse({ "nome_sinapse": nomeSinapse, "nome_usuario": "" });
                //res.send(console.log("Essa sinapse ainda não existe! Mas academos de criar ela pra você"));
                res.json({ "Message": "Essa sinapse ainda não existe, mas criamos ela pra você :D", newSinapse });
            } else {
                var returnPostsSinapse = await db.selectByColumn("POSTS", "ID_SINAPSE", returnSinapse.map(function(e) { return e.ID_SINAPSE }));
                console.log(returnPostsSinapse);
                res.send(returnPostsSinapse);
            }
            //console.log(returnSinapse);

            //console.log("Entrou");
            //res.send({ "Teste": "Parse" })
            //console.log(req.params);
            //let enderecoSinapse = req.params.enderecoSinapse;
            //console.log(enderecoSinapse);
            //res.send(req.params);
        });


        app.get("/teste", async(req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(await db.selectAllTable("SINAPSES"))
        });

        app.get("/posts", async(req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(await db.selectAllTable("POSTS"))
        });

        app.post("/create/posts", async(req, res) => {
            console.log("Recebendo a informação...");
            console.log("O body é: " + req.body.titulo);
            res.send(await db.insertPost(req.body))
        });


        //Post de teste funcionando com o front-end
        app.post("/create/sinapse", async(req, res) => {
            //req.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Origin", "*");
            console.log("Recebendo a informação...");
            console.log("O body é: " + req.body);
            console.log("O body é: " + req.body.nome_sinapse);
            res.send(await db.insertSinapse(req.body))
        });


        // app.use((req, res, next) => {
        //     res.status(404).send("Sinto muito, mas essa sinapse ainda não existe :)");
        // });
    }
};