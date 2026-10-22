let alert = document.getElementById('alert')
let errtitle = document.getElementById('errtitle')
let errbody = document.getElementById('errbody')
let currentpage = 'true'

let currentpageisfeed = [
    currentpage
]

let page = localStorage.getItem('currentpageisfeed')

document.addEventListener("DOMContentLoaded", () => {
    page = localStorage.getItem("currentpageisfeed");

    if (page === "post") {
        main.style.display = "block";
        ads.style.display = "flex";
        feed.style.display = "none";
        postlink.style.display = "none";
        feedlink.style.display = "flex";
    } else {
        main.style.display = "none";
        ads.style.display = "none";
        feed.style.display = "block";
        postlink.style.display = "flex";
        feedlink.style.display = "none";
    }
});

const body = document.getElementById("body")
// const helpcategory = document.getElementById("helpcategory")
const sendhelpmessage = document.getElementById("sendhelpmessage")
const username = document.getElementById("username")
let savedusername = localStorage.getItem("name") || ""
let report = JSON.parse(localStorage.getItem("reports") || "[]")
let feed = document.querySelector(".feed")

let postlink = document.getElementById("link-to-post")
let feedlink = document.getElementById("link-to-feed")
let main = document.querySelector("#main")
let ads = document.querySelector(".ads")

postlink.addEventListener("click", () => {
    main.style.display = 'block'
    ads.style.display = 'flex'
    feed.style.display = "none"
    postlink.style.display = 'none'
    feedlink.style.display = 'flex'

    currentpageisfeed[0] = 'false'
    localStorage.setItem("currentpageisfeed", "post");
    page = localStorage.getItem('currentpageisfeed')
    console.log(page)
    updatefeed()
})

feedlink.addEventListener("click", () => {
    main.style.display = 'none'
    ads.style.display = 'none'
    feed.style.display = "block"
    postlink.style.display = 'flex'
    feedlink.style.display = 'none'

    currentpageisfeed[0] = 'true'
    localStorage.setItem("currentpageisfeed", "feed");
    page = localStorage.getItem('currentpageisfeed')
    console.log(page)
    updatefeed()
})

const namee = document.getElementById("namee")
let setname = localStorage.getItem("nameisset")
if (setname == "false") {
    document.querySelector(".intro").style.display = "none"
    document.querySelector(".text").style.display = "flex"
} else {
    document.querySelector(".intro").style.display = "block"
    document.querySelector(".text").style.display = "none"
}
const saveuser = () => {
    const newUsername = username.value.trim()
    savedusername = newUsername
    localStorage.setItem("name", savedusername)
    namee.textContent = savedusername
}

namee.textContent += savedusername

document.getElementById("setname").addEventListener("click", () => {
    saveuser()
    //.intro, .text
    document.querySelector(".intro").style.display = "none"
    document.querySelector(".text").style.display = "flex"
    setname = "false"
    localStorage.setItem("nameisset", setname)
    updatefeed()
})
const sendreport = () => {
    const reportformat = {
        body: body.value.trim(),
        // Save the time so each post can show when it was written.
        createdAt: Date.now(),
        // helpcategory: helpcategory.value,
        // sentTo: "public",
        id: Date.now()
    }
    body.value = ""
    // helpcategory.value = "enquiry"

    report.unshift(reportformat)
    localStorage.setItem("reports", JSON.stringify(report))
}
sendhelpmessage.addEventListener("click", () => {

    if(body.value == ''){
        alert.style.display = 'flex'
        errtitle.textContent = "EMPTY POST"
        errbody.textContent = "Even a dot(.) works brr😒"
    } else{
    sendreport()
    page === 'feed'
    localStorage.setItem("currentpageisfeed", 'feed');
    console.log(localStorage.getItem('currentpageisfeed'))
    location.reload()
    console.log(body.value)
    }
})

// Close the alert when the user clicks its button or the dark backdrop.
const closeAlert = () => {
    alert.style.display = 'none'
}

document.getElementById('close-alert')?.addEventListener('click', closeAlert)
alert.addEventListener('click', (event) => {
    if (event.target === alert) closeAlert()
})

let feedbody = document.getElementById('feed')
let leg = JSON.parse(localStorage.getItem('reports') || '[]')
console.log(localStorage)

const getPostTime = (post) => {
    // Older posts use id as their timestamp.
    const timestamp = Number(post.createdAt || post.id)
    if (!timestamp || Number.isNaN(timestamp)) return 'just now'

    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago'
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago'

    return new Date(timestamp).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: timestamp < Date.now() - 31536000000 ? 'numeric' : undefined
    })
}

let updatefeed = () => {
    // Clear old cards before drawing the saved posts again.
    feedbody.replaceChildren()
    leg = JSON.parse(localStorage.getItem('reports') || '[]')

    leg.forEach(post => {
        const layout = document.createElement('div')
        layout.className = 'post-layout'

        const avatar = document.createElement('img')
        avatar.src = '/images/logo.png'
        avatar.alt = ''

        const userAndPost = document.createElement('div')
        userAndPost.className = 'user-and-post'

        const userName = document.createElement('span')
        userName.className = 'user-nd-name'

        const name = document.createElement('h5')
        name.textContent = localStorage.getItem('name') || ''

        const date = document.createElement('em')
        date.textContent = getPostTime(post)
        date.title = new Date(Number(post.createdAt || post.id) || Date.now()).toLocaleString()

        const postText = document.createElement('span')
        postText.className = 'post'
        const paragraph = document.createElement('p')
        paragraph.textContent = post.body || ''
        postText.appendChild(paragraph)

        userName.append(name, date)
        userAndPost.append(userName, postText)
        layout.append(avatar, userAndPost)
        feedbody.appendChild(layout)
    })
}

updatefeed()