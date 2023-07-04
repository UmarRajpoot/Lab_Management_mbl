import React from 'react';
import {Box, HStack, Stack, Switch, Text} from 'native-base';
import {
  Alert,
  FlatList,
  LogBox,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BackHeader from '../Components/BackHeader';
import {Path, Svg} from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useEffect} from 'react';

const FinalizeQuiz = ({navigation}) => {
  const [quizes, setQuizes] = useState([]);

  const QuizQuestion = ({question, options}) => {
    return (
      <Box bgColor={'gray.200'} p={'3'} rounded={'xl'} my={'2'}>
        <Text fontSize={'lg'}>{question}</Text>
        <Stack space={'2'}>
          {options?.map((option, index) => {
            return (
              <Text fontSize={'lg'} key={index}>
                {index + 1}: {option}
              </Text>
            );
          })}
        </Stack>
      </Box>
    );
  };

  const getAllQuizes = () => {
    return firestore()
      .collection('Quizes')
      .onSnapshot(onSnapQuiz => {
        setQuizes(
          onSnapQuiz.docs.map(doc => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          }),
        );
      });
  };

  useEffect(() => {
    getAllQuizes();
  }, []);

  const deleteQuiz = async quizID => {
    return firestore()
      .collection('Quizes')
      .doc(quizID)
      .delete()
      .then(() => {
        alert('Question Deleted.');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box px={'3'} h={'full'}>
      <TouchableOpacity
        style={{position: 'absolute', zIndex: 10, bottom: 20, right: 20}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Quiz')}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingBottom={'24'}>
          <Box>
            <BackHeader pageTitle={'Quizes'} onPress={() => {}} />
          </Box>
          <Text fontSize={'2xl'} my={'3'}>
            Questions
          </Text>
          {quizes.map((quiz, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onLongPress={() =>
                  // deleteAssignment(assign.id, assign.data.assignmentURL)
                  {
                    Alert.alert(
                      'Want to Delete.',
                      'Are you sure want to delete question ?',
                      [
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => deleteQuiz(quiz.id),
                        },
                      ],
                    );
                  }
                }>
                <QuizQuestion
                  question={quiz.data.question}
                  options={quiz.data.options}
                />
              </TouchableOpacity>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default FinalizeQuiz;
