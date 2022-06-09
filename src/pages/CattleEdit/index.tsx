import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import  DatePicker  from 'react-native-datepicker';
import uuid from 'react-native-uuid';

import styles from "./styles";

interface DetailsRouteParams 
{
    id: string;
}

interface Cattle
{
    id: String;
    name: string;
    breed: string; 
    status: boolean;
    initialWeight: number; 
    node: string;
    weight: number;  
    sex: string;
    age: Date;  
    purchaseValue: number;
    datePurchase: Date;
    earring: number;
    matriz: string;
    farm: string;
    occupancyRate: number;
    id_user: string;
}

export default function Data() {

  const dataKey = '@appIF:Cattle';
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as DetailsRouteParams;
  
  const [ name, setName ] = useState("");
  const [ count, setCount ] = useState(" ");
  const [ weight, setWeight ] = useState("");
  const [ purchaseValue, setPurchaseValue ] = useState("");
  const [ datePurchase, setDatePurchase ] = useState("");
  const [ age, setAge ] = useState("");
  const [ node, setNode ] = useState("");
  const [ earring, setEarring ] = useState(" ");
  const [ sex, setSex ] = useState( "" );
  const [ breed, setBreed ] = useState( "" );
  const [ status, setStatus ] = useState( "");

  const [ cattle , setCattle ] = useState<Cattle[]>([]);
  const [ cattlee , setCattlee ] = useState<Cattle>();
  
  
  useEffect(() => 
  {

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

    loadCattle();
    loand();

  }, [ cattle ]);
 
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
      if( currentData.length > 1 )
      {
        currentData.forEach( ( element: { id: string; }) => {

          if( element.id != id )    
          { 
            newData[i] = element;  
            i++;
          }
          
        });

        dataFormatted = [
          ...newData,
          obj
        ];
      }
      else
        dataFormatted = [ obj ];
     
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

    let obj = {};
   
    obj = 
    {
        id: cattlee?.id ,
        name: String( name !== "" ? name : cattlee?.name ),
        breed: String( breed !== "" ? breed : cattlee?.breed ),
        status:  String( status !== "" ? status : cattlee?.status ),
        initialWeight:  String( weight !== "" ? weight : cattlee?.weight ),
        weight:  String( weight !== "" ? weight : cattlee?.weight ),   
        purchaseValue:  String( purchaseValue == "" ? cattlee?.purchaseValue : purchaseValue ),
        datePurchase: String( datePurchase === "" ? cattlee?.datePurchase : datePurchase ),
        age: String( age  === "" ? cattlee?.age : age ),
        sex: String( sex !== "" ? sex : cattlee?.sex ),
        node:  String( node !== "" ? node : cattlee?.node ),
        earring : String( earring !== "" ?  earring : cattlee?.earring ),
        matriz: String( cattlee?.matriz ),
        farm: String( cattlee?.farm ),
        occupancyRate: String( cattlee?.occupancyRate ),
        id_user: String( cattlee?.id_user ),
          
    }
  
    if( name != cattlee?.name && name != "")
    {
       const cattleExistsAlert =  cattle.find( cattle => cattle.name ===  name );

       if( cattleExistsAlert != undefined)   
          alert("Ops! Ja existe um animal com esse nome");     
    }
    else if( earring != String( cattlee?.earring ) && earring != "")
    {
       const cattleEarringExistsAlert = cattle.find( cattle => cattle.earring == Number( earring ) );

       if( cattleEarringExistsAlert != undefined && cattleEarringExistsAlert == undefined )      
          alert("Ops! Ja existe um animal com esse brinco");
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
         placeholder = { String( cattlee?.name ) }
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
         value = { weight }  
         placeholder = { String( cattlee?.weight ) }
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
          placeholder = { String( cattlee?.age ) }
          mode="date"
          format="DD-MM-YYYY"
          minDate="01-01-1980"
          maxDate="31-12-2022"
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
         value = { earring }  
         placeholder = { String( cattlee?.earring ) }
         keyboardType = "numeric"
         onChangeText = { setEarring } 
       /> 

      <Text style={styles.label}> Observações ( Opcional) </Text>

      <TextInput 
        style={styles.input}
        value = { node }  
        placeholder = { String( cattlee?.node ) }
        onChangeText = { setNode } 
      /> 

      <Text style={styles.label}> Valor da compra ( Opcional ) </Text>
      
      <TextInput 
         style={styles.input} 
         value = { purchaseValue }  
         placeholder = { String( cattlee?.purchaseValue ) }
         keyboardType = "numeric"
         onChangeText = { setPurchaseValue } 
       /> 

      <Text style={styles.label}> Data da compra ( Opcional ) </Text>
      
      <DatePicker
          style={{width: 350, marginBottom: 16, marginTop: 12 }}
          date={ datePurchase }
          mode="date"
          placeholder = { String( cattlee?.datePurchase )  }
          format="DD-MM-YYYY"
          minDate="01-01-2022"
          maxDate="31-12-2002"
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
        selectedValue = { breed == "" ? cattlee?.breed : breed }
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
        selectedValue = { sex == "" ? cattlee?.sex : sex }
        onValueChange={ ( itemValue, itemIndex ) =>
          setSex( itemValue )
        }>

          <Picker.Item style={styles.picker} label = "Fêmea" value = "f" />
          <Picker.Item style={styles.picker} label = "Macho" value = "m" />

  
      </Picker>

      <Text style={styles.label}> Status </Text>

      <Picker mode = "dropdown"  
        selectedValue = { String( status == "" ? cattlee?.status : status ) }
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
