import React from 'react';
/*import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';*/
import { Avatar, Button } from 'react-native-material-ui';
import { Image, StyleSheet, View } from "react-native";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../components/usr.png";
import colors from "../config/colors";
import strings from "../config/strings";
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
        maxWidth:80,
        maxHeight:80,
        marginTop: 250,
     padding: 1,
      resizeMode: "contain",
      alignSelf: "center"
    },
    form: {
      flex: 1,
      justifyContent: "center",
      width: "80%"
    },
   
  });
  

class LogInScreen extends React.Component {

    state = {
        nombre: '',
        clave: '',
        successText: '',
      };

    static navigationOptions = {
      title: 'Iniciar sesion',
    };
  
  
    handleChange = name => event => {
      this.setState({ [name]: event });
      console.log(this.state);
    };

      iniciarSesion () {
        requestBody.nombre = this.state.nombre;
        requestBody.clave = this.state.clave;
        fetch('/TPOSpring/login', {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
      }).then(response => { return response.json() })
      .then(response => {
        console.log(response);
        this.setState({ successText: response.mensaje });
        if(response.estado===true){
          //this.props.logIn();
        }
      });
  };



    render() {
      
      return (
            <View style={styles.container}>
              <Image source={imageLogo} style={styles.logo} />
              <View>
                <LottieView 
                 style ={styles.animation}
                source={require('../assets/animations/Check-Mark-Success-Data.json')} 
                autoPlay loop />
              </View>
              <View style={styles.form}>
                <FormTextInput
                  value={this.state.email}
                  onChangeText={this.handleChange('nombre')}
                  placeholder= "Nombre"
                />
                <FormTextInput
                  value={this.state.password}
                  onChangeText={this.handleChange('clave')}
                  placeholder= "Clave"
                />
                <Button raised primary text="iniciar sesion" onPress={() => {
            this.iniciarSesion()
          }}/>
              </View>
            </View>
          );

       /* return (
            <View style = {styles.container}>
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " Nombre"
                  placeholderTextColor = "#4580ea"
                  autoCapitalize = "none"
                  onChangeText = {this.handleEmail}/>
               
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " Clave"
                  placeholderTextColor = "#4580ea"
                  autoCapitalize = "none"
                  onChangeText = {this.handlePassword}/>
               
               <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                     () => this.login(this.state.email, this.state.password)
                  }>
                  <Text style = {styles.submitButtonText}> Aceptar </Text>
               </TouchableOpacity>
            </View>
         )*/
    }
}
export default LogInScreen;

