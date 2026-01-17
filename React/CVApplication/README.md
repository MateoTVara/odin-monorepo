# Odin CV Application

A responsive CV/resume generator built with React for [The Odin Project](https://www.theodinproject.com/) React course.

## Tech Stack

- **React** (with hooks)
- **Vite** (development/build tool)
- **jsPDF** (PDF export)
- **@mdi/react** and **@mdi/js** (Material Design Icons)
- **CSS** (custom styles, responsive design)

## Features

- Dynamic form sections for General Info, Education, Work Experience, Technical Skills, and Additional Information
- Collapsible sections for easy navigation
- Material Design Icons for improved UI clarity
- Live CV preview with export to PDF (via [jsPDF](https://github.com/parallax/jsPDF))
- Responsive design for desktop and mobile
- Data is initialized from a mock JSON file for easy testing

## Limitations

- **PDF Export:** Icons and clickable links are **not included** in the generated PDF.
- **Mobile PDF:** PDF generation on mobile devices may be unreliable and the layout can be messy. For best results, use a desktop browser.
- **Styling:** The PDF output may not perfectly match the on-screen preview due to browser and jsPDF limitations.

## Getting Started

1. Clone the repository
2. Install dependencies with your preferred package manager (e.g. `pnpm install`)
3. Run the development server:

   ```
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

- Fill out the form sections to build your CV.
- Click "Show Preview" to view your CV.
- Use the download button in the preview to export your CV as a PDF.

## License

This project is for educational purposes as part of The Odin Project curriculum.