import { criaHashESalSenha } from '../utils/criaHashESalSenha.js';
import { usuariosColecao } from './dbConnect.js';


function cadastrarUsuario({ nome, senha }) { //destruturacao de dados 

    const { hashSenha, salSenha } = criaHashESalSenha(senha);

    const resultado = usuariosColecao.insertOne({
        nome: nome,
        hashSenha: hashSenha,
        salSenha: salSenha
    });

    return resultado;
}
 
function encontrarUsuario(nome) { //desestruturacao de dados
 
    const resultado = usuariosColecao.findOne({
        nome: nome,
    });

    return resultado;
}

export { cadastrarUsuario, encontrarUsuario }