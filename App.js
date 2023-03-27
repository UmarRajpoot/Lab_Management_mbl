import React from 'react';

import {NativeBaseProvider} from 'native-base';
import HomeTabs from './Src/Tabs/HomeTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPc from './Src/Screens/AllPc';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Src/Store/RootReducer';
import PcDetail from './Src/Screens/PcDetail';
import AssignmentDetail from './Src/Screens/AssignmentDetail';
import AddAssignment from './Src/Screens/AddAssignment';

const store = createStore(RootReducer, applyMiddleware(thunk));

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="AllPc" component={AllPc} />
        <Stack.Screen name="PcDetail" component={PcDetail} />
        <Stack.Screen name="AssignDetail" component={AssignmentDetail} />
        <Stack.Screen name="AddAssign" component={AddAssignment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeBaseProvider>
  );
};
