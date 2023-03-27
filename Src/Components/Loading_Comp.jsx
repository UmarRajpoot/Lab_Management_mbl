import {ActivityIndicator} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';

const Loading_Comp = () => {
  return (
    <Box
      position={'absolute'}
      w={'full'}
      h={'full'}
      zIndex={1}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Box
        bg={'gray.900'}
        opacity={0.7}
        position={'absolute'}
        width={'full'}
        height={'full'}></Box>
      <Box
        bg={'gray.200'}
        width={'1/2'}
        p={'5'}
        position={'absolute'}
        borderRadius={'3xl'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}>
        <ActivityIndicator
          size={'large'}
          color={'purple'}
          style={{paddingVertical: 20}}
        />
        <Text fontSize={['md', 'lg', 'xl', '2xl']} color={'black'}>
          Loading...
        </Text>
      </Box>
    </Box>
  );
};

export default Loading_Comp;
