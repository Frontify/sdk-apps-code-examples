module.exports = {
    extends: ['@frontify/eslint-config-react'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['**/*.md'],
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
};
