import express from 'express';
import bodyParser from 'body-parser';

const porta = 3000;
const host = '0.0.0.0';
var listaUsuarios = [];

// Função para processar o cadastro de usuário
function processaCadastroUsuario(req, res) {
    // Agora os dados estarão em req.body em vez de req.query
    const usuario = {
        nome: req.body.nome,
        sobreNome: req.body.sobreNome,
        telefone: req.body.telefone,
        email: req.body.email,
        rua: req.body.rua,
        bairro: req.body.bairro,
        numero: req.body.numero,
        cep: req.body.cep
    }

    // Adiciona um usuário na lista
    listaUsuarios.push(usuario);

    // Retorna a lista de usuários
    let conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Lista de Usuários</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Rua</th>
                            <th>Bairro</th>
                            <th>Número</th>
                            <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>`;

    // Preenche a tabela com os usuários
    for (const usuario of listaUsuarios) {
        conteudoResposta += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.sobreNome}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rua}</td>
                <td>${usuario.bairro}</td>
                <td>${usuario.numero}</td>
                <td>${usuario.cep}</td>
            </tr>
        `;
    }

    conteudoResposta += `
                    </tbody>
                </table>
                <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
                <a class="btn btn-primary" href="/cadastrarUsuario.html" role="button">Continuar Cadastrando</a>
            </body>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </html>
    `;
    res.end(conteudoResposta);
}

const app = express();

// Indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'.
app.use(express.static('./paginas'));

// Adicionando o middleware bodyParser para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.end(`
        <!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Menu do Sistema</title>
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="/cadastrarUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
});

// Modificando a rota para usar o método POST
app.post('/cadastrarUsuario', processaCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na URL http://${host}:${porta}`);
});
