const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.alexandre_junqueiro.DomaFiles.dev';
  }

  if (IS_PREVIEW) {
    return 'com.alexandre_junqueiro.DomaFiles.preview';
  }

  return 'com.alexandre_junqueiro.DomaFiles';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'DomaFiles (Dev)';
  }

  if (IS_PREVIEW) {
    return 'DomaFiles';
  }

  return 'DomaFiles';
};


export default ({ config }) => ({
  ...config,
  name: getAppName(),
  slug: "DomaFiles",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./src/assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: getUniqueIdentifier(),
  },
  web: {
    favicon: "./src/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "b2ac85c5-f190-475e-98af-1ac973d08e4b",
    },
  },
  owner: "alexandre_junqueiro",
  plugins: ["expo-font"],
});
