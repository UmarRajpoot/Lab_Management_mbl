import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
import {Path, Svg} from 'react-native-svg';
import PcComponent from '../Components/PcComponent';
import BackHeader from '../Components/BackHeader';
import {io} from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';

const PcDetail = ({navigation, route}) => {
  const {PcDetail} = route.params;

  const [socket_instance, set_Socket_instence] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [SoftIP, setSoftIP] = useState('-');
  const [ClientConnected, setClientConnected] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIpAddress(state.details.ipAddress);
      console.log(state.details.ipAddress);
      //   if (state.type == 'wifi') {
      //     setIsWifi(true);
      //   } else {
      //     setIsWifi(false);
      //   }
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const SocketConnection = socketIP => {
    const socketConnection = io(`http://${socketIP}:2000`, {
      transports: ['websocket', 'polling'],
    });
    set_Socket_instence(socketConnection);
    // dispatch(getSocketInstance_Data(socketConnection));
    socketConnection.on('connect', () => {
      console.log('Client Connected : ', socketConnection.id);
      console.log('Device Connected: ', socketConnection.connected);
      setClientConnected(socketConnection.connected);
    });

    socketConnection.emit('clientReq', {
      ClientIP: ipAddress,
      Connected: true,
    });
  };

  useEffect(() => {
    if (ipAddress) {
      if (!socket_instance?.connected) {
        SocketConnection(PcDetail.data.IpAddress);
      } else {
        console.log('Already Connected');
      }
    }
  }, [ipAddress]);

  useEffect(() => {
    if (!socket_instance) return;
    socket_instance.on('getSoftIP', soft_ip => {
      console.log('Software Ip ' + soft_ip);
      setSoftIP(soft_ip.SoftIP);
    });
  }, [socket_instance]);

  const PowerButton = ({onPress}) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <Box
          borderWidth={'1'}
          borderColor={'red.300'}
          alignSelf={'center'}
          rounded={'full'}
          bgColor={'red.500'}
          p={'5'}
          shadow={'5'}
          my={'5'}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color={'white'}
            width={150}
            height={150}>
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </Svg>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box mx={'3'}>
      <BackHeader
        onPress={() => {
          if (socket_instance.connected) {
            socket_instance.disconnect();
            navigation.goBack();
          }
        }}
        pageTitle={'Detail'}
      />
      <PowerButton onPress={() => socket_instance.emit('shutdownPC', true)} />
      <PcComponent title={'Your Pc'} SoftIP={SoftIP} />
    </Box>
  );
};

export default PcDetail;
