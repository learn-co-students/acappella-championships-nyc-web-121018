
const url = 'http://localhost:3000/a_cappella_groups'           // single URL for DRY purposes
let allGroups = []                                              // local variable set after first fetch
let sorted                                                      // sorted will hold sorted allGroups array for sort

document.addEventListener("DOMContentLoaded", function(event) {
  const tableBody = document.getElementById('table-body')       // target HTML 'table-body'
  const tableHeader = document.querySelector('.blue')
  const winner = document.getElementById('winner')              // target HTML H2 'winner' id

  // fetch request to GET all A Cappella groups
  getACapppellaGroups(url)

  // listener for clicks on the table body
  tableBody.addEventListener('click', e => {

    // if the item clicked on has a src (aka image) proceed...
    if (e.target.src) {
      // winner CSS may need to be reset if columns have been reformatted
      crownCss()
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

  tableHeader.addEventListener('click', e => {
    // if a user clicks on a table header the table will be sorted by that column
    switch(e.target.innerText) {
      // sort by college column
      case "College":
        winner.innerText = "Table sorted by: College (column)"
        changeCssStyle()
        sorted = sortByNestedColumn("college", "name")
        tableBody.innerHTML = createTableHTML(sorted)
        break;
      // sort by group name column
      case "Group Name":
        winner.innerText = "Table sorted by: Group Name (column)"
        changeCssStyle()
        sorted = sortByColumn("name")
        tableBody.innerHTML = createTableHTML(sorted)
        break;
      // sort by membership column
      case "Membership":
        winner.innerText = "Table sorted by: Membership (column)"
        changeCssStyle()
        sorted = sortByColumn("membership")
        tableBody.innerHTML = createTableHTML(sorted)
        break;
      //sort by division column
      case "Division":
        winner.innerText = "Table sorted by: Division (column)"
        changeCssStyle()
        sorted = sortByNestedColumn("college", "division")
        tableBody.innerHTML = createTableHTML(sorted)
        break;
      // let user know they cannot sort by last two columns
      default:
        winner.innerText = "Table cannot be sorted by 'Crown' or 'Remove'"
        winner.style.backgroundColor = "red"
        winner.style.color = "white"
    }
  })

}) // end DOMContentLoaded

// ---------------- Fetch -----------------------------------------


function  getACapppellaGroups(url) {             // function to fetch all a cappella groups and render to DOM
  const tableBody = document.getElementById("table-body")
  fetch(url)
    .then(response => response.json())
    .then(groups => {
      allGroups = groups
      tableBody.innerHTML = createTableHTML(allGroups)
    })
}

function  deleteACapppellaGroup(url, id) {       // function to delete an a cappella group from local variable and DB
  fetch(`${url}/${id}`, {
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

function sortByColumn(column) {              // Sort helper based on dealing with non-nested data structure items
  return allGroups.sort(function(a,b) {
    let sortA = a[column].toLowerCase()
    let sortB = b[column].toLowerCase()

    if (sortA < sortB) {
      return -1
    } else if (sortA > sortB){
      return 1
    }
      return 0
  })
}

function sortByNestedColumn(college, column) {  // Sort helper based on dealing with nested data structure items
  return allGroups.sort(function(a,b) {
    let sortA = a[college][column].toLowerCase()
    let sortB = b[college][column].toLowerCase()

    if (sortA < sortB) {
      return -1
    } else if (sortA > sortB){
      return 1
    }
      return 0
  })
}

function changeCssStyle() {       // helper to change CSS on DOM to alert user to changes
  winner.style.backgroundColor = "blue"
  winner.style.color = "white"
}

function crownCss() {
  winner.style.backgroundColor = "#FFD700"
}
