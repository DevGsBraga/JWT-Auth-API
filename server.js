require('dotenv').config()  // IMPORTA OS DADOS DO AQUIVO .env

const express = require('express'); // IMPORTA O EXPRESS
const mongoose = require('mongoose'); // IMPORTA O MONGOOSE PARA MANUSEIO COM O BANCO DE DADOS
const bcrypt = require('bcrypt'); // IMPORTA O BCRYPT PARA CRIAÇÃO DE CHAVE SEGURA
const jwt = require('jsonwebtoken');


const port = 3000 // DEFINE A PORTA EM QUE O SERVIDOR VAI RODAR
const app = express(); // IMPORTAMOS O EXPRESS NA VARIAVEL PRINCIPAL ONDE SERÃO CRIADO AS ROTAS

app.use(express.json()) // DEFINE QUE O EXPRESS LEIA OBJETOS EM JSON

const User = require('./models/User'); // IMPORTA O MODELO DE USUÁRIO CRIADO NO ARQUIVO USER.js

// CREDENCIAS DO USUÁRIO CRIADO NO ARQUIVO .env

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

console.log(dbUser)
console.log(dbPassword)

const conectaAoBanco = `mongodb+srv://${dbUser}:${dbPassword}@bancologin.utkrypl.mongodb.net/?retryWrites=true&w=majority&appName=BancoLogin`;  // DEFINIMOS A URL PADRÃO FORNECIDA PELO BANCO (MongoDB)


// O CÓDIGO ABAIXO FAZ A VERIFICAÇÃO DE CONEXAO COM O BANCO E IMPRIME SUCESSO OU ERRO

mongoose.connect(conectaAoBanco).then(() => {    // FUNÇÃO connect() FAZ A CONEXÃO COM O NOSSO BANCO DE DADOS, ATRIBUIMOS O THEN E CATCH PARA TRATARMOS SUCESSO E ERROS.

    console.log(`Servidor conectado ao banco de dados MongoDB`)

    app.listen(port)  // EXECUTA O SERVIDOR.

}).catch((err) => {
    console.log(`Servidor não conectou ao banco, tente novamente`, err)
})



// ROTA PÚBLICA
app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a API pública do site!"})
})



// ROTA PRIVADA
app.get('/user/:id', verificarToken, async (req, res) => {   // DEFINE UMA ROTA PRIVADA AUTENTICADA POR TOKEN

    const id = req.params.id

    // CONFERIR SE USUÁRIO EXISTE NO BANCO

    const user = await User.findById(id, '-password');  // FAZ COM QUER AS INFORMAÇÕES SEJAM PREENCHIDAS EXCETO A SENHA

    if(!user) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }

    res.status(200).json({ user })
})



// FUNCÇÃO PARA VERIFICAR O TOKEN, TRATANDO SUCESSO E ERRO
function verificarToken(req, res, next) {
    const autorizarHeader = req.headers['authorization']
    const token = autorizarHeader && autorizarHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"});
    }

    try {
        const secret = process.env.JWT_SECRET
        jwt.verify(token, secret)

        next();

    } catch (error) {
        console.log(error)
    }



}


// ROTA DE CRIAÇÃO DE USUÁRIO
app.post('/auth/user', async (req, res) => {

    const {name, email, password, confirmpassword} = req.body    // DESESTRUTURANDO VARIAVEIS, OU SEJA SÃO 4 VARIAS CRIADAS EM UMA ÚNICA LINHA DE CÓDIGO

    // VALIDAÇÕES

    if(!name) {
        return res.status(422).json({msg: "O nome é obrigatório"})
    }

    if(!email) {
        return res.status(422).json({msg: "O email é obrigatório"})
    }

    if(!password) {
        return res.status(422).json({msg: "A senha é obrigatória"})
    }

    if(password !== confirmpassword) {
        return res.status(422).json({msg: "Senhas diferente, por favor tente novamente"})
    }




    // VERIFICAR SE USUÁRIO JÁ EXISTE
    const usuarioExistente = await User.findOne({email: email});
    if(usuarioExistente) {
        return res.status(422).json({msg: 'Email já cadastrado'})
    }


    // CRIAR SENHA SEGURA
    const senhaSegura = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, senhaSegura);


    // CRIAR USUÁRIO
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()  // SALVA O USUÁRIO CRIADO NO BANCO
        res.status(200).json({msg: "Usuário criado com sucesso!!"})

    } catch (error) {
        console.log(error)
    }
})


// ROTA DE LOGIN

app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body


    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "O password é obrigatório" })
    }




    // VERIFICAR SE O USUÁRIO EXISTE
    const verificarUser = await User.findOne({ email: email})
    if(!verificarUser) {
        return res.status(404).json({msg: "Email não cadastrado"});
    }


    // VERIFICA SE A SENHA É VALIDA
    const verificarSenha = await User.findOne({ password: password})
    if(!verificarSenha) {
        return res.status(422).json({msg: "Senha inválida"})
    }


    // CRIAR TOKEN SEGURO

    const secret = process.env.JWT_SECRET
    const token = jwt.sign({id: user._id, secret})

    response.status(200).json({msg: "Autenticação realizada com sucesso!", token})

})


