const $ = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.log(error)
  }
};

const setupFilterDropdown = (input, containerClass, dataId) => {
  const buttonsContainer = $(`div.${containerClass}`);
  const buttons = document.querySelectorAll(`.${containerClass} > button`);
  
  input.addEventListener('focus', () => {
    buttonsContainer.style.display = 'block';
  });

  input.addEventListener('blur', () => {
    buttonsContainer.style.display = 'none';

    const id = input.dataset[dataId];
    if (!id) {
      input.value = '';
    } else if (id) {
      const selectedButton = [...buttons].find(btn => btn.dataset[dataId] === id);
      input.value = selectedButton.textContent;
    }
  });

  input.addEventListener('input', () => {
    const items = [...buttons].map(btn => ({
      id: btn.getAttribute(`data-${dataId}`),
      title: btn.textContent,
    }));
    const query = input.value.toLowerCase();
    const filteredItems = items.filter(item => {
      return item.title.toLowerCase().includes(query);
    });
    buttonsContainer.replaceChildren(
      ...filteredItems.map(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item.title;
        button.dataset[dataId] = item.id;
        button.addEventListener('mousedown', () => {
          input.value = button.textContent;
          input.dataset[dataId] = button.dataset[dataId];
        });
        return button;
      })
    );
  });

  buttons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      input.value = btn.textContent;
      input.dataset[dataId] = btn.dataset[dataId];
    });
  });
}
  
export { $, setupFilterDropdown }