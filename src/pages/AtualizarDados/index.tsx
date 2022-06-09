import React,{ useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, View, Switch } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";

interface User
{
  id: string;
  name: string;
  email: string;
  isAdmin: number;
  avatar: string;
  token: string;
}

export default function Data() {

  const [ user, setUser ] = useState<User[]>([]);

  const [ name , setName ] = useState("");
  const [ email , setEmail ] = useState("");

  useEffect(() => 
  {
  
      async function load() 
      {
         const response = await AsyncStorage.getItem( '@appIF:User' );
  
         const responseFormatted = response ? JSON.parse( response ) : [];
         const expensives = responseFormatted;
  
         setUser( expensives );  
      }

      load();

  }, [  ]);

  console.log( user[0] );

  return (
    <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 24 }}
      >
      <Text style={styles.title}> { user[0]?.name } </Text>

      <Text style={styles.label}> Nome </Text>
      <TextInput 
         style={styles.input} 
         placeholder = { user[0]?.name }  
         onChangeText = { setName }  
       /> 

      <Text style={styles.label}> E-mail </Text>
      <TextInput 
          style={styles.input} 
          placeholder = { String( user[0]?.email ) }  
          onChangeText = { setEmail } 
      />   

      {/* <Text style={styles.nextButtonText}>Editar</Text> */}

    </ScrollView>
    
  );

}

