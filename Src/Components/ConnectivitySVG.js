import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const ConnectivitySVG = ({wifi, width, height}) => {
  return wifi ? (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style={{width: width || 50, height: height || 50}}>
      <Defs>
        <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FEAC5E" stopOpacity="1" />
          <Stop offset="0.5" stopColor="#C779D0" stopOpacity="1" />
          <Stop offset="1" stopColor="#4BC0C8" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        stroke="url(#path)"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="1.5"
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
      />
    </Svg>
  ) : (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      style={{width: width || 80, height: height || 80}}>
      <Defs>
        <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FEAC5E" stopOpacity="1" />
          <Stop offset="0.5" stopColor="#C779D0" stopOpacity="1" />
          <Stop offset="1" stopColor="#4BC0C8" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        stroke="url(#path)"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="1.5"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </Svg>
  );
};

export default ConnectivitySVG;
