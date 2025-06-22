// Import required polyfills first
import 'react-native-get-random-values';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import '@ethersproject/shims';
import 'fast-text-encoding';

// Then import the expo router
import 'expo-router/entry';
