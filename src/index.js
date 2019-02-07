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

function apiEdit(college, groupName, membership, division, id) {
  fetch(`http://localhost:3000/a_cappella_groups/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      college:{
        name: college,
        division: division
      },
      name: groupName,
      membership: membership,
    })
  })
  .then(function(r){
    return r.json
  }).then(function(r){
    replaceTableItem(id)
    formDiv.innerHTML = ``

  })
}

function apiCreate(college, groupName, membership, division) {
  fetch("http://localhost:3000/a_cappella_groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      college:{
        name: college,
        division: division
      },
      name: groupName,
      membership: membership,
    })
  })
  .then(function(r){
    return r.json
  })
  .then(function(r){
    showGroupInDom(college, groupName, membership, division)
  })
}

function apiDelete(id) {
  fetch(`http://localhost:3000/a_cappella_groups/${id}`,{
    method: "DELETE"
  })
}

function showAllGroups() {
  for (let group of allGroups){
    tableBody.innerHTML +=
    `<tr class="tb" id="table-row-${group.id}"><td id="college-${group.id}">${group.college.name}</td>
     <td id="name-${group.id}">${group.name}</td>
      <td id="membership-${group.id}">${group.membership}</td>
       <td id="division-${group.id}">${group.college.division}</td>
        <td><img class="crown-winner-image" src='./assets/trophy.png' data-id='${group.id}'/>
            <button class="delete-button" data-id="${group.id}"> Delete </button>
            <button class="edit-button" data-id="${group.id}"> Edit </button>
        </td> </tr>
    `
  }
  console.log(allGroups)
}

function replaceTableItem(id){
  document.querySelector(`#table-row-${id}`).innerHTML =

  `<tr class="tb" id="table-row-${getTemporaryId()}"><td>${college}</td>
   <td>${groupName}</td>

     <td>${membership}</td>
     <td>${division}</td>
     <td><img class="crown-winner-image" src='./assets/trophy.png' data-id='${id}'/>
         <button class="delete-button" id="delete-${id}"> Delete </button>
         <button class="edit-button" data-id="${id}"> Edit </button>
     </td>  </tr>
  `
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

function showForm(dataAction, college, groupName, membership, division, id) {
  formDiv.innerHTML +=
  `
  <form data-id="${id}"  id="${dataAction}-form">
    <input id="${dataAction}-college" placeholder="College" value="${college}">
    <input id="${dataAction}-groupName" placeholder="GroupName" value="${groupName}">
    <input id="${dataAction}-membership" placeholder="Membership" value="${membership}">
    <input id="${dataAction}-division" placeholder="Division" value="${division}">
    <button> Submit </button>
  </form>
  `
}

function getTemporaryId(){
  lastGroup = allGroups.sort( thing => thing.id)[0]
  return lastGroup.id + 1
}

function showGroupInDom(college, groupName, membership, division) {
  tableBody.innerHTML +=
  `<tr class="tb" id="table-row-${getTemporaryId()}"><td>${college}</td>
   <td>${groupName}</td>

     <td>${membership}</td>
     <td>${division}</td>
     <td><img class="crown-winner-image" src='./assets/trophy.png' data-id='${getTemporaryId()}'/>
         <button class="delete-button" id="delete-${getTemporaryId()}"> Delete </button>
         <button class="edit-button" data-id="${getTemporaryId()}"> Edit </button>
     </td>  </tr>
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

  if (e.target.className === "delete-button"){

    id = e.target.dataset.id
    apiDelete(id)
    document.querySelector(`#table-row-${id}`).remove()

  }

  if (e.target.className === "edit-button"){

    id = e.target.dataset.id
    college = document.querySelector(`#college-${id}`).innerText
    groupName = document.querySelector(`#name-${id}`).innerText
    membership = document.querySelector(`#membership-${id}`).innerText
    division = document.querySelector(`#division-${id}`).innerText

    // console.log("edit", college, groupName, membership, division);
    showForm("edit", college, groupName, membership, division, id)

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
  if (e.target.id === "edit-form"){
    college = document.querySelector('#edit-college').value
    groupName = document.querySelector('#edit-groupName').value
    membership = document.querySelector('#edit-membership').value
    division = document.querySelector('#edit-division').value
    id = e.target.dataset.id
    apiEdit(college, groupName, membership, division, id)

  }
  if (e.target.id === "create-form"){
    console.log("you are submitting");
    college = document.querySelector('#create-college').value
    groupName = document.querySelector('#create-groupName').value
    membership = document.querySelector('#create-membership').value
    division = document.querySelector('#create-division').value

    apiCreate(college, groupName, membership, division)
  }




})






})//end of dom content loaded
