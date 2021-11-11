const title = document.querySelector('#title')
const post = document.querySelector('#post')
const btn = document.querySelector('.btn')
const card = document.querySelector('.card')
const footer = document.querySelector('footer')
// const cardTitle = document.querySelector('.card-header')
// const cardbody = document.querySelector('.card-body p')

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
            if (!localStorage.posts) {
                localStorage.posts = JSON.stringify([json])
                renderPosts([json])
            } else {
                let appendJson = JSON.parse(localStorage.posts)
                appendJson.push(json)
                localStorage.posts = JSON.stringify(appendJson)
                renderPosts(appendJson)
            }
        })
}



const posts = localStorage.posts ? JSON.parse(localStorage.posts) : []
renderPosts(posts)
btn.addEventListener('click', handlePost)

function renderPosts(data) {
    deletePosts(footer)
    // console.log(footer.children.length)
    data.map((body) => {
        const copyCard = card.cloneNode(true)
        copyCard.classList.remove('d-none')
        const cardTitle = copyCard.children[0]
        const cardbody = copyCard.children[1].children[0]
        cardTitle.innerText = body.title
        cardbody.innerText = body.body
        title.value = ''
        post.value = ''
        footer.append(copyCard)
    })
}

function deletePosts(parent) {
    if(parent.firstElementChild) {
        parent.removeChild(parent.firstElementChild)
        deletePosts(parent)
    }
}
