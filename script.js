let dayLabel = document.getElementById("day-label");
let monthLabel = document.getElementById("month-label");
let yearLabel = document.getElementById("year-label");
let label = document.querySelector("label");

let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");

let submit = document.getElementById("arrow-btn");
let result = document.getElementById('results');

// Errors
let emptyDay = document.getElementById('day-empty');
let invalidDay = document.getElementById('day-invalid');
let emptyMonth = document.getElementById('month-empty');
let invalidMonth = document.getElementById('month-invalid');
let emptyYear = document.getElementById('year-empty');
let invalidYear = document.getElementById('year-invalid');

let emptyErrorsArray = [emptyDay, emptyMonth, emptyYear];
let labelsArray = [dayLabel, monthLabel, yearLabel];
let invalidsArray = [invalidDay, invalidMonth, invalidYear];


//Dates
let today = new Date();
let day = 0;
let month = 0;
let year = 0;
let finalDay = 0;
let finalMonth = 0;
let finalYear = 0;


function checkEmptyFields(){
    //Clear some errors
    let emptyErrors = true;
    if(dayInput.value == ""){
        dayLabel.classList.add("has-error");
        emptyDay.style.display = 'block';
        emptyErrors = false;
    }
    if(monthInput.value == ""){
        monthLabel.classList.add("has-error");
        emptyMonth.style.display = 'block';
        emptyErrors = false;
    }
    if(yearInput.value == ""){
        yearLabel.classList.add("has-error");
        emptyYear.style.display = 'block';
        emptyErrors = false;
    }

    return emptyErrors;

}

function checkString(){
    
    let isLeapYear = false;
    let emptyInvalids = true;
    if(!isNaN(yearInput.value) && yearInput.value !="" && yearInput.value <= today.getFullYear() && yearInput.value.length > 3){
        if(yearInput.value % 4 == 0){
            isLeapYear = true;
        }
        year = yearInput.value;
    }else {
    yearLabel.classList.add("has-error");
    invalidYear.style.display = 'block';
    emptyInvalids = false;
    }
   
   
    if(!isNaN(monthInput.value) && monthInput.value !="" && monthInput.value <= 12){
        month = monthInput.value -1;
        switch (Number(monthInput.value)){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if(dayInput.value > 31){
                    dayLabel.classList.add("has-error");
                    invalidDay.style.display = 'block';
                    emptyInvalids = false;
                } 
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if(dayInput.value > 30){
                    dayLabel.classList.add("has-error");
                    invalidDay.style.display = 'block';
                    emptyInvalids = false;
                }
                break;
            default: 
              

                if(isLeapYear && dayInput.value > 29){
                    dayLabel.classList.add("has-error");
                     invalidDay.style.display = 'block';
                     invalidDay.innerText = 'Days cannot be more than 29';
                     emptyInvalids = false;
                }
                 if(!isLeapYear && dayInput.value > 28) {
                    dayLabel.classList.add("has-error");
                    invalidDay.style.display = 'block';
                    invalidDay.innerText = 'Days cannot be more than 28';
                    emptyInvalids = false;
                }
                break;
        }
           
    }else {
        monthLabel.classList.add("has-error");
        invalidMonth.style.display = 'block';
        emptyInvalids = false;
    }

    if(!isNaN(dayInput.value) && dayInput.value !="" && dayInput.value <=31){
       
        day = dayInput.value;
    } else {
        dayLabel.classList.add("has-error");
        invalidDay.style.display = 'block';
        emptyInvalids = false;
    }
    
        return emptyInvalids;
}
function calculateAge(){
    let birthDay = new Date(year, month, day);
    let age = today - birthDay;
    let ageInDays = age/(1000 * 60 * 60 * 24);
    let ageInYears = Math.floor(ageInDays/365.25);
    let avgDays = 30.437;
    let remainingDays = ageInDays%365.25;
    
    finalYear = ageInYears;
    if(remainingDays > 30){
        finalMonth = Math.floor(remainingDays/avgDays);
        finalDay = Math.floor(remainingDays%avgDays);
      }else {
        finalDay = Math.floor(remainingDays)
      }


}
function updatePage(){
    result.innerHTML = `<h2><span>${finalYear}</span> years</h2>
    <h2><span>${finalMonth}</span> months</h2>
    <h2><span>${finalDay}</span> days</h2>`;
}


submit.onclick = function(){
    
    for(let error of emptyErrorsArray){
        error.style.display = "none";
    }
    for(let label of labelsArray){
        label.classList.remove('has-error')
    }
    for(let invalidInput of invalidsArray){
        invalidInput.style.display = "none";
    }
    checkEmptyFields();

   
    if(checkEmptyFields()){
        checkString();
        if(checkString()){
            calculateAge();
            updatePage();
        }
    }
    
    
}

submit.onmousedown = function(){
    submit.style.backgroundColor = "hsl(0, 0%, 8%)";
}
submit.onmouseup = function(){
    submit.style.backgroundColor = "hsl(259, 100%, 65%)";
}