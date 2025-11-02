# Animanga Memory Card Game

![Game Screenshot](./public/sample.png)

This project is part of [The Odin Project](https://www.theodinproject.com/) React course. It is a memory card game built with React, where players must click on unique anime/manga character cards without repeating any selection. The game fetches character data from the Jikan API and displays a responsive grid of cards.

## Features

- Fetches anime/manga character data from the Jikan API
- Displays five random character cards per round
- Tracks current score and best score
- Win condition and reset on repeated selection
- Responsive design with Tailwind CSS
- Mobile experience prompt

## Tech Stack

- **React** (with functional components and hooks)
- **Vite** (for fast development and build)
- **Tailwind CSS** (utility-first styling)
- **Jikan API** (for anime/manga character data)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/odin-memory-card.git
   ```
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm dev
   ```

## Usage

Click on character cards to increase your score. Avoid clicking the same character twice in a row. If you reach the maximum score, you win!

## Credits

[Cards icons created by Victoruler - Flaticon](https://www.flaticon.com/free-icons/cards)

## License

This project is for educational purposes as part of The Odin Project curriculum.