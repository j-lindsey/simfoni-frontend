//const { createPublicKey } = require("crypto");

/*url address*/
const url = "https://vast-sands-15850.herokuapp.com/";

function clearContent(imgcatalog1) {
  var div = document.getElementById(imgcatalog1);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
/*fetching career info from database*/
function selectCareers() {
  fetch(url + "/venture") //career
    .then((response) => response.json())
    .then((detail) => {
      //detail.recordsets.length = 0;
      console.log(detail);
      /*create div elements*/
      //while ((detail.recordset.length = 0)) {
      //if (recordset.value.length < 1) {

      for (var i = 0; i <= 3; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "grid-item");
        /*create image element*/
        let img = document.createElement("img");
        img.setAttribute(
          "src",
          `data:image/jpeg;base64, ${_arrayBufferToBase64(
            detail.recordset[i].CareerImage.data
          )}`
        );
        img.setAttribute("class", "img1");
        /*create button element*/
        let button = document.createElement("button");
        let text = document.createTextNode(detail.recordset[i].CareerName);
        //text.setAttribute("tag", "h2");
        button.appendChild(text);
        //button.setAttribute("class", "button", "onclick");
        //button.setAttribute(("onClick: href = www.google.com"));
        //button.setAttribute("onclick");
        div.appendChild(img);
        div.appendChild(button);
        /*add item to html container*/
        document.querySelector(".imgcatalog1").appendChild(div);
        //detail.recordset[i].CareerName = "";
      }
      //}
    });
}
/*fetching venture catalog info from database*/
/*if clicking in venture:*/
/*function selectVentures() {
  fetch(url + "/venture/venture")
    .then((response) => response.json())
    .then((detail) => {
      console.log(detail);
      /*create div elements*/
/*for (var i = 0; i <= 3; i++) {
  let div = document.createElement("div");
  div.setAttribute("class", "grid-item");
  /*create image element*/
/*let img = document.createElement("img");
img.setAttribute(
  "src",
  `data:image/jpeg;base64, ${_arrayBufferToBase64(
    detail.recordset[i].VentureImage.data
  )}`
);
img.setAttribute("class", "img1");
/*create button element*/
/*let button = document.createElement("button");
let text = document.createTextNode(detail.recordset[i].VentureName);
button.appendChild(text);
button.setAttribute("class", "cliktb"); //clas,cliktb
div.appendChild(img);
div.appendChild(button);
/*add item to html container*/
/*document.querySelector(".img-catalog3").appendChild(div);
}
});
}
/*fetching trade catalog info from database*/
/*if clicking in trades:*/
/*function selectSkills() {
  fetch(url + "/venture/skill")
    .then((response) => response.json())
    .then((detail) => {
      console.log(detail);
      /*create div elements*/
/*for (var i = 0; i <= 3; i++) {
  let div = document.createElement("div");
  div.setAttribute("class", "grid-item");
  /*create image element*/
/*let img = document.createElement("img");
img.setAttribute(
  "src",
  `data:image/jpeg;base64, ${_arrayBufferToBase64(
    detail.recordset[i].SkillImage.data
  )}`
);
img.setAttribute("class", "img1");
/*create button element*/
/*let button = document.createElement("button");
let text = document.createTextNode(detail.recordset[i].SkillName);
button.appendChild(text);
button.setAttribute("class", "cliktb");
div.appendChild(img);
div.appendChild(button);
/*add item to html container*/
/*document.querySelector(".img-catalog2").appendChild(div);
}
});
}

/*convert datatype to base 64 string for pictures*/
function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


/*same as entrepreneur.js*/

/*url address*/
//const url = "http://localhost:3000";

/*fetching venture catalog info from database*/
/*fetch(url + "/venture")
  .then((response) => response.json())
  .then((detail) => {
    /*create div element*/
/*let div = document.createElement("div");
    div.setAttribute("class", "grid-item");
    /*create image element*/

/*create title element*/
/* let title = document.createElement("title");
    title.setAttribute("tag", "<h1>");

    /*create button element*/
/*let button = document.createElement("button");
    let text = document.createTextNode(detail.recordset[0].Name);
    button.appendChild(text);
    button.setAttribute("class", "cliktb");
    div.appendChild(title);
    div.appendChild(button);

    /*add item to html container*/
/*document.querySelector(".title-business").appendChild(div);
    //console.log(detail);
  });

/*
        /*('src', `data:image/jpeg;base64, ${_arrayBufferToBase64(detail.recordset[0].Photo.data)}`);
        title.setAttribute('class', 'busName1');*/

/*let img = document.createElement('img');
        img.setAttribute('src', `data:image/jpeg;base64, ${_arrayBufferToBase64(detail.recordset[0].Photo.data)}`);
        img.setAttribute('class', 'img1');*/
/*create button element*/
/*let button = document.createElement('button');
        let text = document.createTextNode(detail.recordset[0].Name);
        button.appendChild(text);
        button.setAttribute('class', 'cliktb');
        div.appendChild(img);
        div.appendChild(button);
        /*add item to html container*/
/*document.querySelector('.img-catalog').appendChild(div);*/

/*convert datatype to base 64 string for pictures*/
/*function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}*/

/*event listener for search info*/
document.querySelector('.input').addEventListener('keypress', searchAfterKeypress);
document.querySelector('.searchbtn').addEventListener('click', searchAfterClick);

/*event listener for search info*/
function searchAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    searchDatabase();
  }
}
function searchAfterClick() {
  if (inputLength() > 0) {
    searchDatabase();;
  }
}

function inputLength() {
  return document.querySelector('.input').value.length;
}
/*search database and return search results*/
function searchDatabase() {
  /*retrieve search text*/
  let value = document.querySelector('.input').value
  let searchvalue = {
    search: value
  }
  fetch(url + '/venture/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchvalue)
  }).then(response => response.json())
    .then(results => {
      console.log(results);
    })
}

/*draggable events*/
/*on drag start save id using datatransfer object and change background color*/
function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

  event
    .currentTarget
    .style
    .backgroundColor = 'rgb(187, 187, 187,0.8)';
}
/*prevent default browser action on drag over*/
function onDragOver(event) {
  event.preventDefault();
}

/*on drop of element to dropzone*/
function onDrop(event) {
  /*obtain id from datatransfer object*/
  const id = event
    .dataTransfer
    .getData('text');

  /*select draggable element with id*/
  const draggableElement = document.getElementById(id);
  /*reset background color on drop*/
  draggableElement.style.backgroundColor = '';
  /*select dropzone element*/
  const dropzone = event.target;
  /*append element to dropzone*/
  dropzone.appendChild(draggableElement);
  /*reset datatransfer object*/
  event
    .dataTransfer
    .clearData();

}


