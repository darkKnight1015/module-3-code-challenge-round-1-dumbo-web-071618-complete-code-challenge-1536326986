/ document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
// *** Used defer instead source tag of index.html file instead***


  let imageId = 3258 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const image = document.getElementById('image')
  const name = document.getElementById('name')
  const likeSpan = document.querySelector('#likes')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.querySelector('#comment_form')
  const commentInput = document.querySelector('#comment_input')
  const commentUl = document.getElementById('comments')

const renderImage = (data) => {
  image.src = data.url
}

const renderTitle = (data) => {
  name.innerText = data.name
}

const renderLikes = (data) => {
  likeSpan.innerText = data.like_count
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = commentInput.value 
  renderComments({content:input})
  commentInput.value = ""
  fetch(commentsURL, {
    method: 'POST', 
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: input
    })
  })
})

const renderComments = (comment) => {
  console.log(comment)
  let commentDiv = document.createElement('div')
  let commentLi = document.createElement('li')
    commentLi.innerText = comment.content
    commentDiv.append(commentLi)
    commentUl.append(commentDiv)
}

const fetchInitialImageData = () => {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    renderImage(data)
    renderTitle(data)
    renderLikes(data)
    data.comments.forEach(comment => {
      renderComments(comment)
    })
  })
}



const incrementCount = () => {
  likeSpan.innerText = ++likeSpan.innerText
  fetch(likeURL, {
    method: 'POST', 
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

likeButton.addEventListener('click', () => {
  incrementCount()

})




fetchInitialImageData()

  
  // ///////////
//*** If you want to be a little bit dryer you can make a boilerplate postFetch request */ 

  // const postFetch = (url, requestBody) => {
  //   return fetch(url, {
  //       method: 'POST', 
  //       headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         requestBody
  //       })
  //       .then(resp => resp.json())
  //       .then(console.log)
  //     })
  // }

  // inside of the eventListener you can write 
  // renderComments({content})
  // postFetch(commentsURL, {image_id, content})
