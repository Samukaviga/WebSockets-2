import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

//A funcao Middleware é executada antes da conexao do cliente com o servidor por isso vamos utilizar a funcao IO para enviar as infomacoes do Cookie para o servidor
const socket = io('/usuarios',{    //adicionando o NAMESPACE /usuarios na lado cliente. Qualquer cliente tiver entrando a Pag principal ele vai acessar o namespace /usuarios
    auth: {   //auth: autorizar/autenticar. 
        token: obterCookie('tokenJwt')   //token é um nome definido pelo programador
    }
});

socket.on('connect_error', (erro) => { //evento interno do Socket.io, quando o NEXT é executado disparando algum erro
  alert(erro);
  window.location.href = 'login/index.html'; //direcionando para a paginca de login
});

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
