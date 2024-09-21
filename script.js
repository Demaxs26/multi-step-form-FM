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

let activeStep = 1
let tabPrice =[["$9/mo","$90/yr"],["$12/mo","$120/yr"],["$15/mo","$150/yr"]]
let monthOrYear = 1;


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
    console.log("remove");
    field.classList.remove("input-step-one-err");
}

function f_checkForNoValue(field){
    if (field.value ===""){
        f_field_error(field);
        return true
    }
    
}

function f_check_for_error(step){
    let haveError =false;
    if (step === 0){
        for (let i =0; i<3;i++){
            haveError = f_checkForNoValue(listFirstStepField[i]);
        }
        return haveError
    }else{

    }
}

function f_change_price(change){
    for(let i = 0;i<listPriceSelect.length;i++){
        listPriceSelect[i].innerText = tabPrice[i][change];
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

f_changeActiveStep(0);

for (let i = 0;i<btnUpStep.length;i++ ){
    btnUpStep[i].addEventListener("click", function(){
        if (!f_check_for_error(i)){
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
