
 document.addEventListener("DOMContentLoaded", function(event) {

   let allCollege = []
   const tableBody = document.querySelector("#table-body")
   const tableHeader = document.querySelector('.blue') //table header
   const winner = document.getElementById('winner')
   const linkURL = 'http://localhost:3000/a_cappella_groups'

function showWinner(){
  tableBody.addEventListener('click', e => {
    if (e.target.className === 'button'){
      let foundGroup = allCollege.find (group =>{
        return parseInt (e.target.dataset.id) === group.id
      })
      winner.innerText = `Winner: ${foundGroup.college.name}, ${foundGroup.name}`
      }
      (e.target.parentElement.parentElement).remove()
  })
}
  getGroups()
  showWinner()

  function getGroups(){
       fetch (linkURL)
       .then( r => r.json())
       .then ( groups => {
        let groupHTML = groups.map (function (group){
          allCollege = groups
           return `<tr><td>${group.college.name}</td>
                       <td>${group.name}</td>
                       <td>${group.membership}</td>
                       <td>${group.college.division}</td>
                       <td><img src='./assets/trophy.png' data-id='${group.id}' class="button"/></td>

                       </tr>
                       </tr>`
         })
         tableBody.innerHTML = groupHTML.join("")
      })
    } // end getGroups

  })

  // });  // end DOMContentLoaded
