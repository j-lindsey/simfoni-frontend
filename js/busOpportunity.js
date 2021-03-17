/*create header*/
fetch('https://jsonplaceholder.typicode.com/albums/1')
    .then(response => response.json())
    .then(item => {
        let h1 = document.createElement('h1');
        let text = document.createTextNode(item.title);
        h1.appendChild(text);
        document.querySelector('header').appendChild(h1);
    })

/*fetching fake action items and populating to website*/
fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then(response => response.json())
    .then(actionItems => {
        for (let item of actionItems) {
            let li = document.createElement('li');
            let text = document.createTextNode(item.title);
            li.appendChild(text);
            document.querySelector('.actionItems').appendChild(li);
        }
    })

/*Generate details of opportunity*/
fetch('https://jsonplaceholder.typicode.com/comments/1')
    .then(response => response.json())
    .then(detail => {
        let p = document.createElement('p');
        let text = document.createTextNode(detail.body);
        p.appendChild(text);
        document.querySelector('.details').appendChild(p);
    })


/*Create embeded video on page will be changed later*/
function video(videolink) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', videolink);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('allow', 'clipboard-write');
    iframe.setAttribute('allow', 'encrypted-media');
    iframe.setAttribute('allow', 'gyroscope');
    iframe.setAttribute('allow', 'picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    document.querySelector('.video').appendChild(iframe);
}

video("https://www.youtube.com/embed/5polY4u0sRU");


