const url = 'http://localhost:3000';


fetch(url + `/entrepreneur/3`)
    .then(response => response.json())
    .then(page => {
        let headertext = page.name;
        let h = document.createElement('h1');
        h.appendChild(document.createTextNode(headertext));
        document.querySelector('header').appendChild(h);
        page.content.forEach(item => {
            let containertype = document.querySelector(`.${item.type}`);
            containertype.insertAdjacentHTML('beforeend', item.content);
        })

    })


function submitType2Answer(button) {
    let answer = {
        contid: button.value,
        question: '',
        answer: '',
    };
    let label = document.querySelector(`.cont${answer.contid} .newCont label`);
    console.log(label);
    answer.question = label.textContent;

    let type = document.querySelector(`.cont${answer.contid} .newCont`).title;
    if (type === 'input_text') {
        answer.answer = document.querySelector(`.cont${answer.contid} .newCont input[type=text]`).value;
    } else if (type === 'textarea') {
        answer.answer = document.querySelector(`.cont${answer.contid} .newCont textarea`).value;
    } else if (type === 'radio') {
        answer.answer = document.querySelector(`.cont${answer.contid} .newCont input[type=radio]:checked`).value;
    } else if (type === 'checkbox') {
        let checkbox = document.querySelectorAll(`.cont${answer.contid} .newCont input[type=checkbox]:checked`);
        checkbox.forEach(item => {
            answer.answer += item.value + ', ';
        })
        answer.answer = answer.answer.substring(0, answer.answer.length - 2);;
    } else if (type === 'dropdown') {
        console.log(document.querySelector(`.cont${answer.contid} .newCont select`).value);
        answer.answer = document.querySelector(`.cont${answer.contid} .newCont select`).value;
    } else if (type === 'linearScale') {
        answer.answer = document.querySelector(`.cont${answer.contid} .newCont input[type=radio]:checked`).value;
    } else if (type === 'fileUpload') {
        let file = document.querySelector(`.cont${answer.contid} .newCont input[type=file]`);
        let formData = new FormData();
        formData.append(file.name, file.files[0]);
        console.log(formData);
        answer.answer = `file: ${file.name}`;
        fetch(url + '/entrepreneur/type2submitFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(msg => {
                console.log(msg)
                debugger;

            })

        console.log(answer);
    } else if (type === 'rankOrder') {
        let answers = document.querySelectorAll(`.cont${answer.contid} .newCont .rank`);
        answers.forEach(item => {
            let children = item.children;
            for (let i = 0; i < children.length; i += 2) {
                answer.answer += children[i].innerText + ": ";
                answer.answer += children[i + 1].value + ", ";
            }
        })
        answer.answer = answer.answer.substring(0, answer.answer.length - 2);;
        console.log(answer);
    }
    fetch(url + '/entrepreneur/type2submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
    }).then(response => response.json())
        .then(msg => console.log(msg))
        .then(() => location.reload())

}



function completeTask(checkbox) {
    let id = {
        id: checkbox.value
    };
    fetch(url + '/entrepreneur/completeTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }).then(response => response.json())
        .then(() => location.reload())
}

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
        if (element.nodeName === "BUTTON" && /type2Submit/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "type2Submit"
            submitType2Answer(element);
            break;
        }
        if (element.nodeName === "INPUT" && /completeTask/.test(element.name)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "type2Submit"
            completeTask(element);
            break;
        }

        element = element.parentNode;
    }
}