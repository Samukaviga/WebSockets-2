import 'dotenv/config'; //importando o dotenv para configurar as variaveis de ambiente

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/Inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";
import autorizarUsuario from './middlewares/autorizarUsuario.js';


const nspUsuarios = io.of('/usuarios'); //variavel NAMESPACE /usuarios

//Retringindo as areas de acesso registrando um Middleware(Intermediador entre o cliente e o servidor). Vai verificar se o cliente tem autorizacao para acessar o servidor
//NEXT é uma funcao que vamos receber do Middleware. Ela vai permitir o acesso ao cliente que quer se conectar ao servidor

                                              // /usuarios: registrando o Middleware no NAMESPACE /usuarios
nspUsuarios.use(autorizarUsuario); //autorizarUsuario: ao inves de colocar uma funcao callback com o NEXT estamos colocando um funcao externa
                            //aqui estamos autorizando o acesso ao usuario


nspUsuarios.on('connection', (socket) => { //o middleware irá verificar a autorizacao do cliente somente nessas paginas
    
    registrarEventosInicio(socket, nspUsuarios); //esses IO fazem referencia ao NAMESPACE /usuarios
    
    registrarEventosDocumento(socket, nspUsuarios);

});


io.of('/').on("connection", (socket) => {

  registrarEventosCadastro(socket, io); //esses IO fazem referencia ao NAMESPACE principal: /
  
  registrarEventosLogin(socket, io);
  

});
  