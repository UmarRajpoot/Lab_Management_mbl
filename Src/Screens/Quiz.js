import React, {useEffect, useState} from 'react';
import {Box, Text} from 'native-base';
import BackHeader from '../Components/BackHeader';
import firestore from '@react-native-firebase/firestore';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Button from '../Components/Button';

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);

  const [question, setQuestion] = useState('');
  const [singleoptions, setSingleOptions] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');

  const AddQuizes = () => {
    firestore()
      .collection('Quizes')
      .add({
        Quizes: quiz,
      })
      .then(() => {
        console.log('Quiz Added');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const AddQuiz = () => {
    setQuiz([
      ...quiz,
      {
        Question: question,
        Options: options,
        answer: answer,
      },
    ]);
  };

  return (
    <Box px={'3'} h={'full'}>
      <ScrollView>
        <Box>
          <BackHeader pageTitle={'Quiz'} onPress={() => {}} />
        </Box>
        <Text color={'gray.600'} fontSize={'2xl'} p={'2'}>
          Quizes
        </Text>

        <Box w={'full'} minH={'32'} bgColor={'gray.600'} rounded={'2xl'}>
          <TextInput
            placeholder="Add Questions"
            style={{fontSize: 18, padding: 10}}
            value={question}
            onChangeText={text => setQuestion(text)}
          />
        </Box>
        <Text fontSize={'2xl'} p={'2'}>
          Options
        </Text>
        <Box flexDirection={'row'}>
          {options.map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setOptions(
                    options.filter(singoption => singoption !== option),
                  );
                }}>
                <Box bgColor={'gray.600'} p={'1'} rounded={'md'} m={'1'}>
                  <Text fontSize={'md'} color={'gray.100'}>
                    {option}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
        <Box w={'full'} bgColor={'gray.600'} rounded={'2xl'}>
          <TextInput
            placeholder="Add Options"
            style={{fontSize: 18, padding: 10}}
            value={singleoptions}
            onChangeText={text => setSingleOptions(text)}
            onSubmitEditing={() => {
              setOptions([...options, singleoptions]);
              setSingleOptions('');
            }}
          />
        </Box>
        <Text fontSize={'2xl'} p={'2'}>
          Add Answer
        </Text>
        <Box w={'full'} bgColor={'gray.600'} rounded={'2xl'}>
          <TextInput
            placeholder="Add Answer"
            style={{fontSize: 18, padding: 10}}
            value={answer}
            onChangeText={text => setAnswer(text)}
          />
        </Box>
        <Box my={'2'}>
          <Button
            title={'Add Quiz'}
            onPress={() => {
              AddQuiz();
              setQuestion('');
              setAnswer('');
              setOptions([]);
            }}
          />
        </Box>
        <Text fontSize={'2xl'} p={'2'}>
          All Questions
        </Text>
        {quiz.map((qui, index) => {
          return (
            <Box
              key={index}
              bgColor={'gray.600'}
              p={'2'}
              rounded={'xl'}
              my={'1'}>
              <Text fontSize={'xl'} color={'gray.100'}>
                Questions
              </Text>
              <Text fontSize={'md'} color={'gray.100'}>
                {qui.Question}
              </Text>
              <Text fontSize={'xl'} color={'gray.100'}>
                Options
              </Text>
              <Box flexDirection={'row'}>
                {qui.Options.map((opt, index) => {
                  return (
                    <Text
                      key={index}
                      ml={'1'}
                      fontSize={'md'}
                      color={'gray.100'}>
                      {opt}
                    </Text>
                  );
                })}
              </Box>
              <Text fontSize={'xl'} color={'gray.100'}>
                Answer
              </Text>
              <Text fontSize={'md'} color={'gray.100'}>
                {qui.answer}
              </Text>
            </Box>
          );
        })}
        <Box my={'2'}>
          <Button
            title={'Submit All'}
            onPress={() => {
              AddQuizes();
            }}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Quiz;
