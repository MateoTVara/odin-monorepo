import { $ } from "../lib/utils.js";
import errorsManager from "../partials/errors.js";

class Form {
  /**
   * @param {HTMLElement} form
   * @param {HTMLElement} formSwitch
   */
  constructor(form, formSwitch) {
    this.form = form;
    this.formSwitch = formSwitch;
  }

  show() {
    this.form.classList.add("displayed");
  }

  hide() {
    this.form.classList.remove("displayed");
  }

  bindEvents() {
    this.formSwitch.addEventListener("click", e => {
      e.preventDefault();
      this.switchForm();
    });
  }

  switchForm() {
    if (this === loginForm) {
      this.hide();
      signUpForm.show();
      errorsManager.errorsUl.replaceChildren();
    } else {
      this.hide();
      loginForm.show();
      errorsManager.errorsUl.replaceChildren();
    }
  }
}

const loginForm = new Form(
  $(".form.login"), 
  $(".form.login > .actions > button[type='button']")
);

const signUpForm = new Form(
  $(".form.sign-up"),
  $(".form.sign-up > .actions > button[type='button']")
);

const init = () => {
  loginForm.bindEvents();
  signUpForm.bindEvents();
};

init();