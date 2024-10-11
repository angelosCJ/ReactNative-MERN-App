import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {

  const window = useWindowDimensions();
  const signup = useNavigation();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const goToSignIn = () => {
      signup.navigate('SignIn');
  }

  const handleSubmit = async (e:any) => {
     e.preventDefault();
       try {
        await axios.post("http://192.168.100.3:8080/register", { name, email, password });
        console.log("Successful Registration of user credentials");
       } catch (error) {
         console.log("Failed to register",error);
       }
  }

  return (
    <View style={[styles.container,{height:window.height,width:window.width}]}>
     <View style={[styles.frame,{height:window.height*0.9,width:window.width*0.9,top:window.height*0.015}]} >
     <Text style={[styles.label,{top:window.height*0.08}]} >Sign Up</Text>
     <TextInput placeholder='Name' value={name} onChangeText={text => setName(text)} style={[styles.input,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.15}]} />
     <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={[styles.input,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.2}]} />
     <TextInput secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} placeholder='Password' style={[styles.input,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.25}]} />
     <TouchableOpacity onPress={handleSubmit}  style={[styles.signUpButton,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.3}]} >
      <View><Text style={[styles.btnText,{}]} >Register</Text></View>
     </TouchableOpacity >
     <TouchableOpacity  onPress={goToSignIn} style={[styles.signInButton,{height:window.height*0.08,width:window.width*0.8,top:window.height*0.35}]} >
      <View><Text style={[styles.btnText2,{}]} >go to sign in</Text></View>
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
  signUpButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
   borderRadius:50,
   backgroundColor:'black',
  },
  signInButton:{
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
