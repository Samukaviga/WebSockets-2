import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next){    //NEXT é uma funcao que vamos receber do Middleware. Ela vai permitir o acesso ao cliente que quer se conectar ao servidor

    const tokenJwt = socket.handshake.auth.token; //tendo acesso ao token que foi definido do lado cliente
    //tendo acesso ao socket que esta tentando se conectar do lado cliente

    try {
        const payLoadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT); //passando o token/cookie e a chave secreta. O metodo VERIFY lança um erro quando vê que o TOKEN nao esta VÁLIDO

        socket.emit('autorizacao_sucesso', payLoadToken); //enviado o payload para o front-end com o nome do usuario para mostrar online

        next();

    } catch (error) {
        next(error);
    }




}

export default autorizarUsuario;