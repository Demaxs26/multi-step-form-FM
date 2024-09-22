listStepForm = document.querySelectorAll(".formStep");
listStepRound = document.querySelectorAll(".nav-round");
btnUpStep = document.querySelectorAll(".btnUP");
listFirstStepField = document.querySelectorAll(".input-step-one");
listbtnDownStep = document.querySelectorAll(".btnDown");
btnSwitch = document.querySelector(".yeat-month-switch-block");
listPriceSelect = document.querySelectorAll(".price-text");
listTextDiscount = document.querySelectorAll(".yearlyDiscount");
switchButton = document.querySelector(".switch-button");
listTextButtonSwitch = document.querySelectorAll(".text-switch");
listPriceThree = document.querySelectorAll(".price-text-three");
listInputRadio = document.querySelectorAll(".input-step-two");
textType = document.querySelector(".text-place .titlt-text");
textPricetype = document.querySelector(".price-text-four-first");


let activeStep = 1;
const tabPrice =[["$9/mo","$90/yr"],["$12/mo","$120/yr"],["$15/mo","$150/yr"]]
const tabPriceThree =[["+$1/mo","+$10/yr"],["+$2/mo","+$20/yr"],["+$2/mo","+$20/yr"]];
let monthOrYear = 1;
let allAboutYearAndMonth = [["(Monthly)","(Yearly)"],["/mo","/yr"]];


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
        listPriceSelect[i].innerText = tabPrice[i][change];
        listPriceThree[i].innerText = tabPriceThree[i][change];
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

function f_get_values(number,field,display,location,addAfter){
    display.innerText = field[number].value + addAfter;
}

function f_displayData(){
    let index
    if(monthOrYear === 1){
        index = 0;
    }else{
        index = 1;
    }
    for (let i =0;i<3;i++){
        if (listInputRadio[i].checked === true){
            f_get_values(i,listInputRadio,textType,index,allAboutYearAndMonth[0][index]);
            f_get_values(i,tabPrice,textPricetype,index,"");
        }
    }
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
