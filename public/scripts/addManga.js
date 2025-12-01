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
const addStaffDialog = $('#add-staff-dialog');
setupFilterDropdown(staffInput, addStaffDialog, 'staff-buttons', 'memberid');



const rolesInput = $('#roles');
const addRolesDialog = $('#add-roles-dialog');
setupFilterDropdown(rolesInput, addRolesDialog, 'roles-buttons', 'roleid');



const addStaffRole = $('.add-staff-role');
const assignedStaffRolesContainer = $('ul.assigned-staff-roles');
const staffHiddenInput = $('input[name="staff"]');

const staffRoles = [...assignedStaffRolesContainer.children].map(li => {
  const button = li.querySelector('button');
  button.addEventListener('click', () => {
    assignedStaffRolesContainer.removeChild(li);
    const index = staffRoleAssignments.findIndex(assignment => assignment.staffId === Number(li.dataset.memberid) && assignment.roleId === Number(li.dataset.roleid));
    staffRoleAssignments.splice(index, 1);
    staffHiddenInput.value = JSON.stringify(staffRoleAssignments);
  });
  return {
    staffId: Number(li.dataset.memberid),
    roleId: Number(li.dataset.roleid),
  };
});
const staffRoleAssignments = staffRoles.length ? [...staffRoles] : [];
staffHiddenInput.value = staffRoles.length ? JSON.stringify(staffRoles) : '';

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

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'X';
    entryLi.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      assignedStaffRolesContainer.removeChild(entryLi);
      const index = staffRoleAssignments.findIndex(assignment => assignment.staffId === Number(staffId) && assignment.roleId === Number(roleId));
      staffRoleAssignments.splice(index, 1);
      staffHiddenInput.value = JSON.stringify(staffRoleAssignments);
    });

    staffRoleAssignments.push({ staffId: Number(staffId), roleId: Number(roleId) });
    staffHiddenInput.value = JSON.stringify(staffRoleAssignments);

    assignedStaffRolesContainer.appendChild(entryLi);
  }

  staffInput.value = '';    staffInput.dataset.memberid = '';
  rolesInput.value = '';    rolesInput.dataset.roleid = '';
});



const genreInput = $('#genres');
const addGenresDialog = $('#add-genres-dialog');
setupFilterDropdown(genreInput, addGenresDialog, 'genres-buttons', 'genreid');

const addGenre = $('.add-genre');
const assignedGenresContainer = $('.assigned-genres');
const genreHiddenInput = $('input[name="genres"]');

const genres = [...assignedGenresContainer.children].map(li => {
  const button = li.querySelector('button');
  button.addEventListener('click', () => {
    assignedGenresContainer.removeChild(li);
    const index = genresAssignments.findIndex(assignment => assignment.genreId === Number(li.dataset.genreid));
    genresAssignments.splice(index, 1);
    genreHiddenInput.value = JSON.stringify(genresAssignments);
  });
  return {
    genreId: Number(li.dataset.genreid),
  };
});
const genresAssignments = genres.length ? [...genres] : [];
genreHiddenInput.value = genres.length ? JSON.stringify(genres) : '';

addGenre.addEventListener('click', () => {
  genreInput.blur();

  const genreId = genreInput.dataset.genreid

  if (genreId) {
    const entryLi = document.createElement('li');
    entryLi.textContent = genreInput.value;
    entryLi.dataset.genreid = genreId;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'X';

    entryLi.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      assignedGenresContainer.removeChild(entryLi);
      const index = genresAssignments.findIndex(assignment => assignment.genreId === Number(genreId));
      genresAssignments.splice(index, 1);
      genreHiddenInput.value = JSON.stringify(genresAssignments);
    });

    genresAssignments.push({ genreId: Number(genreId)});
    genreHiddenInput.value = JSON.stringify(genresAssignments);

    assignedGenresContainer.appendChild(entryLi);
  }

  genreInput.value = '';
  genreInput.dataset.genreid = '';
});



document.addEventListener('DOMContentLoaded', () => {
  if (!staffHiddenInput.value) {
    staffHiddenInput.value = staffRoleAssignments.length ? JSON.stringify(staffRoleAssignments) : '';
  }
  if (!genreHiddenInput.value) {
    genreHiddenInput.value = genresAssignments.length ? JSON.stringify(genresAssignments) : '';
  }

  const currentUrl = window.location.pathname;
  const redirectStaffInput = $('#redirect-staff');
  const redirectRolesInput = $('#redirect-roles');
  const redirectGenresInput = $('#redirect-genres');
  
  if (redirectStaffInput) redirectStaffInput.value = currentUrl;
  if (redirectRolesInput) redirectRolesInput.value = currentUrl;
  if (redirectGenresInput) redirectGenresInput.value = currentUrl;
});