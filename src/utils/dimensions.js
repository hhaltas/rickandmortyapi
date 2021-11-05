import { Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('screen');
const windowDimensions = Dimensions.get('window');

export const { height: screenHeight, width: screenWidth } = screenDimensions;
export const { height: windowHeight, width: windowWidth } = windowDimensions;