let allGroups = []
let tableBody
let winner
let createGroupButton
let formDiv
let headerDiv
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

function apiCreate(college, groupName, membership, division) {
  fetch("http://localhost:3000/a_cappella_groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      college:{
        name: name
      },
      name: groupName,
      membership: membership,
      division: division,

    })
  })
  .then(function(r){
    return r.json
  })
}

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

function showTableItem(id){
    document.querySelector(`#table-row-${id}`).style.display = ""
}

function showWinner(id) {
  let g = getGroupById(id)
  winner.dataset.id = id
  winner.innerText = `Winner: ${g.name}`
}

function showForm(dataAction, college, groupName, membership, division) {
  formDiv.innerHTML +=
  `
  <form id="${dataAction}-form">
    <input id="${dataAction}-college" placeholder="College" value="">
    <input id="${dataAction}-groupName" placeholder="GroupName" value="">
    <input id="${dataAction}-membership" placeholder="Membership" value="">
    <input id="${dataAction}-division" placeholder="Division" value="">
    <button> Submit </button>
  </form>
  `
}

document.addEventListener('DOMContentLoaded', e =>{
  createGroupButton = document.querySelector("#create-group-button")
  tableBody = document.querySelector("#table-body")
  winner = document.querySelector("#winner")
  formDiv = document.querySelector("#form-div")
  headerDiv = document.querySelector("#form-div")
  apiFetch()

tableBody.addEventListener('click', function(e){

  document.querySelectorAll('.tb').style

  if (e.target.className === "crown-winner-image"){
    let currentDisplayedWinnerId = winner.dataset.id
    if (currentDisplayedWinnerId.length) {
      showTableItem(currentDisplayedWinnerId)
    }

    //
    id = e.target.dataset.id
    showWinner(id)
    document.querySelector(`#table-row-${id}`).style.display = "none"
  }

})

createGroupButton.addEventListener('click',function(e){
  console.log("you clicked create");

  if (formDiv.innerHTML.length){
    formDiv.innerHTML = ""
  }else{
    showForm("create", "","","","")
  }

}) // end of create toggle button listener

formDiv.addEventListener('submit',function(e){
  e.preventDefault()
  console.log("you are submitting");
  college = document.querySelector('#create-college').value
  groupName = document.querySelector('#create-groupName').value
  membership = document.querySelector('#create-membership').value
  division = document.querySelector('#create-division').value
  apiCreate(college, groupName, membership, division)
  // console.log(college, groupName, membership, division);
})






})//end of dom content loaded
