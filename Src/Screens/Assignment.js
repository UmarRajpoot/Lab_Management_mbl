import React, {useEffect, useState} from 'react';
import {Box, Text, ZStack} from 'native-base';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BackHeader from '../Components/BackHeader';
import {Path, Svg} from 'react-native-svg';

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

  const deleteAssignment = async assignID => {
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
      <Text color={'gray.600'} fontSize={'2xl'} p={'2'}>
        Assignments
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
              onLongPress={() => deleteAssignment(assign.id)}
              onPress={() =>
                navigation.navigate('AssignDetail', {
                  assignDetail: assign,
                })
              }>
              <Box bgColor={'gray.500'} p={'3'} rounded={'2xl'}>
                <Text color={'gray.100'} fontSize={'xl'}>
                  Assignment {index + 1}
                </Text>
                <Text color={'gray.300'} fontSize={'md'} numberOfLines={3}>
                  {assign.data.text}
                </Text>
              </Box>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default Assignment;
