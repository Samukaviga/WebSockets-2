import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor, atualizarInterfaceUsuarios, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io('/usuarios', {
  auth: {
    token: obterCookie('tokenJwt')
  }
});

socket.on('autorizacao_sucesso', tratarAutorizacaoSucesso);  //autorizacao_sucesso esta recebendo o payload e logo em saguida executando a funcao TratarAutorizacaoSucesso

socket.on('connect_error', (erro) => {  //evento interno do Socket.io, quando o NEXT é executado disparando algum erro
  alert(erro);
  window.location.href = '/login/'; //direcionando para a paginca de login
});

function selecionarDocumento(dadosEntrada) { //dados entrada vai receber o nome do documento mais o paytoken que é o nome do usuario. Objeto
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on('usuario_ja_no_documento', () => { 
  alert('Documento já aberto em outra pagina');
  window.location.href = '/';

});

socket.on('usuarios_no_documento', atualizarInterfaceUsuarios);

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
