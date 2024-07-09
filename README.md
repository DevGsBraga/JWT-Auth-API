# JWT-Auth-API

Este projeto é uma API de autenticação baseada em JSON Web Tokens (JWT), desenvolvida com Node.js, Express, MongoDB, Mongoose, bcrypt e jsonwebtoken. A API permite criar usuários, fazer login e proteger rotas usando tokens JWT.
## Tecnologia utilizada

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- Jsonwebtoken
- Dotenv





### Funcionalidades

- Criação de usuários com senha criptografada
- Login de usuários com geração de token JWT
- Proteção de rotas utilizando middleware de verificação de token
- Rotas públicas e privadas

### Pré-requisitos

- Node.js instalado
- MongoDB Atlas ou uma instância local do MongoDB
- Conta no MongoDB Atlas (caso use a versão em nuvem)
- NPM ou Yarn instalado
### Configuração do Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/JWT-Auth-API.git
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd JWT-Auth-API
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
    DB_USER=seu_usuario_do_mongodb
    DB_PASS=sua_senha_do_mongodb
    JWT_SECRET=sua_chave_secreta_jwt
    ```

5. Inicie o servidor:
    ```bash
    npm start
    ```
    ou
    ```bash
    yarn start
    ```

## Rota API

### Rota Pública

- **GET /**: Retorna uma mensagem de boas-vindas.

### Rota Privada

- **GET /user/:id**: Retorna os dados de um usuário específico (exceto a senha). Requer autenticação por token.

### Rotas de Autenticação

- **POST /auth/user**: Cria um novo usuário.
    - Parâmetros esperados no corpo da requisição (JSON):
        ```json
        {
            "name": "Nome do Usuário",
            "email": "email@dominio.com",
            "password": "senha",
            "confirmpassword": "senha"
        }
        ```

- **POST /auth/login**: Realiza o login do usuário.
    - Parâmetros esperados no corpo da requisição (JSON):
        ```json
        {
            "email": "email@dominio.com",
            "password": "senha"
        }
        ```
## Contatos

## Contato

Para mais informações, entre em contato através do email: [devgsbraga@gmail.com](mailto:devgsbraga@gmail.com)
ou conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/gabrielbraga-dev/).
