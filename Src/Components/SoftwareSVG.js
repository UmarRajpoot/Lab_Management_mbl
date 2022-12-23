import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const SoftwareSVG = ({small = false}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      style={{width: small ? 50 : 120, height: small ? 50 : 120}}>
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
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </Svg>
  );
};

export default SoftwareSVG;
