//Do Utilitario do lado front-end
function definirCookie(chave, valor){

    document.cookie = `${chave}=${valor};path=/`; //Definindo a CHAVE e um VALOR do cookie
}

function obterCookie(chave){
    return document.cookie  
        .split('; ')
        .find((cookie) => cookie.startsWith(`${chave}=`))
        ?.split('=')[1];
}

function removerCookie(chave) {
    document.cookie = `${chave}=;expiress=Thu, 01 Jan 1970 00:00:00 GMT`;
    alert('Usuario deslogado com sucesso!!');
    window.location.href = '/login/index.html';
}

export { definirCookie, obterCookie, removerCookie }