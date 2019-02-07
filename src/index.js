
const url = 'http://localhost:3000/a_cappella_groups'           // single URL for DRY purposes
let allGroups = []                                              // local variable set after first fetch

document.addEventListener("DOMContentLoaded", function(event) {
  const tableBody = document.getElementById('table-body')       // target HTML 'table-body'
  const winner = document.getElementById('winner')              // target HTML H2 'winner' id

  // fetch request to GET all A Cappella groups
  getACapppellaGroups(url)

  // listener for clicks on the table body
  tableBody.addEventListener('click', e => {

    // if the item clicked on has a src (aka image) proceed...
    if (e.target.src) {

      // if H2 text is longer than the original 'Winner:' than use this code
      if (winner.innerText.length > 8) {
        // find the new group clicked on
        let foundGroup = findGroup(e.target.dataset.id)
        // filter allGroups to exclude the new group selected
        let filteredGroups = allGroups.filter( group => {
          return group.id !== parseInt(e.target.dataset.id)
        })
        // update winner to show new group and updated table to show all groups except the new winner
        winner.innerText = `Winner: ${foundGroup.college.name} - ${foundGroup.name}`
        tableBody.innerHTML = createTableHTML(filteredGroups)
      } else {
        // find the winner that was selected
        let foundGroup = findGroup(e.target.dataset.id)
        // remove table row of selected winner from DOM
        e.target.parentElement.parentElement.remove()
        // add winner to the H2 'winner' element
        winner.innerText = `Winner: ${foundGroup.college.name} - ${foundGroup.name}`
      }
    } // end winner selection from clicking on trophy image

    if (e.target.type === 'button') {
      // find the winner that was selected
      let foundGroup = findGroup(e.target.dataset.id)
      // remove table row of selected winner from DOM
      e.target.parentElement.parentElement.remove()
      // fetch request to DELETE from DB
      deleteACapppellaGroup(url, e.target.dataset.id)
    }

  })

}) // end DOMContentLoaded

// ---------------- Fetch -----------------------------------------


function  getACapppellaGroups(url) {             // function to fetch all a cappella groups and render to DOM
  const tableBody = document.getElementById('table-body')
  fetch(url)
    .then(response => response.json())
    .then(groups => {
      allGroups = groups
      tableBody.innerHTML = createTableHTML(allGroups)
    })
}

function  deleteACapppellaGroup(url, id) {       // function to delete an a cappella group from local variable and DB
  fetch(url + `/${id}`, {
    method: "DELETE"
  })
}

// ---------------- Create table row HTML -------------------------

function createTableHTML(groups) {             // create HTML for all groups by mapping over local variable
  return groups.map(group => {
    return `<tr><td>${group.college.name}</td>
                <td>${group.name}</td>
                <td>${group.membership}</td>
                <td>${group.college.division}</td>
                <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
                <td><button type="button" data-id="${group.id}">Remove</button></td>
                </tr>`
  }).join("")
}

// ---------------- Helper functions -------------------------------

function findGroup(id) {                      // helper function to find group based on id of selected item
  return allGroups.find( group => { return group.id === parseInt(id)})
}
