module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin'], // Agregar este plugin
  };
};
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    '@babel/plugin-transform-private-methods',
  ],
};
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
};
