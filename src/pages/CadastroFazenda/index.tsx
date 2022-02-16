import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Switch, } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';


import styles from "./styles";

interface DataRouteParams 
{
  position: 
  {
    latitude: number;
    longitude: number;
  };
}

interface Types 
{
  id: number;
  name: string;
  amountOffood: number;
}

const schema = Yup.object().shape
({
    name: Yup.string().min( 3, "Digite Pelo menos 3 Caracteres" ),
    type: Yup.number().required().positive().integer(),
});

export default function Data() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as DataRouteParams;

  const [ name, setName ] = useState("");
  const [ size, setSize ] = useState("");
  const [ type, setType ] = useState("");
  const [ types, setTypes ] = useState<Types[]>([]);
  const [ status, setStatus ] = useState( true );

  async function handleCreate() 
  {
      const dataKey = '@appIF:Farm';
      const { latitude, longitude } = params.position;

      // const { control, handleSubmit, reset, formState: { errors } } = useForm({
      //   resolver: yupResolver( schema )
      // });

      const amountOffood = 
      ( 
          type === "Braquiarão" ? 14000 : type === "Mombaça" ? 28000 : type === "Tanzania" ? 21000 : 
          type === "Tifton" ? 12600 : type === "Colonião" ? 12600 : 14000
      );

      const obj = 
      {
        id: String( uuid.v4() ),
        name: name === "" ? "Pasto " + Math.floor( Math.random() * 1000 + 256 ) : name ,
        countFood: String( amountOffood ),
        type: type === "" ? "Braquiarão" : String( type ),
        size: String( size ),
        latitude: String( latitude ),
        longitude: String( longitude ),
        status: String( status ),
        id_user: String( uuid.v4() ),
      }

      try 
      {
        const data = await AsyncStorage.getItem( dataKey );
        const currentData = data ? JSON.parse( data ) : [];

        const dataFormatted = [
          ...currentData,
          obj
        ];

        await AsyncStorage.setItem( dataKey, JSON.stringify( dataFormatted ) );     
        navigation.navigate("Home" );

      } 
      catch ( error ) 
      {
         console.log( error );
      }
   
  } 

  useEffect( () => 
  {
      async function loadData() 
      {
        const dataKey = '@appIF:Farm';
        const data = await AsyncStorage.getItem( dataKey );
      }

      loadData();

  },[] );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Cadastro de Pasto</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value = { name }  placeholder = "Nome do pasto ( O nome será gerado automaticamente caso deixer o campo vazio )" onChangeText = { setName } />

      <Text style={styles.label}>Tamanho em hectares</Text>
      <TextInput style={styles.input} value = { size }  keyboardType = "numeric"  placeholder = "Tamanho do pasto" onChangeText = { setSize } />

      <Text style={styles.label}>Tipo</Text>

      <Picker mode = "dropdown"  
        selectedValue = { type }
        onValueChange={ ( itemValue, itemIndex ) =>
          setType( itemValue )
        }>

          <Picker.Item label = "Braquiarão" value = "Braquiarão" style={styles.picker} />
          <Picker.Item label = "Mombaça" value = "Mombaça" style={styles.picker} />
          <Picker.Item label = "Tanzania" value = "Tanzania" style={styles.picker} />
          <Picker.Item label = "Tifton" value = "Tifton" style={styles.picker} />
          <Picker.Item label = "Colonião" value = "Colonião" style={styles.picker} />
       
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>O pasto esta disponivel ?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={ status }
          onValueChange={ setStatus }
        />
      </View>
      
      <RectButton style={styles.nextButton} onPress={ handleCreate }>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>

    </ScrollView>
  );
}
