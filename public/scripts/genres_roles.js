import { $, setupDialog } from "./utils/index.js";



const addGenreBtn = $('#add-genre-btn');
const addGenresDialog = $('#add-genres-dialog');
setupDialog(addGenreBtn, addGenresDialog);

const addRoleBtn = $('#add-role-btn');
const addRolesDialog = $('#add-roles-dialog');
setupDialog(addRoleBtn, addRolesDialog);