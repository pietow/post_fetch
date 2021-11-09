const title = document.querySelector('#title')
const post = document.querySelector('#post')
const btn = document.querySelector('.btn')
const card = document.querySelector('.card')
const cardTitle = document.querySelector('.card-header')
const cardbody = document.querySelector('.card-body p')

function handlePost() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: post.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(json => {
            card.classList.remove('d-none')
            cardTitle.innerText = json.title
            cardbody.innerText = json.body
            title.value = ''
            post.value = ''
        })
}

btn.addEventListener('click', handlePost)
