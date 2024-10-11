import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import axios from 'axios';


export default function SignIn() {

const window = useWindowDimensions();
const signin = useNavigation();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogIn = async (e:any) => {
  e.preventDefault();
    try {
      await axios.post("http://192.168.100.3:8080/login", {  email, password });
      console.log("Sing in Successful");
      signin.navigate('HomePage');
    } catch (error) {
      console.log("Unsuccessful log in",error);
    }
}

const goToSignUp = () => {
    signin.navigate('SignUp');
}

  return (
    <View style={[styles.container,{height:window.height,width:window.width}]}>
     <View style={[styles.frame,{height:window.height*0.9,width:window.width*0.9,top:window.height*0.015}]} >
     <Text style={[styles.label,{top:window.height*0.08}]} >Sign in</Text>
     <TextInput placeholder='email' value={email} onChangeText={text=> setEmail(text)} style={[styles.input,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.15}]} />
     <TextInput secureTextEntry={true} value={password} onChangeText={text=> setPassword(text)} placeholder='Password' style={[styles.input,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.2}]} />
     <TouchableOpacity  onPress={handleLogIn} style={[styles.logInButton,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.25}]} >
      <View><Text style={[styles.btnText,{}]} >Log in</Text></View>
     </TouchableOpacity >
     <TouchableOpacity  onPress={goToSignUp} style={[styles.registerButton,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.3}]} >
      <View><Text style={[styles.btnText2,{}]} >Sign Up</Text></View>
     </TouchableOpacity>
     </View>
      <StatusBar style="auto" backgroundColor='white'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame:{
    backgroundColor:'rgb(189,194,199)',
    borderRadius:20,
    alignItems:'center',
    flexDirection:'column',
  },
  label:{
    fontSize:50,
    fontWeight:'500',
    color:'black',
  },
  input:{
   textAlign:'center',
   borderColor:'black',
   borderWidth:2,
   borderRadius:50,
   fontSize:20,
  },
  logInButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
   borderRadius:50,
   backgroundColor:'black',
  },
  registerButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
   borderRadius:50,
   borderColor:'black',
   backgroundColor:'aliceblue',
  },
  btnText:{
    fontSize:25,
    fontWeight:'500',
    color:'aliceblue',
  },
  btnText2:{
    fontSize:25,
    fontWeight:'500',
    color:'black',
  },
});
