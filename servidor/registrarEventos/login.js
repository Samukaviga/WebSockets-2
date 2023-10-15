import { encontrarUsuario } from "../db/usuariosDb.js"
import { autenticarUsuario } from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";



function registrarEventosLogin(socket, io){

    socket.on('autenticar_usuario', async ({nome, senha}) => { // destruturacao de dados
        
       const usuario = await encontrarUsuario(nome);
        
       if(usuario){
           
           const autenticado = autenticarUsuario(senha, usuario); //Se for verdadeiro retornará TRUE

           if(autenticado){
                
               const tokenJwt = gerarJwt({nomeUsuario: nome}); //nome como payload pois o nome de usuario é unico. 
                                                       //è necessario passa o nome como objeto para que o expiresIn funcione                              
                //console.log(tokenJwt);
                socket.emit('autenticacao_sucesso', tokenJwt);
           }else {
                socket.emit('autenticacao_erro');
           }

        } else {
           socket.emit('usuario_nao_encontrado');
    }
       
    });

}

export default registrarEventosLogin;

