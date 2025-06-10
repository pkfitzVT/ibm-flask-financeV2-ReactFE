module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'airbnb',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'
    ],
    plugins: [
        'react',
        'jsx-a11y',
        'import',
        'prettier'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            jsxRuntime: 'automatic'    // <— add this line
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // … your other rules …
        'react/react-in-jsx-scope': 'off',                  // already there
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    }
};
