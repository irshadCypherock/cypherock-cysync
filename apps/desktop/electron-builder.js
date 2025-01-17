const config = {
  appId: 'com.hodl.cypherock',
  productName: 'Cypherock CySync',
  asar: true,
  directories: {
    output: 'release/${version}',
    buildResources: 'public',
  },
  files: ['dist-electron', 'dist'],
  mac: {
    artifactName: '${productName}_${version}.${ext}',
    entitlements: 'entitlements.plist',
    entitlementsInherit: 'entitlements.plist',
    target: ['dmg', 'zip'],
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
    artifactName: '${productName}_${version}.${ext}',
  },
  linux: {
    target: ['flatpak', 'snap', 'deb', 'rpm'],
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },
  afterSign: 'scripts/notarize.js',
};

module.exports = config;
