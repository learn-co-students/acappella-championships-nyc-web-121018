url = 'http://localhost:3000/a_cappella_groups'
allGroups = []
document.addEventListener("DOMContentLoaded", e => {
  const tableBody = document.querySelector('#table-body')
  const winnerTitle = document.querySelector('#winner')
  const tableTr = document.querySelector('#table-tr')

  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    allGroups = data
    tableBody.innerHTML = allGroups.map(g => addHTMLForGroup(g)).join('')
  })

  tableBody.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      let clickedId = e.target.dataset.id
      let clickedGroup = allGroups.find(g => g.id === parseInt(clickedId))
      if (winnerTitle.innerText.includes('Winner')) {
        const newGroups = allGroups.filter(g => g !== clickedGroup);
        tableBody.innerHTML = newGroups.map(g => addHTMLForGroup(g)).join('')
      }
      winnerTitle.innerHTML = `
      <div class="padding margin border-round border-grey">
        <h2 class="padding yellow border-round">
          Winner: ${clickedGroup.name}
        </h2>
      </div>
      `
      e.target.parentElement.parentElement.remove()
    }
    if (e.target.tagName === 'BUTTON') {
      let clickedId = e.target.dataset.id
      let clickedGroup = allGroups.find(g => g.id === parseInt(clickedId))
      let clickedGroupIndex = allGroups.indexOf(clickedGroup)
      allGroups.splice(clickedGroupIndex, clickedGroupIndex+1)
      e.target.parentElement.parentElement.remove()
    }
  })//end of body listener

  tableTr.addEventListener('click', e => {
    if (e.target.innerHTML === 'College') {
      sortedGroups = allGroups.sort(sortByNestedAttributes('college', 'name'))
      tableBody.innerHTML = sortedGroups.map(g => addHTMLForGroup(g)).join('')
    }
    if (e.target.innerHTML === 'Group Name') {
      sortedGroups = allGroups.sort(sortByAttribute('name'))
      tableBody.innerHTML = sortedGroups.map(g => addHTMLForGroup(g)).join('')
    }
    if (e.target.innerHTML === 'Membership') {
      sortedGroups = allGroups.sort(sortByAttribute('name'))
      tableBody.innerHTML = sortedGroups.map(g => addHTMLForGroup(g)).join('')
    }
    if (e.target.innerHTML === 'Division') {
      sortedGroups = allGroups.sort(sortByNestedAttributes('college', 'division'))
      tableBody.innerHTML = sortedGroups.map(g => addHTMLForGroup(g)).join('')
    }
  })
})//end of DOM loaded listener

const sortByAttribute = function (attribute) {
  return function (x, y) {
      return ((x[attribute] === y[attribute]) ? 0 : ((x[attribute] > y[attribute]) ? 1 : -1));
  };
};

const sortByNestedAttributes = function (attr1, attr2) {
  return function (x, y) {
      return ((x[attr1][attr2] === y[attr1][attr2]) ? 0 : ((x[attr1][attr2] > y[attr1][attr2]) ? 1 : -1));
  };
};

function addHTMLForGroup(group) {
  return `
  <tr>
    <td>${group.college.name}</td>
    <td>${group.name}</td>
    <td>${group.membership}</td>
    <td>${group.college.division}</td>
    <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
    <td><button data-id='${group.id}' type="button" name="delete">DELETE</button></td>
  </tr>
  `
}
