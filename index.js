const title = document.getElementById("title")
const body = document.getElementById("body")
const helpcategory = document.getElementById("helpcategory")
const sendhelpmessage = document.getElementById("sendhelpmessage")
const username = document.getElementById("username")
let savedusername = localStorage.getItem("name") || ""
let report = JSON.parse(localStorage.getItem("reports") || "[]")

const namee = document.getElementById("namee")
let setname = localStorage.getItem("nameisset")
if(setname == "false"){
    document.querySelector(".intro").style.display = "none"
    document.querySelector(".text").style.display = "flex"
} else{
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
})
const sendreport = () => {
    const reportformat = {
        title: title.value.trim(),
        body: body.value.trim(),
        helpcategory: helpcategory.value,
        id: Date.now()
    }

    report.unshift(reportformat)
    localStorage.setItem("reports", JSON.stringify(report))
}
sendhelpmessage.addEventListener("click", () => {
    sendreport()
    console.log(title.value)
    console.log(body.value)
})