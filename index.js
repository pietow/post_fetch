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
        .then(completJSON)
        .then(storeJSON)
        .then(renderPosts)
}



const posts = localStorage.posts ? JSON.parse(localStorage.posts) : []
renderPosts(posts)
btn.addEventListener('click', handlePost)

// window.addEventListener('storage', e => {
//     console.log(e.key)
// })
// // localStorage.setItem('test', '123')
// window.dispatchEvent( new Event('storage') )


//##### FUNCTIONS #############
function completJSON(json) {
    return !localStorage.posts ? [json] : [...JSON.parse(localStorage.posts), json]
}

function storeJSON(data) {
    localStorage.posts = JSON.stringify(data)
    return data
}

function renderPosts(data) {
    deletePosts(footer)
    data.map((body) => {
        //### CREATING NODES
        const copyCard = card.cloneNode(true)
        copyCard.classList.remove('d-none')
        const cardTitle = copyCard.children[0]
        const cardbody = copyCard.children[1].children[0]
        console.log(copyCard)

        ///#### ASSIGNING TEXT AND RESETTING TEXT
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
