document.addEventListener('DOMContentLoaded', () => {

  const table = document.querySelector('#table-body')
  const winnerHeader = document.querySelector('#winner')
  const URL = 'http://localhost:3000/a_cappella_groups'

  fetchGroups();

  table.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      if (winnerHeader.dataset.id) {
        let winner = table.querySelector(`[data-id='${winnerHeader.dataset.id}']`)
        winner.style.display = ""
        console.log(winner);
      }
      let winner = table.querySelector(`[data-id='${e.target.dataset.id}']`)
      winner.style.display = "none"
      winnerHeader.innerText = `Winner: ${winner.children[0].innerText} ${winner.children[1].innerText}`
      winnerHeader.dataset.id = winner.dataset.id
    }

    if (e.target.innerText === "Delete") {
      let group = table.querySelector(`[data-id='${e.target.dataset.id}']`)
      group.remove()
    }
  })

  function fetchGroups() {
    fetch(URL)
      .then(r => r.json())
      .then(groups => {
        renderAllGroups(groups)
      })
  }

  function renderGroup(group) {
    return `
      <tr data-id=${group.id}>
        <td data-college="${group.college.name}">${group.college.name}</td>
        <td data-name="${group.name}">${group.name}</td> <td>${group.membership}</td>
        <td>${group.college.division}</td>
        <td><img src='./assets/trophy.png' data-id=${group.id}>
          <button data-id=${group.id}>Delete</button>
        </td>
      </tr>`
  }

  function renderAllGroups(groups) {
    table.innerHTML = groups.map(renderGroup).join('')
  }

}) // end of DOMContentLoaded
