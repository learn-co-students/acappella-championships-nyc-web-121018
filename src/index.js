document.addEventListener("DOMContentLoaded", ()=> {

const groupContainer = document.querySelector("#table-body")
const winnerContainer = document.querySelector("#winner")
allGroups = []
const linkURL = "http://localhost:3000/a_cappella_groups"

fetch("http://localhost:3000/a_cappella_groups")
.then(r => r.json())
.then( groups => { let groupHTML = groups.map(function(group){
  allGroups = groups
return `
<tr><td id="college-name">${group.college.name}</td>
<td id="group-name">${group.name}</td>
<td>${group.membership}</td>
<td>${group.college.division}</td>
<td><img src='./assets/trophy.png' data-id=${group.id} class="trophy"/></td>
<td><button data-id=${group.id} class="delete-btn">Delete</button></td> </tr>

`
})//end of map
groupContainer.innerHTML = groupHTML.join('')
})//end of then

groupContainer.addEventListener("click", (e)=>{
  //console.log(e.target.className)
if (e.target.className === "trophy"){
//need to add to winnerContainer
let foundGroup = allGroups.find(group => {
    return parseInt(e.target.dataset.id) === group.id
  })
  //console.log(foundGroup.name, foundGroup.college.name)
winnerContainer.innerText = `Winner: ${foundGroup.college.name}, ${foundGroup.name}`
// //need to remove from the groupContainer
}
(e.target.parentElement.parentElement).remove()




})//end of groupContainer add event listener





})//end of DOMContentLoaded
