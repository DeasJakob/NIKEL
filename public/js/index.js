const myModal= new bootstrap.Modal("#registerModal");
let logged= sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR SISTEMA

document.getElementById("login-form").addEventListener("submit",function(e){
    e.preventDefault();

    const email= document.getElementById("email-input").value;
    const senha= document.getElementById("password-input").value;
    const checkSession= document.getElementById("session-check").checked;


    const account = getAccount(email);

    if(!account){
        alert("opps! verifique o usuário ou a senha"); // serve para verificar se existe um erro na conta ou
        return;
    }

    if(account){
        if(account.senha !== senha){
            alert("opps! verifique o usuário ou a senha"); // serve para verificar se existe um erro na conta ou
        return;
        }
        saveSession(email, checkSession)
       
        window.location.href="home.html" // serve para fazer a transição de login para a pagina desejada


    }

    
});





//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    
    const email= document.getElementById("email-create-input").value;
    const senha= document.getElementById("password-create-input").value;

    if(email.length<5){
        alert("preencha o campo com email valido"); // determina campo de email
        return;

        }
        if(senha.length<4){
            alert(" preencha a senha com no minimo 4 digitos"); // determina o campo de senha
            return;
    }

    saveAccount({
        login: email,
        senha: senha,
        transaction:[]
    });

    myModal.hide();

    alert("CONTA CRIADA COM SUCESSO")
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged=session;

    }

    if(logged){
        saveSession(logged, session);

        window.location.href="home.html";
    }
}


function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); //LOCAL DE ARMAZENAMENTO LOCAL (bando de dados )
}



function saveSession(data,saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
     sessionStorage.setItem("logged", data);

}




function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

return "" ;

}