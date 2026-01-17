#!/usr/bin/env zsh
set -e
setopt extendedglob

move_project() {
  local name="$1"
  local repo="$2"
  local category="$3"

  echo "▶ Importing $name into $category"

  git remote add "$name" "$repo" 2>/dev/null || true
  git fetch "$name"

  git merge "$name/main" \
    --allow-unrelated-histories \
    -X theirs \
    -m "Merge $name project"

  mkdir -p "$category/$name"

  find . -maxdepth 1 \
    -not -path './.git' \
    -not -path './import_odin_projects.zsh' \
    -not -path './Foundations' \
    -not -path './HTML_CSS' \
    -not -path './JavaScript' \
    -not -path './React' \
    -not -path './NodeJS' \
    -not -path "./$category" \
    -not -name '.' \
    -exec git mv {} "$category/$name/" \; 2>/dev/null || true

  for dotfile in .*; do
    if [[ -f "$dotfile" || -d "$dotfile" ]]; then
      case "$dotfile" in
        "."|".."|".git")
          continue
          ;;
        *)
          git mv "$dotfile" "$category/$name/" 2>/dev/null || true
          ;;
      esac
    fi
  done

  git commit -m "Move $name into $category/"
}



# ---------- Foundations ----------
move_project Recipes git@github.com:MateoTVara/odin-recipes.git Foundations
move_project LandingPage git@github.com:MateoTVara/odin-landing-page.git Foundations
move_project RockPaperScissors git@github.com:MateoTVara/odin-rock-paper-scissors.git Foundations
move_project EtchASketch git@github.com:MateoTVara/odin-etch-a-sketch.git Foundations
move_project Calculator git@github.com:MateoTVara/odin-calculator.git Foundations

# ---------- HTML & CSS ----------
move_project SignUpForm git@github.com:MateoTVara/odin-sign-up-form.git HTML_CSS
move_project AdminDashboard git@github.com:MateoTVara/odin-admin-dashboard.git HTML_CSS
move_project Homepage git@github.com:MateoTVara/odin-homepage.git HTML_CSS

# ---------- JavaScript ----------
move_project Library git@github.com:MateoTVara/odin-library.git JavaScript
move_project TicTacToe git@github.com:MateoTVara/odin-tic-tac-toe.git JavaScript
move_project RestaurantPage git@github.com:MateoTVara/odin-restaurant-page.git JavaScript
move_project TodoList git@github.com:MateoTVara/odin-todo-list.git JavaScript
move_project WeatherApp git@github.com:MateoTVara/odin-weather-app.git JavaScript
move_project ComputerScience git@github.com:MateoTVara/odin-a-bit-of-computer-science.git JavaScript
move_project TestingPractice git@github.com:MateoTVara/odin-testing-practice.git JavaScript
move_project Battleship git@github.com:MateoTVara/odin-battleship.git JavaScript

# ---------- React ----------
move_project CVApplication git@github.com:MateoTVara/odin-cv-application.git React
move_project MemoryCard git@github.com:MateoTVara/odin-memory-card.git React
move_project ShoppingCart git@github.com:MateoTVara/odin-shopping-cart.git React

# ---------- NodeJS ----------
move_project BasicInfoSite git@github.com:MateoTVara/odin-basic-informational-site.git NodeJS
move_project MiniMessageBoard git@github.com:MateoTVara/odin-mini-message-board.git NodeJS
move_project ManagementApp git@github.com:MateoTVara/odin-management-application.git NodeJS
move_project MembersOnly git@github.com:MateoTVara/odin-members-only.git NodeJS

echo "✅ All Odin projects imported successfully"
