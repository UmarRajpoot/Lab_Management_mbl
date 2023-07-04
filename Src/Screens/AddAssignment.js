import {Box, Progress, Text} from 'native-base';
import React, {useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import BackHeader from '../Components/BackHeader';
import Button from '../Components/Button';
import firestore from '@react-native-firebase/firestore';
import Loading_Comp from '../Components/Loading_Comp';
import storage from '@react-native-firebase/storage';
import {Path, Svg} from 'react-native-svg';

//
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';

const AddAssignment = ({navigation}) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [fileName, setFileName] = useState('Choose Assignment File');

  const [transferred, setTransferred] = useState(0);

  // Image States
  const [file, setFile] = useState({
    uri: '',
  });
  const [Isloading, setIsLoading] = useState(false);

  const handleError = err => {
    if (isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const SelectFile = async () => {
    try {
      // DocumentPicker.releaseSecureAccess([])
      //   .then(() => {
      //     console.warn('releaseSecureAccess: success');
      //   })
      //   .catch(handleError);
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      // console.log(pickerResult.name);
      setFile({uri: pickerResult.fileCopyUri});
      setFileName(pickerResult.name.split(' ').join('_'));
    } catch (e) {
      handleError(e);
    }
  };

  const UploadImage = async () => {
    try {
      const {uri} = file;
      const filename = uri
        .substring(uri.lastIndexOf('/') + 1)
        .split('%20')
        .join('_');
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setIsLoading(true);
      setTransferred(0);
      console.log('Upload', filename);
      const taskref = storage().ref(filename);
      const task = taskref.putFile(uploadUri);

      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        );
      });

      try {
        await task;
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
      const getUrl = await taskref.getDownloadURL();
      console.log(getUrl);

      await firestore()
        .collection('Assignments')
        .add({
          assignmentURL: getUrl,
          assignmentName: assignmentName,
        })
        .then(resp => {
          alert('Uploaded.');
          setIsLoading(false);
          setTransferred(0);
          setFileName('');
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log('Error in Image to upload');
      setIsLoading(false);
    }
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
          Add Assignment
        </Text>
        <Text fontSize={'md'} px={'3'} py={'3'}>
          Assignment Name
        </Text>
        <Box
          w={'95%'}
          bgColor={'gray.600'}
          rounded={'2xl'}
          alignSelf={'center'}
          p={'2'}>
          <TextInput
            placeholder="Assignment Name"
            style={{fontSize: 18}}
            multiline
            value={assignmentName}
            onChangeText={text => setAssignmentName(text)}
          />
        </Box>
        <TouchableOpacity onPress={() => SelectFile()} activeOpacity={0.8}>
          <Box
            w={'95%'}
            my={'3'}
            bgColor={'gray.600'}
            rounded={'2xl'}
            alignSelf={'center'}
            p={'2'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={'white'}>
              <Path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></Path>
            </Svg>
            <Text fontSize={'lg'} color={'white'} p={'3'}>
              {fileName}
            </Text>
          </Box>
          <Box pb={'2'} px={'5'}>
            <Progress value={transferred} colorScheme={'emerald'} />
          </Box>
        </TouchableOpacity>

        <Box alignItems={'center'} height={'25%'}>
          <Button
            title={'Submit'}
            onPress={() => UploadImage()}
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
