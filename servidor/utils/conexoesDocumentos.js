
const conexoesDocumentos = []; //essa lista vai armazenar varios objetos, sendo cada um com nome do Usuario e nome do Documento

function encontrarConexao(nomeDocumento, nomeUsuario) { //encontrando se o usuario já esta conectado ao documento
    return conexoesDocumentos.find((conexao) => { //caso encontre ele vai retornar, se nao retornar undefined
        return conexao.nomeDocumento == nomeDocumento && conexao.nomeUsuario == nomeUsuario
    });
}


function adicionarConexao(conexao) {

    conexoesDocumentos.push(conexao);

}

function obterUsuariosDocumento(nomeDocumento) {

    return conexoesDocumentos.filter( (conexao) => conexao.nomeDocumento == nomeDocumento )
                             .map((conexao) => conexao.nomeUsuario); //substituindo cada conexao por nomeUsuario

}

function removerConexao(nomeDocumento, nomeUsuario) {
    const indice = conexoesDocumentos.findIndex((conexao) => { //O findIndex vai retornar o indice do elemento encontrado
        return conexao.nomeDocumento == nomeDocumento && conexao.nomeUsuario == nomeUsuario;
    });

    if(indice !== -1){ //caso ele nao encontre o indece informa ele vai retornar -1
        conexoesDocumentos.splice(indice, 1); //indece é o elemento que vai ser removido e o segundo param: a quantidade de elementos 
    }

}




export { adicionarConexao, obterUsuariosDocumento, removerConexao, encontrarConexao }