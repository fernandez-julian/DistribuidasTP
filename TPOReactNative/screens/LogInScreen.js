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
import { Button } from 'react-native-material-ui';
import { Text, StyleSheet, View } from "react-native";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../components/usr.png";
import colors from "../config/colors";
import strings from "../config/strings";
import LottieView from 'lottie-react-native';
import Dialog from "react-native-dialog";

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
    check: {
      alignItems: 'center',
      flex : 1,
      marginTop: 100,
    },
    usr: {
      flex: 1,
        height: 250,
        width: 100,
        padding: 100,
        margin: 0,
        position: 'absolute',
        marginTop: 50,
    },

  });
  

class LogInScreen extends React.Component {

    state = {
        nombre: '',
        clave: '',
        successText: '',
        loading: false,
        isDialogVisible: false,
      };

    static navigationOptions = {
      title: 'Iniciar sesion',
    };
  
  
    handleChange = name => event => {
      this.setState({ [name]: event });
      console.log(this.state);
    };

      iniciarSesion () {
        this.setState({loading: true})
        /*requestBody.nombre = this.state.nombre;
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
    */};

    onPressText = () => {
      this.setState({isDialogVisible: true});
    } 

    render() {
      
      return (

        <View style={styles.container}>
        <LottieView 
           style ={styles.usr}
          source={require('../assets/animations/user.json')} 
          autoPlay loop ={false} />
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
          
        {
            this.state.loading == false
            ?  <View>
                 <Button raised primary text="iniciar sesion"
                 onPress={() => {this.iniciarSesion()}}/>
                  <Text style={{color: 'red', marginTop:35, alignSelf: "center"}} onPress={this.onPressText}>
                  Cambiar contraseña
                  </Text>
              </View>
            : 
               <LottieView 
               style ={styles.check}
               source={require('../assets/animations/Check-Mark-Success-Data.json')} 
               autoPlay loop ={false} />
              
          } 
          
        </View>
       
        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>Cambiar contraseña</Dialog.Title>
          <Dialog.Description>
            Su contraseña debe ser diferente a las 10 anteriores
          </Dialog.Description>
          <Dialog.Input placeholder="Nombre de usuario"></Dialog.Input>
          <Dialog.Input placeholder="Contraseña actual"></Dialog.Input>
          <Dialog.Input placeholder="Contraseña Nueva"></Dialog.Input>
          <Dialog.Button label="Cancelar" onPress= {() => this.setState({isDialogVisible: false})}/>
          <Dialog.Button label="Aceptar" />
        </Dialog.Container>
       
      </View>
    );
    }
}
export default LogInScreen;

