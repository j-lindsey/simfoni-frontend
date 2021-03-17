/*Entrepreneur Registration Page Javascript*/

/*toggle organization form on radio button*/
/*function toggleOrganization() {
    const org = document.querySelectorAll('input[name="indOrOrg"]');
    for (let item of org) {
        if (item.checked && item.value === "organization") {
            if (!document.querySelector('.organization-form').classList.contains('.reveal-if-active')) {
                document.querySelector('.organization-form').classList.add('.reveal-if-active');
                document.querySelector('.organization-form').classList.remove('hidden');
            }
        } else if (item.checked && item.value === "individual") {
            if (document.querySelector('.organization-form').classList.contains('.reveal-if-active')) {
                document.querySelector('.organization-form').classList.remove('.reveal-if-active');
                document.querySelector('.organization-form').classList.add('hidden');
            }
        }
    }
}*/
/*toggle organization inputs when required*/
/*document.querySelectorAll('input[name="indOrOrg"]').forEach(item => {
    item.addEventListener('change', toggleOrganization)
});*/

/*submit information on form to database/Simfoni*/
document.querySelector('.submitEnt').addEventListener('click', submitEnt);


function submitEnt() {
    /*collect info into javascript object*/
    let entSubmission = document.getElementById('entForm');
    let entData = new FormData(entSubmission);
    let entObj = {};
    /*converts formdata to javascript object*/
    entData.forEach((value, key) => { entObj[key] = value });
    /*create array of checked submission needs and add to object*/
    let subNeeds = document.getElementsByName('subNeeds');
    let subNeedArr = [];
    for (let item of subNeeds) {
        if (item.checked) {
            subNeedArr.push(item.id);
        }
    }
    entObj.subNeeds = subNeedArr;
    
    /*resets all form fields*/
    entSubmission.reset();
    /*hide form field and display thank you.*/
    document.querySelector('.confirm').classList.remove('hidden');
    document.querySelector('#entForm').classList.add('hidden');
}

/*to enter a new form submission*/
document.querySelector(".anotherSub").addEventListener('click', openForm);

/*hides response and unhides form*/
function openForm() {
    document.querySelector('.confirm').classList.add('hidden');
    document.querySelector('#entForm').classList.remove('hidden');
}