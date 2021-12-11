export const rotas = {
    configurarRotas: (app) => {
        app.get("/", (req, res) => {
            res.send("Hello world! \n\nRetornar aqui a página inicial para criar novas sinapses");
        });

        app.post("/:enderecoSinapse", (req, res, next) => {
            // Quando alguém pesquisar na barra de endereço por algo como
            // http://sinapse.com.br/nomeficticio, essa função app.post(/:enderecoSinapse)
            // será responsável por receber essa requisição como post, mas antes de criar
            // a nova sinapse, a aplicação irá verificar se já existe uma sinapse com o
            // nome inserido. Se não existir, vai criar a sinapse, e depois vai retornar 
            // os dados da sinapse criada ou que já existia

            console.log(req.params);
            let enderecoSinapse = req.params.enderecoSinapse;
            res.send(req.params);
        });

        // app.use((req, res, next) => {
        //     res.status(404).send("Sinto muito, mas essa sinapse ainda não existe :)");
        // });
    }
};