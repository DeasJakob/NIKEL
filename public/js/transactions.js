const myModal= new bootstrap.Modal("#transactionModal");
let logged= sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let cashIn=[];
let cashOut=[];

let data= {
    transactions:[]
};

document.getElementById("button-logout").addEventListener("click", logout);



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

    getTransactions();

    
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
        
        getTransactions();

    }
    function logout(){
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");
    
        window.location.href="index.html"
    
    }

    function getTransactions(){
        const transactions = data.transactions;
        let transactionsHtml = ``;

        if(transactions.length){
           transactions.forEach((item) => {
            let type="Entrada";
         
            if(item.type==="2"){
                type="saída";
            }
        
                
               
                transactionsHtml +=` 
                <tr >
                    <th scope="row">${item.date1}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                 </tr>
                `
            })

        }
document.getElementById("transactions-list").innerHTML="transactions"

    }
    
    function saveDate(data){
        localStorage.setItem(data.login, JSON.stringify(data) );
    }