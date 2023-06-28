module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          alias: {
            '@app': './src/app',
            '@assets': './src/assets',
            '@components': './src/components',
            '@shared': './src/shared',
          },
        },
      ],
    ],
  };
};
