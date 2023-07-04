import React, {useEffect, useState} from 'react';
import {Badge, Box, Text, ZStack} from 'native-base';
import {Alert, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BackHeader from '../Components/BackHeader';
import {Path, Svg} from 'react-native-svg';
import storage from '@react-native-firebase/storage';

const Assignment = ({navigation}) => {
  const [assignment, setAssignment] = useState([]);

  const GetAllAssignments = async () => {
    await firestore()
      .collection('Assignments')
      .onSnapshot(assignmentSnap => {
        setAssignment(
          assignmentSnap.docs.map(assign => {
            return {
              id: assign.id,
              data: assign.data(),
            };
          }),
        );
      });
  };

  useEffect(() => {
    GetAllAssignments();
  }, []);

  const deleteAssignment = async (assignID, urlRef) => {
    // console.log('File and Info will delete');
    const filedeleted = await storage()
      .refFromURL(urlRef)
      .delete()
      .then(() => {
        console.log('File Deleted');
      })
      .catch(error => {
        console.log(error);
      });
    await firestore()
      .collection('Assignments')
      .doc(assignID)
      .delete()
      .then(resp => {
        console.log('Assignment Deleted');
      });
  };

  return (
    <Box w={'full'} h={'100%'} p={'3'}>
      <Box px={'3'}>
        <BackHeader
          pageTitle={'Detail'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Box>
      <Text color={'gray.600'} fontSize={'xl'} p={'2'}>
        Uploaded Assignments
      </Text>
      <TouchableOpacity
        style={{position: 'absolute', zIndex: 10, bottom: 20, right: 20}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddAssign')}>
        <Box
          w={'16'}
          h={'16'}
          bgColor={'pink.600'}
          rounded={'full'}
          alignItems={'center'}
          justifyItems={'center'}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            width={30}
            height={60}>
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </Svg>
        </Box>
      </TouchableOpacity>
      <ScrollView>
        {assignment.map((assign, index) => {
          return (
            <TouchableOpacity
              key={assign.id}
              activeOpacity={0.8}
              onLongPress={() =>
                // deleteAssignment(assign.id, assign.data.assignmentURL)
                {
                  Alert.alert(
                    'Want to Delete.',
                    'Are you sure want to delete Assignment.',
                    [
                      {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () =>
                          deleteAssignment(
                            assign.id,
                            assign.data.assignmentURL,
                          ),
                      },
                    ],
                  );
                }
              }>
              <Box
                w={'95%'}
                my={'3'}
                bgColor={'gray.300'}
                rounded={'2xl'}
                alignSelf={'center'}
                p={'3'}
                flexDirection={'row'}
                alignItems={'center'}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill={'gray'}>
                  <Path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></Path>
                </Svg>
                <Text fontSize={'lg'} color={'gray.900'} p={'3'}>
                  {assign.data.assignmentName}
                </Text>
                <Badge
                  rounded={'2xl'}
                  colorScheme={'green'}
                  position={'absolute'}
                  top={0}
                  right={0}>
                  Uploaded
                </Badge>
              </Box>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default Assignment;
