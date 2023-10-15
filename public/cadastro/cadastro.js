import { emitirCadastrarUsuario } from './socket-front-cadastro.js';

const formularioCadastro = document.querySelector('#form-cadastro');


formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = formularioCadastro['input-usuario'].value;
    const senha = formularioCadastro['input-senha'].value;

     emitirCadastrarUsuario({nome, senha});

    });


