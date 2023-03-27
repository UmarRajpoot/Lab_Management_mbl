import {TouchableOpacity} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Box, Text} from 'native-base';

const BackHeader = ({onPress, pageTitle}) => {
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{marginTop: 10, width: 50, zIndex: 1}}>
        <Box
          backgroundColor={'gray.100'}
          w={50}
          h={50}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'2xl'}
          shadow={'2'}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            width={30}
            height={30}
            color={'black'}>
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </Svg>
        </Box>
      </TouchableOpacity>
      <Box
        style={{
          width: '100%',
          position: 'absolute',
        }}>
        <Text style={{fontSize: 18, textAlign: 'center'}}>{pageTitle}</Text>
      </Box>
    </Box>
  );
};

export default BackHeader;
