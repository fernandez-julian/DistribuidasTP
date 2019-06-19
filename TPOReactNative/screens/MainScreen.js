import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-material-ui';


const styles = StyleSheet.create({
    container: {
      /*flex: 1,*/
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

class MainScreen extends React.Component {
    static navigationOptions = {
      title: 'Aplicaciones distribuidas',
    };
  
    IniciarSesion(){
        /*const { navigate } = this.props.navigation;
        navigate("Register");*/
        this.props.navigation.navigate('LogIn');
        this.setState({nombre: ""});
        this.setState({clave: ""});
        this.setState({successText: ""});
      }

    render() {
      return (
        <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
        
            <View style={styles.container}>
           <Button raised primary text="iniciar sesion" onPress={() => {
            this.IniciarSesion()
          }}/>
        </View>
        <View style={styles.container}>
           <Button raised default text="registrarse" />
        </View>
        </ScrollView>
        
      );
    }
}
export default MainScreen;