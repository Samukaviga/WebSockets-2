// è necessario implementar uma biblioteca que se chama JsonWebToken: jasonwebtoken@8.5.1
// è recomendado usar VARIAVEIS de AMBIENTE para guardar a CHAVESECRETA. para isso é necessario instalar o dotenv@16.0.3
import jwt from 'jsonwebtoken';

function gerarJwt(payLoad) {

    const tokenJwt = jwt.sign(payLoad, process.env.SEGREDO_JWT, {  //jwt.sign(): metodo usado para gerar um novo token. Paramentros: payload, segredo que vai fornecer maior protecao dos dados
           expiresIn: '1h',                                                    //3° é opcional, pode passar alguma confg para o token, tipo: expiresIn(expira em)         
    });
    
    return tokenJwt; 

}

export default gerarJwt;