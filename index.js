const title = document.querySelector('#title')
const post = document.querySelector('#post')
const btn = document.querySelector('.btn')
const card = document.querySelector('.card')
const footer = document.querySelector('footer')
// const cardTitle = document.querySelector('.card-header')
// const cardbody = document.querySelector('.card-body p')

async function handlePost() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/', {
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

        if (!response.ok) throw new Error(`Status is not ok`)
        let jsonObj = await response.json()
        let processedData = completJSON(jsonObj)
        let store = storeJSON(processedData)
        renderPosts(store)
    } catch(e) {
        alert(e.message)
    }

        
}

const posts = JSON.parse(localStorage.posts || '[]') 
renderPosts(posts)
btn.addEventListener('click', () => {
    handlePost()
})

//##### FUNCTIONS #############
function completJSON(json) {
    return value = [...JSON.parse(localStorage.posts || '[]'), json]  
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
