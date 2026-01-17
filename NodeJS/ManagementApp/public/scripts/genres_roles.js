import { $, setupDialog } from "./utils/index.js";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.update-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plural = btn.dataset.plural;
      const id = btn.dataset.id;
      const value = btn.dataset.value;

      const dialog = document.getElementById(`update-${plural}-dialog`);
      if (!dialog) return;

      const form = dialog.querySelector('form');
      form.action = `/${plural}/${id}/update`;

      const input = dialog.querySelector(`#update-${plural}-value`);
      if (input) input.value = value || '';

      if (!dialog.dataset.backdropListener) {
        dialog.addEventListener('click', e => {
          if (e.target === dialog) dialog.close();
        });
        dialog.dataset.backdropListener = 'true';
      }

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', 'open');
      }
    });
  });

  const addGenreBtn = $('#add-genre-btn');
  const addGenresDialog = $('#add-genres-dialog');
  setupDialog(addGenreBtn, addGenresDialog);

  const addRoleBtn = $('#add-role-btn');
  const addRolesDialog = $('#add-roles-dialog');
  setupDialog(addRoleBtn, addRolesDialog);
});