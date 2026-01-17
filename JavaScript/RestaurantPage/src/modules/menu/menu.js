// menu.js

import "./menu.css";

class MenuItem {
  constructor(name, price, description = "") {
    this.name = name;
    this.price = Number(price);
    this.description = description;
  }

  render () {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");

    const textDiv = document.createElement("div");

    const itemH3 = document.createElement("h3");
    itemH3.textContent = this.name;

    textDiv.appendChild(itemH3);

    if (this.description) {
      const itemP = document.createElement("p");
      itemP.textContent = this.description;
      textDiv.appendChild(itemP);
    }

    const priceP = document.createElement("p");
    priceP.textContent = `$ ${this.price}`;

    itemDiv.append(textDiv, priceP)

    return itemDiv;
  }
}

class MenuCategory {
  constructor (title, emoji) {
    this.title = title;
    this.emoji = emoji;
    this.items = [];
  }

  addItem (name, price, description = "") {
    const item = new MenuItem(name, price, description);
    this.items.push(item);
  }

  render () {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("menu-category");

    const categoryH2 = document.createElement("h2");
    categoryH2.textContent = `${this.emoji} ${this.title}`;

    categoryDiv.appendChild(categoryH2);
    this.items.forEach(item => categoryDiv.appendChild(item.render()));

    return categoryDiv;
  }
}

const breakfastAndPastries = new MenuCategory("Breakfast & Pastries", "🥐");
breakfastAndPastries.addItem("Croissant", 2.50, "Flaky, buttery classic");
breakfastAndPastries.addItem("Pain au Chocolat", 3.00, "Croissant with rich chocolate");
breakfastAndPastries.addItem("Muffins", 2.25, "Blueberry, Chocolate Chip, Banana Nut");
breakfastAndPastries.addItem("Bagel with Cream Cheese", 2.00, "Plain, Sesame, or Everything");

const lightMeals = new MenuCategory("Light Meals", "🥗");
lightMeals.addItem("Quiche Lorraine", 6.50, "Egg, bacon, and cheese tart");
lightMeals.addItem("Ham & Cheese Sandwich", 5.50, "Served on fresh baguette");
lightMeals.addItem("Caprese Salad", 7.00, "Tomato, mozzarella, basil, balsamic drizzle");
lightMeals.addItem("Soup of the Day", 4.50, "Served with bread");

const hotDrinks = new MenuCategory("Hot Drinks", "☕");
hotDrinks.addItem("Espresso", 1.75);
hotDrinks.addItem("Americano", 2.25);
hotDrinks.addItem("Cappuccino", 3.25);
hotDrinks.addItem("Latte (vanilla, caramel, or plain)", 3.50);
hotDrinks.addItem("Hot Chocolate", 3.00);
hotDrinks.addItem("Chai Tea Latte", 3.25);

const coldDrinks = new MenuCategory("Cold Drinks", "🧊");
coldDrinks.addItem("Iced Coffee", 2.75);
coldDrinks.addItem("Iced Latte (vanilla, caramel, or mocha)", 3.50);
coldDrinks.addItem("Fresh Lemonade", 2.50);
coldDrinks.addItem("Iced Tea (black or green)", 2.25);
coldDrinks.addItem("Sparkling Water", 1.75);

const desserts = new MenuCategory("Desserts", "🍰");
desserts.addItem("Cheesecake (classic or berry topping)", 5.00);
desserts.addItem("Chocolate Cake", 5.50, "Rich, layered, decadent");
desserts.addItem("Tiramisu", 5.75, "Espresso-soaked sponge, mascarpone cream");
desserts.addItem("Fruit Tart", 4.75, "Seasonal fruits, custard filling");

const menuCategories = [breakfastAndPastries, lightMeals, hotDrinks, coldDrinks, desserts];

export function renderMenu(parent){
  parent.style.alignItems = "start"

  const menuContainer = document.createElement("section");
  menuContainer.classList.add("menu-container");

  const titleH1 = document.createElement("h1");
  titleH1.textContent = "Menu";

  // Menu categories filter

  const categoriesNav = document.createElement("nav");
  categoriesNav.classList.add("categories-nav");

  const fieldset = document.createElement("fieldset");
  const ul = document.createElement("ul");

  menuCategories.forEach((category, i) => {
    const li = document.createElement("li")
    const label = document.createElement("label");
    label.classList.add("checkbox-label");
    label.textContent = category.title;
    label.setAttribute("for", i);
    const input = document.createElement("input");
    input.classList.add("checkbox-input");
    input.type = "checkbox";
    input.id = i;
    input.name = category.title.toLowerCase().split(" ").join("-");
    li.append(input, label);
    ul.appendChild(li);
  })

  fieldset.appendChild(ul);
  categoriesNav.appendChild(fieldset)

  categoriesNav.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox-input")) {
      menuDiv.replaceChildren();

      const checkedBoxes = categoriesNav.querySelectorAll(".checkbox-input:checked");

      if (checkedBoxes.length === 0 ) {
        menuCategories.forEach(menuCategory => menuDiv.append(menuCategory.render()));
      }
      else {
        checkedBoxes.forEach(checkBox => {
          menuDiv.appendChild(menuCategories[checkBox.id].render());
        })
      }
    }
  })

  // Menu

  const menuDiv = document.createElement("div");
  menuDiv.classList.add("menu-categories")
  menuCategories.forEach(category => menuDiv.appendChild(category.render()));

  menuContainer.append(titleH1, categoriesNav, menuDiv);
  parent.appendChild(menuContainer);
}