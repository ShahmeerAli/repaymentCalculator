var data = [];//[ [name,balance,rate,payment] , ... ]
var result = []; //[ [finalBal,interest,months,initialBalance] , ... ]
var balanceTotal = document.getElementById("blanceTotal");
var monthlyPayment = document.getElementById("monthlyPayment");
var paymentTotal = document.getElementById("paymentTotal");
var initSnowball = document.getElementById("InitialSnowball");


//getting data from user saving in global variable
const getData = () => {
    let arrSuper = [];
    let tr = document.querySelector(".tbody").children;
    for (i=0; i<10; i++){
        let row = tr[i].children;
        let arr = [];
        for(j=0; j<4; j++){
            let column = row[j].children;
            let val = column[0].value;
            if(val){
                arr.push(val);
            }
        }
        if(arr.length>0){
            arrSuper.push(arr);
        }
    }
    data = arrSuper;
}

//getting totals and setting initial snowball
const calcOne = () =>{
    getData();
    let balance = 0;
    let payment = 0;
    for(i=0; i<data.length; i++){
        if(data[i][1]){
            balance += parseFloat(data[i][1]);
        }
        if(data[i][3]){
            payment += parseFloat(data[i][3]);
        }
    }
    console.log(balance," ",payment);
    balanceTotal.value = parseFloat(balance).toFixed(2);
    paymentTotal.value = parseFloat(payment).toFixed(2);
    initSnowball.value = parseFloat(monthlyPayment.value)-payment;
}

//calculating in chosen order
const strategy = (order) => {
    let asc = 0; 
    let monPay = monthlyPayment.value;
    if(order === "Snowball"){
        asc = data.sort((a,b) => a[1] - b[1]);
    }else{
        asc = data.sort((a,b) => b[2] - a[2]);
    }


    for(j=0; j<asc.length; j++){
        //for each loan
        let payment = 0;
        let loan = asc[j];
        //getting snowball
        for(i=j+1;i<asc.length;i++){
            payment += parseFloat(asc[i][3]);
        }
        let snowBall = monPay-payment;
        let bal = parseFloat(loan[1]);
        let rate = parseFloat(loan[2]);
        let pay = parseFloat(loan[3]);
        let arrSub = calcData(bal,snowBall,rate,j,pay,result);
        result.push(arrSub);
    }
}

// calculate all necessary data
const calcData = (bal,snowBall,rate,index,payment,arrData) => {
    let interest = 0;
    let month = 0;
    let arrSub = [];
    let diff = 0;
    let initialBalance = bal;
    while( bal >= snowBall ){
        if(index>0){
            let count = arrData[index-1][1];
            for(i=0;i<count-1;i++){
                interest += (bal*rate/100)/12;
                bal = bal - ( payment - ((bal*rate/100)/12) );
                month++;
            }
            let remBal = arrData[index-1][2];
            diff = arrData[index-1][3];
            interest += (bal*rate/100)/12;
            bal = bal - ( (snowBall - remBal) - ((bal*rate/100)/12) ) + diff;
            month++;
            index=0;
        }
        interest += (bal*rate/100)/12;
        bal = bal - ( snowBall - ((bal*rate/100)/12) );
        month++;
    }
    if(bal>0){
        month++;
        interest +=(bal*rate/100)/12;
    }
    //Dont know why but need to add this
    let error = (bal*rate/100)/12;
    arrSub.push(interest,month,bal,error,initialBalance);
    return(
        arrSub
    );
}



const calculate = () => {
    let order = document.getElementById("option").value;
    console.log(order)
    strategy(order);
    console.log(result);
}

























// const calc = () => {
//     var temp = 0;
//     var tr = document.querySelector(".tbody").children;
//     for (let i = 0; i < 10; i++) {
//         var td = tr[i].children
//         var input = td[1].children
//         var val =  parseFloat(input[0].value);
//         if(!isNaN(val)){
//         temp = temp + val
//         }
//         else{
//             temp = temp + 0
//         }
//     }
    
    
//     // console.log(temp);
// }
// const calc2 = () => {
//     var temp2 = 0;
//     var tr = document.querySelector(".tbody").children;
//     for (let i = 0; i < 10; i++) {
//         var td = tr[i].children
//         var input = td[3].children
//         var val =  parseFloat(input[0].value);
//         if(!isNaN(val)){
//         temp2 = temp2 + val
//         }
//         else{
//             temp2 = temp2 + 0
//         }
//     }
//     document.getElementById("paymentTotal").value = parseFloat(temp2).toFixed(2);
//     // console.log(temp2);
//     payment();
// }
// const payment = () => {
    
//     InitialSnowball.value = parseFloat(payment.value) - parseFloat(paymentTotal.value)
// }

// const calculateMonth = (balance, amount, snowball, remainingSnowball, interestRate) => {
//     var temp=0, month = 1, totalInterestPaid=0;
//     var rateAmount = parseFloat((parseFloat(balance).toFixed(2) * (parseFloat(interestRate).toFixed(2)/100))/12);
//     // console.log('typeof ', typeof rateAmount)
//     while (balance > snowball) {
//         if(temp=0){
//             var finalSnowball = amount + remainingSnowball;
//             temp = 1;
//         }
//         else { 
//             var finalSnowball = amount + snowball;
//         }
//         var sem = finalSnowball - interestRate;
//         balance -=sem;
//         // console.log('balance', balance);
//         totalInterestPaid +=rateAmount
//         rateAmount = parseFloat((parseFloat(balance).toFixed(2) * (parseFloat(interestRate).toFixed(2)/100))/12);
//         month++;

//     }
//     // console.log('typeof totalInterestPaid', typeof parseFloat(totalInterestPaid).toFixed(2))
//     // console.log('balance', balance -=sem);
//     return {
//         totalInterestPaid: parseFloat(totalInterestPaid).toFixed(2),
//         month: month,
//         remainingSnowball: finalSnowball
//     }
// } 
// const calculate = () => {
//     getData();
//     getTotalBalance();
//     console.log(data);
//     // create table 
//     var tr = document.querySelector(".tbody").children;
//     var content = document.getElementById("content")
//     for (let i = 0; i < 10; i++) {
//         var td = tr[i].children
//         var input = td[0].children
//         if(input[0].value != ""){
//             var row = document.createElement("tr");
//             for (var j = 0; j < 6; j++) {
//                 var cell = document.createElement("td");
//                 row.appendChild(cell);
//             }
//             content.appendChild(row)
//             // console.log(input[0].value);
//         }
        
//     }


//     for (let index = 1; index < 11; index++) {
//         var Creditor = document.getElementById("Creditor"+[index])
//         var blance = document.getElementById("blance"+[index])
//         var Rate = document.getElementById("Rate"+[index])
//         var Payment = document.getElementById("Payment"+[index])
//         if(Creditor.value != ""){
//         // console.log(Creditor.value, parseInt(blance.value), parseFloat(Rate.value).toFixed(2),parseInt(Payment.value));
//         const data = calculateMonth(Creditor.value, parseInt(blance.value), parseFloat(Rate.value).toFixed(2),parseInt(Payment.value));
//         // console.log('data', data)
//         }
//     }

//     // calculation

//     // var arr = [];
//     // var val = document.querySelector(".tbody>:nth-child(1)>:nth-child(2)>input")
//     // var r = document.querySelector(".tbody>:nth-child(1)>:nth-child(3)>input")
//     // var blance = parseInt(val.value);
//     // var rate = parseFloat(r.value)/100;


    
//     // var ratePer = parseFloat((blance * rate)/12).toFixed(2);
//     // // console.log(ratePer);

//     // var payment = 30;
//     // var snowball = 230;
    

//     // const data = calculateMonth(3200, 30,230,230,9.81)
//     // console.log('data', data)

    
//     // for (let i = 0; i < 14; i++) {
//     //     arr.push(parseFloat(ratePer).toFixed(2))
//     //     var FinalSnowball = payment + snowball;
//     //     var sem = FinalSnowball - ratePer;
//     //     // console.log()
//     //     blance = blance - sem;
//     //     console.log(parseFloat(blance).toFixed(2));
//     //     ratePer = parseFloat((blance * rate)/12).toFixed(2);
//     // }
//     // console.log(arr);
// }
    
// // Snowbal - amount we can spare
// // Rate-per - interest rate for the remaining amount

// // (balance, amount, snowball, remainingSnowball, rate)

// // const data = calculateMonth(3200, 30,230,230,9.81)


    
    
    



