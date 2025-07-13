# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Backend URL, Environment, and CORS configuration

This app expects your FastAPI backend API to run at the URL specified in the `.env` file (see `.env.example`).  
For local development, the default is:  
```
REACT_APP_API_URL=http://localhost:8000
```
If your backend runs on a different port/domain, update the `.env` accordingly, then **restart the frontend (`npm start`) for new env vars to take effect**.

### Integration troubleshooting checklist

- If you see network errors, 401s, or other issues:
  - `.env` (and optionally `.env.example`) must have the correct REACT_APP_API_URL for your backend (`http://localhost:8000`, etc).
  - Confirm backend [CORS](https://fastapi.tiangolo.com/tutorial/cors/) allows requests from `http://localhost:3000`.
    - FastAPI's allowed origins list must include the frontend's origin exactly (including port).
  - Make sure backend is running and accessible at the URL in `.env`.
  - If the backend URL or port changes, restart the frontend dev server.
  - Check browser dev console "Network" tab for failing API calls and error details.

### CORS

**The FastAPI backend must allow CORS requests from this frontend's domain.**  
If you run the backend at `http://localhost:8000`, FastAPI must allow origin `http://localhost:3000`.  
See FastAPI docs for [CORS setup](https://fastapi.tiangolo.com/tutorial/cors/).

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
