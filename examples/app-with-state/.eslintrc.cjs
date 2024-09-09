module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ['dist/'],
    rules: {
        "react/react-in-jsx-scope": "off",
        '@typescript-eslint/no-unused-vars': 'warn',
    }
};
