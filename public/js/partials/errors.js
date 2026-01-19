const errorsList = document.getElementById('errors');

if (errorsList) {
  const errors = errorsList.querySelectorAll('.error');
  
  errors.forEach(error => {
    error.addEventListener('animationend', () => {
      error.remove();
    });
  });
}

const errorsManager = {
  errorsUl: errorsList,
  errors: errorsList?.querySelectorAll('.error') || [],
};

export default errorsManager;