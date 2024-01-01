const common = {
  primary: '#A10F7E',
  secondary: '#19A7FD',
  white: '#FFFFFF',
  black: '#000000',
  textLight: '#424344',
  textGray: '#8A817C',
  aliceBlue: '#E9F1F7',
  success: '#AEFFB2',
  error: '#FFAEAE',
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
  inactive: 'rgba(34, 22, 98, 0.15)',
  ...common,
}

export default { light, dark };
