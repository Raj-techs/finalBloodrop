import React from 'react'
// import '../../../src/App.css'

const NavGov = () => {
    const listItems = document.querySelectorAll('.list-1'); // Select all list-1 elements

    listItems.forEach(listItem => {
      const submenu = listItem.nextElementSibling; // Get the corresponding submenu

      listItem.addEventListener('click', () => {
        listItems.forEach(otherDiv => otherDiv.classList.remove('selected', 'active')); // Reset all divs (list-1 and submenu)
        listItem.classList.add('selected'); // Visually indicate clicked list-1
        submenu.classList.toggle('active'); // Toggle submenu visibility
      });
    });
    
  return (
    <>
      <div class="menu">
    <div class="list-1">Dashboard</div>
    <div class="submenu">
      <ul>
        <li>Content 1</li>
        <li>Content 2</li>
        </ul>
    </div>

    <div class="list-1">Requests</div>
    <div class="submenu">
      <ul>
        <li>Users</li>
        <li>Donars</li>
        <li>Banks</li>
      </ul>
    </div>

    <div class="list-1">Transfer</div>
    <div class="submenu">
      <ul>
        <li>Users</li>
        <li>Donars</li>
        <li>Banks</li>
      </ul>
    </div>

    <div class="list-1">Total Banks</div>
    <div class="submenu">
      <ul>
        <li>Gov</li>
        <li>Private</li>
        <li>Red Cross</li>
      </ul>
    </div>
  </div>
    </>
  )
}

export default NavGov
