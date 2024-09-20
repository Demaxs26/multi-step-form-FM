listStepForm = document.querySelectorAll(".formStep");
listStepRound = document.querySelectorAll(".nav-round");
btnUpStep = document.querySelectorAll(".btnUP");
listFirstStepField = document.querySelectorAll(".input-step-one");
let activeStep = 0


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


f_changeActiveStep(0);

for (let i = 0;i<btnUpStep.length;i++ ){
    btnUpStep[i].addEventListener("click", function(){
        if (!f_check_for_error(i)){
            f_changeActiveStep(1)
        }
     
    })
}

