import { $, setupFilterDropdown } from './utils/index.js'

const endDateInput = $('#enddate');
const statusSelect = $('#status');

statusSelect.addEventListener('change', () => {
  if (statusSelect.value === 'Releasing') {
    endDateInput.disabled = true;
    endDateInput.value = '';
  } else {
    endDateInput.disabled = false;
  }
})



const staffInput = $('#staff');
setupFilterDropdown(staffInput, 'staff-buttons', 'memberid');



const rolesInput = $('#roles');
setupFilterDropdown(rolesInput, 'roles-buttons', 'roleid');



const addButton = $('form > div > button[type="button"]');
const assignedStaffRolesContainer = $('ul.assigned-staff-roles');
const staffHiddenInput = $('input[name="staff"]');

const assignments = [];

addButton.addEventListener('click', () => {
  staffInput.blur();
  rolesInput.blur();

  const staffId = staffInput.dataset.memberid;
  const roleId = rolesInput.dataset.roleid;

  if (staffId && roleId) {
    const entryLi = document.createElement('li');
    entryLi.textContent = `${staffInput.value} - ${rolesInput.value}`;
    entryLi.dataset.memberid = staffId;
    entryLi.dataset.roleid = roleId;

    assignments.push({ staffId: Number(staffId), roleId: Number(roleId) });
    staffHiddenInput.value = JSON.stringify(assignments);

    assignedStaffRolesContainer.appendChild(entryLi);
  }

  staffInput.value = '';    staffInput.dataset.memberid = '';
  rolesInput.value = '';    rolesInput.dataset.roleid = '';
});



document.addEventListener('DOMContentLoaded', () => {
  staffHiddenInput.value = '';
});