/*Development Page Javascript*/

/*toggle organization form on radio button*/
function toggleOrganization() {
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
}
/*toggle organization inputs when required*/
document.querySelectorAll('input[name="indOrOrg"]').forEach(item => {
    item.addEventListener('change', toggleOrganization)
});
//  




/*toggle bank inputs when required*/
function togglebank() {
    const orgtype = document.querySelectorAll('input[name="orgtype"]');  
    for (let item of orgtype) {
        if (item.checked && item.value === "bank") {    
            if (!document.querySelector('.abcd-form').classList.contains('.reveal-if-active')) {
                document.querySelector('.abcd-form').classList.add('.reveal-if-active');
                document.querySelector('.abcd-form').classList.remove('hidden');
            }
        } else if (item.checked && item.value === "investment company" ||item.checked && item.value === "family office" ||item.checked && item.value === "Not-for-profit" ||item.checked && item.value === "other") {
            if (document.querySelector('.abcd-form').classList.contains('.reveal-if-active')) {
                document.querySelector('.abcd-form').classList.remove('.reveal-if-active');
                document.querySelector('.abcd-form').classList.add('hidden');
            }
        }
    }
}



/*toggle Bank inputs when required*/
document.querySelectorAll('input[name="orgtype"]').forEach(item => {
    item.addEventListener('change', togglebank)
});

// } else if (item.checked && item.value === "investment company"||"family office"||"not-for-profit"||"foundation"||"Others") {