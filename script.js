const bind = (selector) => document.querySelector(selector)

const btnSubmit = bind("button");
const inputPassword = bind("#password");
const inputConfirmPassword = bind("#confirm_password");


btnSubmit.addEventListener("click", () => {
  const password = inputPassword.value;
  const confirmPassword = inputConfirmPassword.value;

  if (password != confirmPassword){
    inputPassword.setCustomValidity("Passwords does not match");
  } else {
    inputPassword.setCustomValidity("");
  }
})