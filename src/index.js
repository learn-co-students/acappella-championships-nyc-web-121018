let acapellaGroupURL = `http://localhost:3000/a_cappella_groups`
let acapellaGroups = []

document.addEventListener("DOMContentLoaded", function(event) {

  let tableBody = document.getElementById('table-body')
  fetch(acapellaGroupURL)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      acappellaGroups = data
      let groupsHTML = acappellaGroups.map(group => {
        return `
        <tr>
          <td>${group.college.name}</td>
          <td>${group.name}</td>
          <td>${group.membership}</td>
          <td>${group.college.division}</td>
          <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
        </tr>
        `
      }).join("")
      tableBody.innerHTML = groupsHTML
    })

  tableBody.addEventListener('click', e => {
    // console.log(buttonId);
    if (e.target.src){
      // console.log("I'm a pic");
      e.target.parentElement.parentElement.remove()
      let winnerHeadline = document.getElementById('winner')
      winnerHeadline.innerHTML = "Winner: " + e.target.parentElement.parentElement.children[0].innerText + " " + e.target.parentElement.parentElement.children[1].innerText
    }
  })
})//end of DOMContentLoaded
