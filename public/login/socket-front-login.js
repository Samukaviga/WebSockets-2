import { definirCookie } from "../utils/cookies.js";

const socket = io();


function emitirAutenticarUsuario(dados){

    socket.emit('autenticar_usuario', dados);

}

    socket.on('autenticacao_sucesso', (tokenJwt) => {
        
        definirCookie('tokenJwt', tokenJwt); //para guardar dados no front-end. O cookie precisa como param: Uma chave e o Valor

        alert('Usuario autenticado!')
        window.location.href = '/';
    });

    socket.on('autenticacao_erro', () => alert('Usuario ou senha incorretos.'));

    socket.on('usuario_nao_encontrado', () => alert('Usuario nao encontrado.'));



export { emitirAutenticarUsuario } ;
