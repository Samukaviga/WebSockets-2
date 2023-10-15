import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js"; 


//EVENTOS LADO SERVIDOR

function registrarEventosCadastro(socket, io){

    socket.on('cadastrar_usuario', async (dados) => {

        const usuario = await encontrarUsuario(dados.nome); //Antes de cadastrar ver se o usuario já existe no banco de dados

        if(!usuario){ 
            const resultado = await cadastrarUsuario(dados);

            if(resultado.acknowledged){
                socket.emit('cadastro_sucesso');
            } else { 
                socket.emit('cadastro_erro');
            } 

        } else {
            socket.emit('usuario_existente');
        }


    })

}

export default registrarEventosCadastro ;