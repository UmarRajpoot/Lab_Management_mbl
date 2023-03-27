import {
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {io} from 'socket.io-client';
import Colors from '../Constants/ThemeColors';
import ConnectivitySVG from '../Components/ConnectivitySVG';
import SoftwareSVG from '../Components/SoftwareSVG';
import Button from '../Components/Button';
import OfflinePage from '../Components/OfflinePage';
import {Box, Text} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getSocketInstance_Data} from '../Store/Socket_State/Socket_Actions';

const Dashboard = () => {
  const [ipAddress, setIpAddress] = useState('None');
  const [isWifi, setIsWifi] = useState(false);

  const [socket_ip, set_socket_ip] = useState('');
  const [socket_port, set_socket_port] = useState('2000');

  const navigation = useNavigation();

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIpAddress(state.details.ipAddress);
      if (state.type == 'wifi') {
        setIsWifi(true);
      } else {
        setIsWifi(false);
      }
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const [ClientConnected, setClientConnected] = useState(false);

  const [SoftIP, setSoftIP] = useState('-');

  const [socket_instance, set_Socket_instence] = useState(null);

  const dispatch = useDispatch();

  const SocketConnection = () => {
    const socketConnection = io(`http://${socket_ip}:${socket_port}`, {
      transports: ['websocket', 'polling'],
    });
    set_Socket_instence(socketConnection);
    dispatch(getSocketInstance_Data(socketConnection));
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
    if (!socket_instance) return;
    socket_instance.on('getSoftIP', soft_ip => {
      console.log('Software Ip ' + soft_ip);
      setSoftIP(soft_ip.SoftIP);
    });
  }, [socket_instance]);

  const [inputFocus, setInputFocus] = useState({
    Ipaddress: false,
    port: false,
  });

  const [input_error, set_input_error] = useState({
    Ipaddress: false,
    port: false,
  });

  const input_background = (input_focus, input_error) => {
    if (input_focus) {
      return 'purple.100';
    }
    if (input_error) {
      return 'red.100';
    }

    return '#F0F0F0';
  };
  const input_border = (input_focus, input_error) => {
    if (input_focus) {
      return 'purple.500';
    }
    if (input_error) {
      return 'red.500';
    }

    return '#F0F0F0';
  };

  const [errorIPText, setErrorIPText] = useState(null);
  const [errorPORTText, setErrorPORTText] = useState(null);

  // For IP Address
  useEffect(() => {
    if (socket_ip.length !== 0) {
      let IP_regex =
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (IP_regex.test(socket_ip) === true) {
        set_input_error({...input_error, Ipaddress: false});
        setErrorIPText(null);
      } else {
        set_input_error({...input_error, Ipaddress: true});
      }
    } else {
      set_input_error({...input_error, Ipaddress: false});
      setErrorIPText(null);
    }
  }, [socket_ip]);
  // For Port
  useEffect(() => {
    if (socket_port.length !== 0) {
      if (socket_port.length >= 4) {
        set_input_error({...input_error, port: false});
        setErrorPORTText(null);
      } else {
        set_input_error({...input_error, port: true});
      }
    } else {
      set_input_error({...input_error, port: false});
      setErrorPORTText(null);
    }
  }, [socket_port]);

  return (
    <ScrollView>
      <Box
        style={{
          // backgroundColor: Colors.backgroundColor,
          flex: 1,
        }}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.backgroundColor}
        />
        {isWifi ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}>
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
              <ConnectivitySVG wifi={true} />
              <Box style={{marginLeft: 5}}>
                <Box style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text style={{fontSize: 24, color: '#878484', padding: 2}}>
                    WIFI
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#878484',
                    }}>{`(Connected)`}</Text>
                </Box>
                <Text style={{fontSize: 18, color: '#878484'}}>
                  IP Address {ipAddress}
                </Text>
              </Box>
            </Box>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                navigation.navigate('AllPc');
              }}>
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
                    <Text style={{fontSize: 24, color: '#878484', padding: 3}}>
                      All PC's
                    </Text>
                    {/* <Text
                      style={{
                        fontSize: 14,
                        color: '#878484',
                      }}>
                      {ClientConnected ? '(Online)' : '(Offline)'}
                    </Text> */}
                  </Box>
                  {/* <Text style={{fontSize: 18, color: '#878484'}}>
                    IP Address {SoftIP}
                  </Text> */}
                </Box>
              </Box>
            </TouchableOpacity>
            <Box
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <SoftwareSVG small={false} />
              <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
                {!ClientConnected
                  ? 'Put Your Software IP'
                  : 'Manage your System'}
              </Text>
            </Box>
            {!ClientConnected ? (
              <Box>
                {/* For IP Address */}
                <Text color={'gray.500'} padding={'2'} fontSize={'md'}>
                  IP Address
                </Text>
                <Box
                  style={{
                    // backgroundColor: '#F0F0F0',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                  }}
                  borderWidth={'1'}
                  backgroundColor={input_background(
                    inputFocus.Ipaddress,
                    input_error.Ipaddress,
                  )}
                  borderColor={input_border(
                    inputFocus.Ipaddress,
                    input_error.Ipaddress,
                  )}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                    width={20}
                    height={20}
                    color={'gray'}>
                    <Path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </Svg>

                  <TextInput
                    placeholder="IP Address"
                    placeholderTextColor={'gray'}
                    style={[{fontSize: 16, color: 'gray', flex: 1}]}
                    value={socket_ip}
                    onChangeText={text => set_socket_ip(text)}
                    keyboardType={'number-pad'}
                    onFocus={() => {
                      setInputFocus({...inputFocus, Ipaddress: true});
                    }}
                    onBlur={() => {
                      setInputFocus({...inputFocus, Ipaddress: false});
                      if (input_error.Ipaddress === true) {
                        setErrorIPText('IP address not correct');
                      } else {
                        setErrorIPText(null);
                      }
                    }}
                  />
                </Box>
                {errorIPText && (
                  <Text color={'error.500'} padding={'1'} fontSize={'sm'}>
                    Wrong IP Address
                  </Text>
                )}
                {/* For Port */}
                <Text color={'gray.500'} padding={'2'} fontSize={'md'}>
                  Port
                </Text>
                <Box
                  style={{
                    // backgroundColor: '#F0F0F0',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 2,
                  }}
                  borderWidth={'1'}
                  backgroundColor={input_background(
                    inputFocus.port,
                    input_error.port,
                  )}
                  borderColor={input_border(inputFocus.port, input_error.port)}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                    width={20}
                    height={20}
                    color={'gray'}>
                    <Path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </Svg>

                  <TextInput
                    placeholder="Port"
                    placeholderTextColor={'gray'}
                    style={[{fontSize: 16, color: 'gray', flex: 1}]}
                    value={socket_port}
                    onChangeText={text => set_socket_port(text)}
                    keyboardType={'number-pad'}
                    onFocus={() => {
                      setInputFocus({...inputFocus, port: true});
                    }}
                    onBlur={() => {
                      setInputFocus({...inputFocus, port: false});
                      if (input_error.port === true) {
                        setErrorPORTText(
                          'Incorrect Port. Must be 4 character.',
                        );
                      } else {
                        setErrorPORTText(null);
                      }
                    }}
                  />
                </Box>
                {errorPORTText && (
                  <Text color={'error.500'} padding={'1'} fontSize={'sm'}>
                    Incorrect Port. Must be 4 character.
                  </Text>
                )}

                <Box
                  style={{
                    alignItems: 'center',
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  <Button
                    title={'Connect'}
                    onPress={() => {
                      // SocketConnection();
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text fontSize={'xl'}>Shutdown PC:</Text>
                <TouchableOpacity
                  onPress={() => {
                    socket_instance.emit('shutdownPC', true);
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fb7185',
                    borderRadius: 30,
                  }}>
                  <Image
                    source={require('../Constants/shut.png')}
                    style={{width: 50, height: 50}}
                  />
                </TouchableOpacity>
              </Box>
            )}
          </ScrollView>
        ) : (
          <OfflinePage />
        )}
      </Box>
    </ScrollView>
  );
};

export default Dashboard;
