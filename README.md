# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# web_page_builder

To build the assignment based on the provided requirements, here’s a step-by-step guide to creating a simple web-based WYSIWYG web page builder using React:

### Project Setup

1. **Set Up of Project Structure**
   - Create the necessary directories and files:
     ```
     src/
     ├── components/
     │   ├── Canvas.js
     │   ├── Toolbar.js
     │   ├── TextBox.js
     │   ├── ImageBox.js
     │   └── ButtonBox.js
     ├── App.js
     ├── index.js
     └── App.css
     ```

### Documentation

```markdown
# WYSIWYG Web Page Builder

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd wysiwyg-web-page-builder
   ```

2. Install dependencies:
   ```bash
   npm install or yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev or yarn run dev
   ```

## Usage

- Drag and drop components from the toolbar onto the canvas.
- Edit text directly on the canvas.
- Use the toggle button to switch between design mode and preview mode.
```
