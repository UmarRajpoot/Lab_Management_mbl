import React, {useEffect, useState} from 'react';
import {Box, Text} from 'native-base';
import BackHeader from '../Components/BackHeader';
import firestore from '@react-native-firebase/firestore';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Button from '../Components/Button';
import Loading_Comp from '../Components/Loading_Comp';

const Quiz = () => {
  const [question, setQuestion] = useState('');
  const [singleoptions, setSingleOptions] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const AddQuiz = async () => {
    setIsLoading(true);
    await firestore()
      .collection('Quizes')
      .add({
        question: question,
        options: options,
        answer: answer,
      })
      .then(() => {
        setIsLoading(false);
        alert('Quiz Added');
        setQuestion('');
        setOptions([]);
        setAnswer('');
        console.log('Quiz Added');
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      {isLoading && <Loading_Comp />}

      <Box px={'3'} h={'full'}>
        <ScrollView>
          <Box>
            <BackHeader pageTitle={'Quiz'} onPress={() => {}} />
          </Box>
          <Text color={'gray.600'} fontSize={'2xl'} p={'2'}>
            Quizes
          </Text>

          <Box w={'full'} minH={'32'} bgColor={'gray.300'} rounded={'2xl'}>
            <TextInput
              placeholder="Add Questions"
              placeholderTextColor={'black'}
              style={{fontSize: 18, padding: 10, color: 'black'}}
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
                  <Box bgColor={'gray.300'} p={'1'} rounded={'md'} m={'1'}>
                    <Text fontSize={'md'} color={'gray.600'}>
                      {option}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
          <Box w={'full'} bgColor={'gray.300'} rounded={'2xl'}>
            <TextInput
              placeholder="Add Options"
              placeholderTextColor={'black'}
              style={{fontSize: 18, padding: 10, color: 'black'}}
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
          <Box w={'full'} bgColor={'gray.300'} rounded={'2xl'}>
            <TextInput
              placeholder="Add Answer"
              placeholderTextColor={'black'}
              style={{fontSize: 18, padding: 10, color: 'black'}}
              value={answer}
              onChangeText={text => setAnswer(text)}
            />
          </Box>

          <Box my={'2'}>
            <Button title={'Add Question'} onPress={() => AddQuiz()} />
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default Quiz;
