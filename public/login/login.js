import { emitirAutenticarUsuario } from "./socket-front-login.js";

const formulario = document.querySelector('#form-login');


formulario.addEventListener('submit', (event) => {
    event.preventDefault(); //prevenindo o evento padrao de recarregamento de pagina

    const nome = formulario['input-usuario'].value;
    const senha = formulario['input-senha'].value;

    emitirAutenticarUsuario({nome, senha});


})


