/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/config/notificationConfig';

AppRegistry.registerComponent(appName, () => App);
