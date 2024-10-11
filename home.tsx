import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const window = useWindowDimensions();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneList, setPhoneList] = useState<unknown[]>([]);
  const [updates, setUpdates] = useState<{ [key: string]: { name: string; phoneNumber: string } }>({});

  const submitData = async () => {
    try {
      await axios.post("http://192.168.100.3:8080/insert", { name, phoneNumber });
      console.log("Successfully sent data into database");
      readData();
      setName('');
      setPhoneNumber('');
    } catch (error) {
      console.log("Unable to send data", error);
    }
  };

  const readData = async () => {
    try {
      const response = await axios.get("http://192.168.100.3:8080/read");
      setPhoneList(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const updateUserNameOrNumber = async (id: string) => {
    try {
      const { name: updateName, phoneNumber: updateNumber } = updates[id] || {};
      console.log("Updating with:", { id, name: updateName, phoneNumber: updateNumber });
      await axios.put("http://192.168.100.3:8080/update", { id, updateName, updateNumber });
      console.log("Update successful");
      readData(); // Refresh the data
      setUpdates('');
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    setUpdates(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const deleteUserData = async (id: string) => {
    await axios.delete(`http://192.168.100.3:8080/delete/${id}`);
    readData();
  };

  const refreshData = () => {
    readData();
  }

  useEffect(() => {
    readData();
  }, []);

  return (
    <View style={[styles.container, { height: window.height, width: window.width }]}>
      <View style={[styles.frame, { height: window.height * 0.9, width: window.width * 0.9, top: window.height * 0.02 }]}>
        <Text style={{ fontSize: 20, fontWeight: '700', left: window.width * 0.32 }}>Phone Book</Text>
        <View style={[styles.inputs, { height: window.height * 0.05, width: window.width * 0.9 }]}>
          <TextInput value={name} onChangeText={text => setName(text)} style={[styles.nameInput, { height: window.height * 0.04, width: window.width * 0.35 }]} placeholder='Name' />
          <TextInput value={phoneNumber} onChangeText={text => setPhoneNumber(text)} style={[styles.numberInput, { height: window.height * 0.04, width: window.width * 0.35 }]} placeholder='Number' />
          <TouchableOpacity onPress={submitData}>
            <View style={[styles.addButton, { height: window.height * 0.04, width: window.width * 0.175 }]}>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Add</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={refreshData} style={[styles.refreshButton, { height: window.height * 0.025, width: window.width * 0.175,top:window.height * 0.87,left:window.width * 0.35}]} >
            <View >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }} >refresh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.panel, { height: window.height * 0.75, width: window.width * 0.9, top: window.height * 0.01 }]}>
          <ScrollView>
            {phoneList.map((val: any, index: number) => (
              <View key={index}>
                <View style={[styles.display, { height: window.height * 0.03, width: window.width * 0.9 }]}>
                  <Text>{val.name}</Text>
                  <Text>{val.phoneNumber}</Text>
                  <TextInput
                    value={updates[val._id]?.name || ''}
                    onChangeText={text => handleInputChange(val._id, 'name', text)}
                    style={[styles.nameInput2, { height: window.height * 0.02, width: window.width * 0.15 }]}
                    placeholder='Name'
                  />
                  <TextInput
                    value={updates[val._id]?.phoneNumber || ''}
                    onChangeText={text => handleInputChange(val._id, 'phoneNumber', text)}
                    style={[styles.numberInput2, { height: window.height * 0.02, width: window.width * 0.15 }]}
                    placeholder='Number'
                  />
                  <TouchableOpacity onPress={() => updateUserNameOrNumber(val._id)} style={[styles.updateBtn, { height: window.height * 0.02, width: window.width * 0.14 }]}>
                    <View>
                      <Text>Update</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteUserData(val._id)} style={[styles.deleteBtn, { height: window.height * 0.02, width: window.width * 0.14 }]}>
                    <View>
                      <Text>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
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
   display:'flex',
   backgroundColor:'aliceblue',
   flexDirection:'column',
  },
  panel:{
   display:'flex',
   flexDirection:'column',
  },
  inputs:{
    display:'flex',
    flexDirection:'row',
    gap:5,
  },
  nameInput:{
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    borderRadius:50,
    fontSize:16,
  },
  numberInput:{
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    borderRadius:50,
    fontSize:16,
  },
  nameInput2:{
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    borderRadius:50,
    fontSize:16,
  },
  numberInput2:{
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    borderRadius:50,
    fontSize:16,
  },
  addButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    color:'white',
    borderRadius:50,
  },
  refreshButton:{
    display:'flex',
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    color:'white',
    borderRadius:50,
  },
  display:{
    display:'flex',
    flexDirection:'row',
    gap:10,
  },
  updateBtn:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'yellow',
  },
  deleteBtn:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red',
  },
});
