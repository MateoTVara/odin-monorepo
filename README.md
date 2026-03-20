# Odin Monorepo

A personal monorepo of projects completed while working through **The Odin Project** curriculum, organized by learning track and topic.

This repository tracks progression from core frontend fundamentals to full-stack Node.js and React applications.

## Repository Structure

- `Foundations/` — Early web fundamentals projects (HTML, CSS, JavaScript)
  - Calculator
  - Etch A Sketch
  - Landing Page
  - Recipes
  - Rock Paper Scissors
- `HTML_CSS/` — Intermediate HTML/CSS projects
  - Admin Dashboard
  - Homepage (Vite)
  - Sign Up Form
- `JavaScript/` — JavaScript-focused projects and data structure/algorithm exercises
  - Battleship
  - Computer Science exercises (recursion, linked lists, hash maps, BST, etc.)
  - Library
  - Restaurant Page
  - Testing Practice
  - Tic Tac Toe
  - Todo List
  - Weather App
- `React/` — React projects
  - CV Application
  - Memory Card
  - Shopping Cart
- `NodeJS/` — Backend and full-stack Node.js apps
  - Basic Info Site
  - Blog API
  - File Uploader
  - Management App
  - Members Only
  - Mini Message Board

## Learning Focus by Track

- `Foundations/`
  - DOM manipulation, events, CSS layout basics, and JavaScript fundamentals.
- `HTML_CSS/`
  - Responsive layout work, UI structure, and stronger CSS architecture practices.
- `JavaScript/`
  - Application structure, module patterns, testing basics, and computer science exercises.
- `React/`
  - Component-driven UI, state management patterns, and modern frontend workflows.
- `NodeJS/`
  - Routing, controllers, templating, authentication, persistence, and API development.

## Getting Started

Most folders are independent projects and can be run on their own.

1. Navigate to a project directory:
   - `cd Foundations/Calculator`
2. Follow that project’s local `README.md` (if present).
3. If the project uses a package manager:
   - Install dependencies with `pnpm install` (or the package manager specified in that folder).
   - Run the project using scripts from that folder’s `package.json` (for example, `pnpm dev`, `pnpm start`, or `pnpm test`).

## Common Workflow

From inside any individual project folder:

- Install dependencies: `pnpm install`
- Start development server (if available): `pnpm dev`
- Build production output (if available): `pnpm build`
- Run tests (if available): `pnpm test`

If a project does not use Node tooling, open `index.html` directly or use a simple local server.

## How to Navigate This Monorepo

- Start with project-specific instructions in each local `README.md`.
- Treat every folder as an independent app or exercise with its own setup.
- Check each project’s `package.json` for the authoritative scripts and commands.
- Prefer `pnpm` in directories that already include `pnpm-lock.yaml`.

## Notes

- This monorepo is organized for learning, so tooling and stack choices vary between subprojects.
- Each project is intentionally self-contained, with its own assets, scripts, and configuration.

## Status

- Active learning repository with iterative improvements over time.
- Older projects may reflect earlier learning stages and simpler architecture decisions.
