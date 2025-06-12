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
            jsxRuntime: 'automatic'    // this line is correct
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // Here is where this belongs:
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration',
                unnamedComponents: 'arrow-function'
            }
        ]

        // Your other rules:
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'prettier/prettier': 'off',
        'no-console': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
    }
};
