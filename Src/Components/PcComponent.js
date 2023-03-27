import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Box} from 'native-base';
import SoftwareSVG from './SoftwareSVG';

const PcComponent = ({title, SoftIP, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <Box
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 15,
          elevation: 4,
          marginTop: 20,
          padding: 20,
        }}
        backgroundColor={'trueGray.100'}>
        <SoftwareSVG small={true} />

        <Box style={{marginLeft: 5}}>
          <Box style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 24, color: '#878484', padding: 2}}>
              {title}
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                color: '#878484',
              }}>
              {ClientConnected ? '(Online)' : '(Offline)'}
            </Text> */}
          </Box>
          <Text style={{fontSize: 18, color: '#878484', paddingLeft: 2}}>
            IP Address {SoftIP}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default PcComponent;
