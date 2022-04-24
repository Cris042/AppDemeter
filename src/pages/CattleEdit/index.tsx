import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Switch } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { TextInputMask } from 'react-native-masked-text';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import  DatePicker  from 'react-native-datepicker';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';

import styles from "./styles";

interface DetailsRouteParams 
{
  id: string;
}

interface Farms 
{
  id: number;
  name: string;
  size: number;
  countFood: number;
  latitude: number;
  longitude: number;
}

interface Cattle
{
  id: String;
  name: string;
  breed: string; 
  status: boolean;
  initialWeight: number; 
  node: string;
  Weight: number;  
  sex: string;
  age: Date;  
  purchaseValue: number;
  datePurchase: Date;
  earring: number;
}

export default function Data() {

  const dataKey = '@appIF:Cattle';
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as DetailsRouteParams;
  
  const [ farms , setFarms ] = useState<Farms[]>([]);
  const [ cattle , setCattle ] = useState<Cattle[]>([]);
  const [ cattlee , setCattlee ] = useState<Cattle>();
  
  useEffect(() => 
  {

    async function loadPiket() 
    {
       const response = await AsyncStorage.getItem( '@appIF:Farm' );

       const responseFormatted = response ? JSON.parse( response ) : [];
       const expensives = responseFormatted;

       setFarms( expensives );  
    }

    async function loadCattle() 
    {
       const response = await AsyncStorage.getItem( dataKey );

       const responseFormatted = response ? JSON.parse( response ) : [];
       const expensives = responseFormatted;

       setCattle( expensives );
    }

    async function loand()
    {
        const cattleObj =  cattle.find( cattle => cattle.id === params.id );
        setCattlee( cattleObj );  
    }


    loadPiket();
    loadCattle();
    loand();

  }, [ cattle ]);

  const [ name, setName ] = useState( cattlee?.name );
  const [ count, setCount ] = useState("");
  const [ breed, setBreed ] = useState( cattlee?.breed );
  const [ status, setStatus ] = useState( String( cattlee?.status ) );
  const [ weight, setWeight ] = useState( String( cattlee?.Weight ) );
  const [ purchaseValue, setPurchaseValue ] = useState( String( cattlee?.purchaseValue ) ); 
  const [ datePurchase, setDatePurchase ] = useState( String( cattlee?.datePurchase ) );
  const [ age, setAge ] = useState( String( cattlee?.age) );
  const [ sex, setSex ] = useState( String( cattlee?.sex ) );
  const [ node, setNode ] = useState( String( cattlee?.node ) );
  const [ earring, setEarring ] = useState( String( cattlee?.earring ) );
 

  async function handleCreate( obj = {}, id: string )
  {
    const data = await AsyncStorage.getItem( dataKey );
    const currentData = data ? JSON.parse( data ) : [];
    AsyncStorage.removeItem( dataKey );
      
    let newData = [{}];
    let dataFormatted = [];
    let i = 0;

    try 
    {
      currentData.forEach( ( element: { id: string; }) => {

        if( element.id != id )     
           newData[i] = element;  

        i++;
      });

      dataFormatted = [
        ...newData,
        obj
      ];
     
      await AsyncStorage.setItem( dataKey, JSON.stringify( dataFormatted ) );    
      navigation.navigate("ListarGados" );

    } 
    catch ( error ) 
    {
      console.log( error );
    }
  }

  async function handle() 
  {

    
    const consumptionBreed = 
    ( 
        breed === "Nelore" ? 3285 : breed === "Holandês" ? 5475 : breed === "Guzerá" ? 5110 : 
        breed === "Girolando" ? 3358 : breed === "Brahman" ? 5657 : breed === "Jersey" ? 4124 : 3285
    );
  

    var obj = {};
    var earringAux = Number( earring );

    obj = 
    {
        id: cattlee?.id ,
        name: String( name ),
        breed: String( breed ),
        status:  String( status ),
        initialWeight:  String( weight ),
        weight:  String( weight ),   
        purchaseValue:  String( purchaseValue === "" ? "0" : purchaseValue ),
        datePurchase: String( datePurchase === "" ? cattlee?.datePurchase : datePurchase ),
        age: String( age  === "" ? cattlee?.age : age ),
        sex: String( sex ),
        node:  String( node ),
        earring : String( earring === " " ?  uuid.v4() : earringAux ),
        id_user: String( uuid.v4() ),
          
    }
    
    if( earring != String( cattlee?.earring ) )
    {
      const cattleEarringExistsAlert = cattle.find( cattle => cattle.earring == Number( earring ) );

      if( cattleEarringExistsAlert == undefined )
      {
        handleCreate( obj, String( cattlee?.id ) );
        navigation.navigate("ListarGados" );
      }
      else
        alert( "");

    }
    else if( name != cattlee?.name )
    {
      const cattleExistsAlert =  cattle.find( cattle => cattle.name ===  name );

      if( cattleExistsAlert == undefined )
      {
        handleCreate( obj, String( cattlee?.id ) );
        navigation.navigate("ListarGados" );
      }
      else
        alert("Ops! Ja existe um animal com esse nome");

    }
    else
    {
      handleCreate( obj, String( cattlee?.id ) );
      navigation.navigate("ListarGados" );
    }

    
  } 

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Cadastro de Animal </Text>

      <Text style={styles.label}>Nome ( O nome será gerado automaticamente caso deixer o campo vazio ) </Text>
      
      <TextInput 
         style={styles.input} 
         value = { name }  
         onChangeText = { setName }    
       />

      <Text style={styles.label}> Numero de gados ( Opcional, O nome dos gados serão gerado automaticamente ) </Text>

      <TextInput 
        style={styles.input} 
        value = { count }   
        keyboardType = "numeric"
        onChangeText = { setCount } 
      /> 

      <Text style={styles.label}> Peso ( kilos ) </Text>
      
      <TextInput 
         style={styles.input} 
         value = { String( weight ) }  
         keyboardType = "numeric"
         onChangeText = { setWeight } 
       /> 

      <Text style={styles.label}> Data de Nacimento </Text>
      
      {/* <TextInputMask
         type={'datetime'}
         options = {{
          format: 'DD/MM/YYYY'
         }}
         style={ styles.input }
         value={ idade }
         onChangeText = { setIdade }
      /> */}

        <DatePicker
          style={{width: 350, marginBottom: 16, marginTop: 12 }}
          date={ age }
          placeholder = { String( age )}
          mode="date"
          format="DD-MM-YYYY"
          minDate="01-01-1980"
          maxDate="31-12-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: "#d3e2e6",
              backgroundColor: "#fff",
              borderWidth: 1.8,
              borderRadius: 20,
              height: 50,
            }
        }}
        onDateChange={ setAge }
      />

      <Text style={styles.label}> Numero do Brinco ( Opcional) </Text>

      <TextInput 
         style={styles.input} 
         value = { String( earring ) }  
         keyboardType = "numeric"
         onChangeText = { setEarring } 
       /> 

      <Text style={styles.label}> Observações ( Opcional) </Text>

      <TextInput 
        style={styles.input}
        value = { String( node ) }  
        onChangeText = { setNode } 
      /> 

      <Text style={styles.label}> Valor da compra ( Opcional ) </Text>
      
      <TextInput 
         style={styles.input} 
         value = {  String( purchaseValue ) }  
         keyboardType = "numeric"
         onChangeText = { setPurchaseValue } 
       /> 

      <Text style={styles.label}> Data da compra ( Opcional ) </Text>
      
      <DatePicker
          style={{width: 350, marginBottom: 16, marginTop: 12 }}
          date={ datePurchase }
          mode="date"
          placeholder = { String( datePurchase )  }
          format="DD-MM-YYYY"
          minDate="01-01-2021"
          maxDate="31-12-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: "#d3e2e6",
              backgroundColor: "#fff",
              borderWidth: 1.8,
              borderRadius: 20,
              height: 50,
            }
        }}
        onDateChange={ setDatePurchase }
      />
     
      <Text style={styles.label}> Raça </Text>

      <Picker mode = "dropdown" style = { styles.pickerInput }
        selectedValue = { breed }
        onValueChange={ ( itemValue, itemIndex ) =>
          setBreed( itemValue )
        }>

         <Picker.Item label = "Nelore" value = "Nelore" />
         <Picker.Item label = "Holandês" value = "Holandês" />
         <Picker.Item label = "Guzerá" value = "Guzerá" />
         <Picker.Item label = "Girolando" value = "Girolando" />
         <Picker.Item label = "Brahman" value = "Brahman" />
         <Picker.Item label = "Jersey" value = "Jersey" />

      </Picker>

      <Text style={styles.label}> Sexo </Text>

      <Picker mode = "dropdown" style = { styles.pickerInput }
        selectedValue = { sex }
        onValueChange={ ( itemValue, itemIndex ) =>
          setSex( itemValue )
        }>

          <Picker.Item style={styles.picker} label = "Fêmea" value = "f" />
          <Picker.Item style={styles.picker} label = "Macho" value = "m" />

  
      </Picker>

      <Text style={styles.label}> Status </Text>

      <Picker mode = "dropdown"  
        selectedValue = { String( status ) }
        onValueChange={ ( itemValue, itemIndex ) =>
          setStatus( itemValue )
        }>
    
          <Picker.Item style={styles.picker} label = "Ativo" value = "a" />
          <Picker.Item style={styles.picker} label = "Emprestado" value = "e" />   
          <Picker.Item style={styles.picker} label = "Locado" value = "l" />
          <Picker.Item style={styles.picker} label = "Morto" value = "m" />
        
      </Picker>
 
      <RectButton style={styles.nextButton} onPress={ handle }>
        <Text style={styles.nextButtonText}>Editar</Text>
      </RectButton>

    </ScrollView>
  );
}
