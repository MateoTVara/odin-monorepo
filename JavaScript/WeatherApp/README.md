# Odin Weather App

A simple weather dashboard built with vanilla JavaScript, HTML, and CSS. This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum and demonstrates modular code structure and API usage.

## Features

- **Search weather by location**  
  Enter a city or location to view current weather and a 4-day forecast.

- **Temperature unit toggle**  
  Switch between Fahrenheit (°F) and Celsius (°C) for all displayed temperatures.

- **Weather icons and conditions**  
  See visual icons and descriptions for current and forecasted weather.

## Technologies

- JavaScript (ES6 modules)
- CSS Grid & Flexbox
- [date-fns](https://date-fns.org/) for date formatting
- Webpack for bundling

## Getting Started

1. **Install dependencies**  
   ```
   pnpm install
   ```

2. **Start the development server**  
   ```
   pnpm exec webpack serve
   ```

3. **Open in browser**  
   Visit [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal).

## Project Structure

```
src/
  index.js           # Entry point
  template.html      # Main HTML template
  styles.css         # App styles
  managers/          # Modular JS managers
    ApiManager.js
    AssetManager.js
    DomManager.js
    TempManager.js
```

## How It Works

- **DomManager**: Handles DOM selection and event listeners.
- **ApiManager**: Fetches weather data from an API.
- **TempManager**: Manages temperature conversions and toggling.
- **AssetManager**: Loads weather icons.