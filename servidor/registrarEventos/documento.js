import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";

import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumento(socket, io) {

    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => { //recebendo o nome do documento e o nome do usuario fornecido pelo payToken

      
      const documento = await encontrarDocumento(nomeDocumento);
      
      if (documento) {

        const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario); //verificacao se o usuario já está nesse documento em espescifico 

        if(!conexaoEncontrada){ //se o mesmo usuario nao foi encontrado vai executar normalmente
          
          socket.join(nomeDocumento);
  
          adicionarConexao({ nomeDocumento, nomeUsuario }); //adicionando o NomeDocumento e nomeUsuario na lista
  
          socket.data = { //Objeto que pode ser criado através do socket.io. Ele esta guardando DADOS de que o usuario entrou 
              usuarioEntrou: true,
          }

          const usuariosDocumento = obterUsuariosDocumento(nomeDocumento); //para obter usuario especificamente de um documento 
  
          io.to(nomeDocumento).emit('usuarios_no_documento', usuariosDocumento); //enviando para todos os usuarios que estao dentro desse documento e TAMBEM PARA O CLIENTE CONECTADO
  
          devolverTexto(documento.texto);
          
        } else {
          //removerConexao(nomeDocumento, nomeUsuario); //vai remover a conexao
          socket.emit('usuario_ja_no_documento');
        }
        
      }

      socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
    
        if (atualizacao.modifiedCount) {
          socket.to(nomeDocumento).emit("texto_editor_clientes", texto); //enviar para todos os cliente MENOS PARA O CLIENTE CONECTADO
        }
      });
    
      socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);
    
        if (resultado.deletedCount) {
          io.emit("excluir_documento_sucesso", nome);
        }
      });

      socket.on('disconnect', () => {  //executando esse evento para clientes especificos. Todo que sairem desse documento, vai exibir a saida
        
        if(socket.data.usuarioEntrou){ // se o usuarioEntrou: true. Vai remover a conexao
          
          removerConexao(nomeDocumento, nomeUsuario); //assim que o usuario sair vai emitir essa funcao
          
          const usuariosDocumento = obterUsuariosDocumento(nomeDocumento); //Para obter os usuarios do documento
 
          io.to(nomeDocumento).emit('usuarios_no_documento', usuariosDocumento); //enviando para todos os usuarios que estao dentro desse documento e TAMBEM PARA O CLIENTE CONECTADO
                                                                                     //emitindo para o front-End os usuario ATUALIZADOS
        }

      })
        
    });


      
     


}


export default registrarEventosDocumento;