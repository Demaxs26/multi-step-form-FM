const listStepForm = document.querySelectorAll(".formStep");
const listStepRound = document.querySelectorAll(".nav-round");
const btnUpStep = document.querySelectorAll(".btnUP");
const listFirstStepField = document.querySelectorAll(".input-step-one");
const listbtnDownStep = document.querySelectorAll(".btnDown");
const btnSwitch = document.querySelector(".yeat-month-switch-block");
const listPriceSelect = document.querySelectorAll(".price-text");
const listTextDiscount = document.querySelectorAll(".yearlyDiscount");
const switchButton = document.querySelector(".switch-button");
const listTextButtonSwitch = document.querySelectorAll(".text-switch");
const listPriceThree = document.querySelectorAll(".price-text-three");
const listInputRadio = document.querySelectorAll(".input-step-two");
const textType = document.querySelector(".text-place .titlt-text");
const textPricetype = document.querySelector(".price-text-four-first");
const listCheckbox = document.querySelectorAll(".checkbox");
const listDisplayTextChecbox = document.querySelectorAll(".additionnalStep .box-text-add .text-detail");
const listAddprice = document.querySelectorAll(".add-price");
const finalPriceText = document.querySelector(".TypeStep .text-detail");
const finalPrice =document.querySelector(".Total-price");
const btnchange =document.querySelector(".btnChange");
const btnSubmit = document.querySelector(".btnSubmit");

console.log(listDisplayTextChecbox)


let activeStep = 0;
const tabPrice =[["9","90"],["12","120"],["15","150"]]
const tabPriceThree =[["1","10"],["2","20"],["2","20"]];
let monthOrYear = 1;
const allAboutYearAndMonth = [["(Monthly)","(Yearly)"],["/mo","/yr"],["(Per month)","(Per year)"]];


function f_changeActiveStep(change){
    listStepRound[activeStep].classList.remove("round-active-step");
    listStepForm[activeStep].style.display = "none";
    activeStep += change;
    listStepRound[activeStep].classList.add("round-active-step");
    listStepForm[activeStep].style.display = "flex";
};

function f_field_error(field){
    field.classList.add("input-step-one-err");
    field.addEventListener("input",function(){
        f_field_NO_error(field);
    }, {once:true});
}

function f_field_NO_error(field){
    field.classList.remove("input-step-one-err");
}

function f_checkForNoValue(field,haveError){
    if (field.value ===""){
        f_field_error(field);
        return true
    }else if(haveError === true){
        return true
    }
    
}

function f_checkEmail(haveError){
    let regex = new RegExp("[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}");
    console.log(listFirstStepField[1])
    if (!regex.test(listFirstStepField[1].value)){
        f_field_error(listFirstStepField[1]);
        return true
    }else if(haveError){
        return true
    }
}

function f_check_for_error(step){
    let haveError =false;
    if (step === 0){
        for (let i =0; i<3;i++){
            haveError = f_checkForNoValue(listFirstStepField[i],haveError);
            
        }
        haveError = f_checkEmail(haveError)
        return haveError
    }else{

    }
}

function f_change_price(change){
    for(let i = 0;i<listPriceSelect.length;i++){
        listPriceSelect[i].innerText = "$" + tabPrice[i][change] + allAboutYearAndMonth[1][change];
        listPriceThree[i].innerText = "+$" + tabPriceThree[i][change] + allAboutYearAndMonth[1][change];
        if (change){
            listTextDiscount[i].innerText ="2 months free";
            switchButton.style.justifyContent = "end";
            listTextButtonSwitch[1].style.color = "var(--Marine-blue)"
            listTextButtonSwitch[0].style.color = "var(--Cool-gray)"
        }else{
            listTextDiscount[i].innerText ="";
            switchButton.style.justifyContent = "start";
            listTextButtonSwitch[1].style.color = "var(--Cool-gray)"
            listTextButtonSwitch[0].style.color = "var(--Marine-blue)"
        }
    }
}
function f_switchYearMonth(){
    monthOrYear = monthOrYear*-1;
    if (monthOrYear === -1 ){
        f_change_price(1);
    }else{
        f_change_price(0)
    }
}


function f_displayData(){
    let index;
    let totPrice =0;
    if(monthOrYear === 1){
        index = 0;
    }else{
        index = 1;
    }
    for (let i =0;i<3;i++){
        if (listInputRadio[i].checked === true){
            textType.innerText = listInputRadio[i].value + allAboutYearAndMonth[0][index];
            textPricetype.innerText = "$" + tabPrice[i][index] + allAboutYearAndMonth[1][index];
            totPrice = totPrice + parseInt(tabPrice[i][index]);
        }
    }
    for (let i = 0; i<3;i++){
        if (listCheckbox[i].checked === true){
            listDisplayTextChecbox[i].innerText = listCheckbox[i].value ;
            listAddprice[i].innerText = "+$"+tabPriceThree[i][index] + allAboutYearAndMonth[1][index];
            totPrice = totPrice + parseInt(tabPriceThree[i][index]);
        }
    }
    finalPriceText.innerText = "Total" + allAboutYearAndMonth[2][index];
    finalPrice.innerText = `+$${totPrice}${allAboutYearAndMonth[1][index]}`
}
f_changeActiveStep(0);

for (let i = 0;i<btnUpStep.length;i++ ){
    btnUpStep[i].addEventListener("click", function(){
        if (!f_check_for_error(i)){
            if (i === 2){
                f_displayData()
            }
            f_changeActiveStep(1)
        }

     
    })
}
for (let i =0;i<listbtnDownStep.length;i++){
    listbtnDownStep[i].addEventListener("click",function(){
        console.log("down");
        f_changeActiveStep(-1);
    })
}

btnSwitch.addEventListener("click", function(){
    f_switchYearMonth();
})

btnchange.addEventListener("click" ,function(){
    f_changeActiveStep(-2);
})

btnSubmit.addEventListener("click", function(){
    listStepForm[3].style.display = "none";
    listStepForm[4].style.display = "flex";
})