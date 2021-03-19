/*url address*/
const url = "https://vast-sands-15850.herokuapp.com";

/*store selected buttons*/
let goals = [];
/*is user signed in*/
let isSignedIn = false;
/*if signed in user*/
let user = {
    id: 0,
}
let rankCount = 0;


if (window.location.href.indexOf("goal") > -1) {
    let pathArray = window.location.pathname.split('/');
    let lastvalue = pathArray[pathArray.length - 1];
    user.id = lastvalue;
    isSignedIn = true;
    fetch(url + `/goals/profile/${user.id}`)
        .then(response => response.json())
        .then(results => {
            renderGoals(results);
            document.querySelector('.signout').classList.remove('hidden');
        })
}

fetch(url + '/goals')
    .then(response => response.json())
    .then(filters => {
        console.log(filters);
        rankCount = filters.recordset[filters.recordset.length - 1].ObjectRank;
        let filterDOM = document.querySelector('.filters');
        filters.recordset.forEach(tag => {
            let button = createButton(tag);
            filterDOM.insertAdjacentElement('beforeEnd', button);
        })
    })

/*create button filter*/
function createButton(tag) {
    let button = document.createElement('button');
    button.appendChild(document.createTextNode(tag.ObjectName));
    button.setAttribute('value', tag.ObjectName);
    button.setAttribute('name', tag.TagName);
    button.setAttribute('class', 'filter');
    return button;
}


/*event listeners for filter buttons*/
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON" && /filter/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "type2Submit"
            addToGoal(element);
            break;
        }
        if (element.nodeName === "BUTTON" && /delete/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "type2Submit"
            deleteGoal(element.parentNode);
            break;
        }

        element = element.parentNode;
    }
}

function addToGoal(button) {
    //add css to indicate selected buttons
    document.querySelector(`button[value='${button.value}']`).classList.add('selected');
    let goal = button.value;
    goals.push(goal);
    let currentGoal = document.querySelector('.goal').value;
    document.querySelector('.goal').value = `${currentGoal} ${goal}`;
    updateFilters(button.name);
}

/*event listener for backspace button*/
document.querySelector('.backspace').addEventListener('click', backspace);

/*delete last element added to goals*/
function backspace() {
    let lastElement = goals[goals.length - 1];
    let n = lastElement.length;
    //remove css for selected button
    document.querySelector(`button[value='${lastElement}']`).classList.remove('selected');
    let currentGoal = document.querySelector('.goal').value;
    let goal = currentGoal.substring(0, currentGoal.length - (n + 1));
    document.querySelector('.goal').value = goal;
    goals.pop();
}

/*event listener for clear button*/
document.querySelector('.clear').addEventListener('click', clear);

/*clear selected buttons and goals*/
function clear() {
    document.querySelector('.goal').value = '';
    //remove selected css 
    for (item of goals) {
        document.querySelector(`button[value='${item}']`).classList.remove('selected');
    }
    goals = [];
    document.querySelector('.error').innerHTML = '';
    document.querySelector('.filters').innerHTML = '';
    fetch(url + '/goals')
        .then(response => response.json())
        .then(filters => {
            console.log(filters);
            rankCount = filters.recordset[filters.recordset.length - 1].ObjectRank;
            let filterDOM = document.querySelector('.filters');
            filters.recordset.forEach(tag => {
                let button = createButton(tag);
                filterDOM.insertAdjacentElement('beforeEnd', button);
            })
        })
}

/*for select event listener*/
document.querySelector('.select').addEventListener('click', addGoal);

/*add goal to database*/
function addGoal() {
    if (isSignedIn === true) {
        let goal = {
            id: user.id,
            goal: document.querySelector('.goal').value,
            objects: goals
        };

        fetch(url + '/goals/addGoal', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        })
            .then(response => response.json())
            .then(goals => {
                renderGoals(goals);
                clear();
            })

    } else {
        document.querySelector('.error').innerHTML = 'Please Log In/Register to save goals';
    }
}

function renderGoals(goals) {
    document.querySelector('.goals').innerHTML = '';
    goals.forEach(goal => {
        let div = document.createElement('div');
        let listitem = document.createElement('li');
        listitem.appendChild(document.createTextNode(goal.Goals));
        let button = '<button class="delete">x</button>';
        div.appendChild(listitem);
        div.insertAdjacentHTML('beforeend', button);
        document.querySelector('.goals').insertAdjacentElement('beforeend', div);
    })
}

/*change goal buttons as user selects*/
function updateFilters(tagName) {
    let buttons = document.querySelectorAll(`button[name='${tagName}']`);
    let length = buttons.length - 1;
    let nextValues = '';

    if (tagName === 'duration') {
        buttons = '';
    } else if (tagName === 'verb') {
        nextValues = 'subject';
    } else if (tagName === 'subject') {
        nextValues = 'conjunction';
    } else if (tagName === 'dollars') {
        nextValues = 'conjunction';
    } else if (tagName === 'conjunction') {
        nextValues = 'duration';
    }
    if (!(buttons === '')) {
        buttons.forEach(button => {
            if (!(button.classList.contains('selected'))) {
                let selected = document.querySelector(`button[value='${button.value}'`)
                selected.parentNode.removeChild(selected);
            }
        })
    }
    let newButtons = {
        nextValues: nextValues,
        length: length,
        rank: rankCount
    }
    fetch(url + '/goals/filterbuttons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newButtons)
    })
        .then(response => response.json())
        .then(filters => {
            let filterDOM = document.querySelector('.filters');
            filters.recordset.forEach(tag => {
                let button = createButton(tag);
                filterDOM.insertAdjacentElement('beforeEnd', button);
            })
        })
}


/*function to delete goal*/
function deleteGoal(goal) {
    let deletedGoal = {
        id: user.id,
        goal: goal.textContent.substring(0, goal.textContent.length - 1)
    };
    fetch(url + '/goals/deleteGoal', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletedGoal)
    }).then(response => response.json())
        .then(goals => {
            renderGoals(goals);
        })

}


/*eventlistener for signout*/
document.querySelector('.signout').addEventListener('click', signoutUser);

function signoutUser() {
    let signOutuser={
        id: user.id
    }
    console.log(user);
    user.id = 0;    
    isSignedIn = false;
    document.querySelector('.signout').classList.add('hidden');
    document.querySelector('.goals').innerHTML = '';
    // location.href = "../html/index.html";
    fetch(url + '/profile/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signOutuser)
    }).then(function(response) {
        if (response.redirected) {
          return window.location.replace(response.url);
        }
    });
}