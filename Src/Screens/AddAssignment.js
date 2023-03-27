import {Box, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import BackHeader from '../Components/BackHeader';
import Button from '../Components/Button';
import firestore from '@react-native-firebase/firestore';
import Loading_Comp from '../Components/Loading_Comp';

const AddAssignment = ({navigation}) => {
  const [assignmentText, setAssignmentText] = useState('');

  const [Isloading, setIsLoading] = useState(false);

  const UploadAssignment = () => {
    setIsLoading(true);
    firestore()
      .collection('Assignment')
      .add({
        text: assignmentText,
      })
      .then(() => {
        console.log('Assignment Updated');
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      {Isloading && <Loading_Comp />}
      <ScrollView>
        <Box px={'3'}>
          <BackHeader
            pageTitle={'Detail'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Box>

        <Text fontSize={'2xl'} px={'3'} py={'3'}>
          Assignment Detail
        </Text>
        <Box
          w={'95%'}
          bgColor={'gray.600'}
          rounded={'2xl'}
          h={'96'}
          alignSelf={'center'}
          p={'2'}>
          <TextInput
            placeholder="Assignment"
            style={{fontSize: 20}}
            multiline
            value={assignmentText}
            onChangeText={text => setAssignmentText(text)}
          />
        </Box>
        <Box alignItems={'center'} height={'25%'}>
          <Button
            title={'Submit'}
            onPress={() => UploadAssignment()}
            styles={{
              marginTop: 10,
            }}
          />
        </Box>
      </ScrollView>
    </View>
  );
};

export default AddAssignment;
