//Pasta utils que significa UTILIDADES
import { randomBytes, scryptSync } from 'crypto';  //importando o modo cripto do NODEJS

function criaHashESalSenha(senhaDigitada) {

    const salSenha = randomBytes(16).toString('hex')  //16 é o tamanho de bytes que vai ser criado para essa hash
                                                        // O retorno de randomBytes retorna um Buffer do JS. toString irá convertare para String
                                                            //hex: indica que a String será codificado em Hexadecimal

    const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString('hex') //Parametros: senha digitada, senha com sal e o tamanho da Hash. 
                                                                                    //E o toString para codigidificar para Hexadecimal

    return { salSenha, hashSenha } //retornando um Objeto que contem o salSenha e hashSenha que sera decodigicado posteriormente                                                                             

}

export { criaHashESalSenha }