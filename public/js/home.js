const myModal= new bootstrap.Modal("#transactionModal");
let logged= sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let cashIn=[];
let cashOut=[];
let data= {
    transactions:[]
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href="transactions.html"
})

//ADICIONAR LANÇAMENTO

document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);//transforma em numero flutuante
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;

    const type= document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type:type , description: description, date: date
    });

   
    saveDate(data);
    e.target.reset();
    myModal.hyde();

    getCashIn();
    getCashOut();
    getTotal();

});



checkLogged();

    function checkLogged(){
        if(session){
            sessionStorage.setItem("logged", session);
            logged= session;
        }
        if(!logged){
            window.location.href="index.html";
            return;
        }

        const dataUser =localStorage.getItem(logged);
        if(dataUser){
             data= JSON.parse(dataUser);
        }
         getCashIn();
         getCashOut();
         getTotal();
    }
    
    //deslogar do site 
    
    function logout(){
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");

        window.location.href="index.html"

    }
    //LIMITA A VISUALIZAÇÃO DAS ULTIMAS LANÇAMENTOS

    function getCashIn(){
        const transaction= data.transactions;
        
        const cashIn = transaction.filter((item) => item.type==="1");

        if(cashIn.length){
            let cashInHtml= ``;
            let limit=0;
        }
    
    if(cashIn.length>5){
        limit=5;
    }
        else{
            limit= cashIn.length;
        }
    
    }
    for (let index = 0; index < limit.length; index++) {
        console.log(index);
        console.log(cashIn[index]);

        
    }


    





    function saveDate(data){
        localStorage.setItem(data.login, JSON.stringify(data) );
    }