const common = {
  primary: '#A10F7E',
  secondary: '#E6CEF2',
  white: '#FFFFFF',
  black: '#000000',
  textLight: '#424344',
  textGray: '#868686',
  aliceBlue: '#E9F1F7',
  success: '#AEFFB2',
  error: '#FFAEAE',
  lightBg: 'rgba(230, 206, 242, 0.95)',
  lightBg2: 'rgba(37, 211, 102, 0.7)',
  halfWhite: 'rgba(255, 255, 255, 0.85)',
  inactiveBt: '#D7D7D7',
  inactiveTab: '#DEDEDE',
  textHash: '#455154',
  border: '#F8F8F9',
  warning: '#FFD9E9',
};


const light = {
  background: '#FFFFFF',
  textDark: '#221662',
  inactive: 'rgba(34, 22, 98, 0.15)',
  ...common,
}

const dark = {
  background: '#221662',
  textDark: '#FFFFFF',
  inactive: 'rgba(51, 51, 51, 0.5)',
  mapBackground: '#242f3e',
  mapText: '#746855',
  ...common,
}

export default { light, dark };
