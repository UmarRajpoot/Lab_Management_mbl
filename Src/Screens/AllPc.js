import React, {useEffect, useState} from 'react';
import {Box, Button} from 'native-base';
import PcComponent from '../Components/PcComponent';
import firestore from '@react-native-firebase/firestore';
import BackHeader from '../Components/BackHeader';
import {io} from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';

const AllSoftware = ({navigation}) => {
  const [allPc, setAllPc] = useState([]);

  const getAllPcConnected = async () => {
    await firestore()
      .collection('LabSoftware')
      .onSnapshot(pcSnap => {
        setAllPc(
          pcSnap.docs.map(doc => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          }),
        );
      });
  };

  useEffect(() => {
    getAllPcConnected();
  }, []);

  const [socket_instance, set_Socket_instence] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [SoftIP, setSoftIP] = useState('-');
  const [ClientConnected, setClientConnected] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIpAddress(state.details.ipAddress);
      // console.log(state.details.ipAddress);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  const SocketConnection = socketIP => {
    if (ipAddress) {
      if (!socket_instance?.connected) {
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
      }
    }
  };
  useEffect(() => {
    if (!socket_instance) return;
    socket_instance.on('getSoftIP', soft_ip => {
      console.log('Software Ip ', soft_ip);
      setSoftIP(soft_ip.SoftIP);
    });
  }, [socket_instance]);

  const ShutDown = shut_ipAddress => {
    console.log(shut_ipAddress);
    const socketConnection = io(`http://${shut_ipAddress}:2000`, {
      transports: ['websocket', 'polling'],
    });
    socketConnection.on('connect', () => {
      socket_instance.emit('shutdownPC', true);
      if (socketConnection.connected) {
        // Shut down
        socketConnection.disconnect();
        console.log(
          shut_ipAddress,
          'Disconnected',
          socketConnection.disconnected,
        );
      }
    });
  };

  const ShutDownAllPC = async () => {
    const stepIps = [allPc.map(pc => pc.data.IpAddress)];
    const sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const getNum = async number => {
      const v = await sleep(3000);
      return stepIps[number];
    };
    console.log('Start');
    for (let index = 0; index < stepIps.length; index++) {
      const result = await getNum(index).then(result => {
        ShutDown(result.toString());
      });
    }
    console.log('End');
  };

  return (
    <>
      <Box px={'3'}>
        <BackHeader
          onPress={() => {
            navigation.goBack();
          }}
          pageTitle={"All Pc's"}
        />
      </Box>
      <Box>
        <Button
          onPress={() => {
            ShutDownAllPC();
          }}
          colorScheme={'danger'}
          // isLoading
          isLoadingText={`Shutting down Pc's`}>
          Shut Down All PC's
        </Button>
      </Box>
      <Box mx={'3'}>
        {allPc.map((pc, index) => {
          return (
            <PcComponent
              key={pc.id}
              title={`PC's ${pc.id}`}
              SoftIP={pc.data.IpAddress}
              onPress={() => {
                navigation.navigate('PcDetail', {
                  PcDetail: pc,
                  processes: pc.data.Processes,
                });
              }}
            />
          );
        })}
      </Box>
    </>
  );
};

export default AllSoftware;
