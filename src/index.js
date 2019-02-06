let allGroups = []
let tableBody
let winner
function apiFetch() {
fetch("http://localhost:3000/a_cappella_groups")
.then(r => {
  return r.json()
})
.then(r => {
  allGroups = r
}).then(r => {
  showAllGroups()
})
}//end of apiFetch

function showAllGroups() {
  for (let group of allGroups){
    tableBody.innerHTML +=
    `<tr class="tb" id="table-row-${group.id}"><td>${group.college.name}</td>
     <td>${group.name}</td>
      <td>${group.membership}</td>
       <td>${group.college.division}</td>
        <td><img class="crown-winner-image" src='./assets/trophy.png' data-id='${group.id}'/></td> </tr>
    `
  }
  console.log(allGroups)
}

function getGroupById(id){
  foundGroup = allGroups.find(function(group){
    return group.id == id
  })
  return foundGroup
}

function showWinner(id) {
  let g = getGroupById(id)

  winner.innerText = `Winner: ${g.name}`
}

document.addEventListener('DOMContentLoaded', e =>{
  tableBody = document.querySelector("#table-body")
  winner = document.querySelector("#winner")
  apiFetch()

tableBody.addEventListener('click', function(e){

  document.querySelectorAll('.tb').style

  if (e.target.className === "crown-winner-image"){
    id = e.target.dataset.id
    showWinner(id)
    document.querySelector(`#table-row-${id}`).style.display = "none"
  }
})




})//end of dom content loaded
