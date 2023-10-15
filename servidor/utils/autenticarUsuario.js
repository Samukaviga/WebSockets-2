//Pasta utils que significa UTILIDADES
import { scryptSync, timingSafeEqual } from 'crypto';

function autenticarUsuario(senhaDigitada, usuario){

    const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64); //criando uma nova Hash com o Buffer do JS

    const hashReal = Buffer.from(usuario.hashSenha, 'hex'); //fazendo o Buffer a partir da hashSenha que esta guardado no BD   
                                                                   //pegando uma codificacao em Hexadecimal e transformando em Buffer  

    const autenticado = timingSafeEqual(hashTeste, hashReal);  //fazendo a comparacao entre as 2 Hashs

    return autenticado;
}

export { autenticarUsuario };