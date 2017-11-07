
import {StyleSheet, Platform, Dimensions, Orientation} from 'react-native';

export default global = {
        WIDTH_RATIO: Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width  / 640 : Dimensions.get('window').height  / 640,
        HEIGHT_RATIO:  Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').height  / 360 : Dimensions.get('window').width  / 360
    };