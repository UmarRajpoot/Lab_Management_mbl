import {View, Text, Linking} from 'react-native';
import React from 'react';
import ConnectivitySVG from './ConnectivitySVG';

const OfflinePage = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{position: 'relative'}}>
        <ConnectivitySVG wifi={true} width={200} height={200} />
        <View style={{position: 'absolute', bottom: 0, right: 30}}>
          <ConnectivitySVG width={100} height={100} />
        </View>
      </View>
      <Text
        style={{fontSize: 24, color: 'black'}}
        onPress={() => Linking.sendIntent('android.settings.WIFI_SETTINGS')}>
        No WIFI Connected
      </Text>
    </View>
  );
};

export default OfflinePage;
// Linking.sendIntent('android.settings.SETTINGS')
