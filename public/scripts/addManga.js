import { $, setupFilterDropdown } from './utils/index.js'

const startDateInput = $('#startdate');
const endDateInput = $('#enddate');
const statusSelect = $('#status');

statusSelect.addEventListener('change', () => {
  if (statusSelect.value === 'Releasing' || statusSelect.value === 'Hiatus') {
    endDateInput.disabled = true;
    endDateInput.value = '';
  } else {
    endDateInput.disabled = false;
  }
});

startDateInput.addEventListener('change', () => {
  endDateInput.min = startDateInput.value;
});

endDateInput.addEventListener('change', () => {
  startDateInput.max = endDateInput.value;
});



const staffInput = $('#staff');
setupFilterDropdown(staffInput, 'staff-buttons', 'memberid');



const rolesInput = $('#roles');
setupFilterDropdown(rolesInput, 'roles-buttons', 'roleid');



const addStaffRole = $('.add-staff-role');
const assignedStaffRolesContainer = $('ul.assigned-staff-roles');
const staffHiddenInput = $('input[name="staff"]');

const staffRoleAssignments = [];

addStaffRole.addEventListener('click', () => {
  staffInput.blur();
  rolesInput.blur();

  const staffId = staffInput.dataset.memberid;
  const roleId = rolesInput.dataset.roleid;

  if (staffId && roleId) {
    const entryLi = document.createElement('li');
    entryLi.textContent = `${staffInput.value} - ${rolesInput.value}`;
    entryLi.dataset.memberid = staffId;
    entryLi.dataset.roleid = roleId;

    staffRoleAssignments.push({ staffId: Number(staffId), roleId: Number(roleId) });
    staffHiddenInput.value = JSON.stringify(staffRoleAssignments);

    assignedStaffRolesContainer.appendChild(entryLi);
  }

  staffInput.value = '';    staffInput.dataset.memberid = '';
  rolesInput.value = '';    rolesInput.dataset.roleid = '';
});



const genreInput = $('#genres');
setupFilterDropdown(genreInput, 'genres-buttons', 'genreid');

const addGenre = $('.add-genre');
const assignedGenresContainer = $('.assigned-genres');
const genreHiddenInput = $('input[name="genres"]');

const genresAssignments = [];

addGenre.addEventListener('click', () => {
  genreInput.blur();

  const genreId = genreInput.dataset.genreid

  if (genreId) {
    const entryLi = document.createElement('li');
    entryLi.textContent = genreInput.value;
    entryLi.dataset.genreid = genreId;

    genresAssignments.push({ genreId: Number(genreId)});
    genreHiddenInput.value = JSON.stringify(genresAssignments);

    assignedGenresContainer.appendChild(entryLi);
  }

  genreInput.value = '';
  genreInput.dataset.genreid = '';
});



document.addEventListener('DOMContentLoaded', () => {
  staffHiddenInput.value = '';
  genreHiddenInput.value = '';
});