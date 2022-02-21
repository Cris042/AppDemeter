import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View, Switch } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import  DatePicker  from 'react-native-datepicker'
import uuid from 'react-native-uuid';

import api from "../../services/axios";
import styles from "./styles";

interface Breed
{
  id: number;
  name: string;
  consumption: number;
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
  id: number;
  name: string;
  breed: string; 
  status: boolean;
  initialWeight: number; 
  Weight: number;  
  dateOfBirth: Date;  
}

export default function Data() {

  const dataKey = '@appIF:Cattle';
  const navigation = useNavigation();
  const route = useRoute();
  
  const [ name, setName ] = useState("");
  const [ count, setCount ] = useState("");
  const [ breed, setBreed ] = useState("3285");
  const [ status, setStatus ] = useState("a");
  const [ weight, setWeight ] = useState("");
  const [ purchaseValue, setPurchaseValue ] = useState("");
  const [ datePurchase, setDatePurchase ] = useState("");
  const [ age, setAge ] = useState("");
  const [ sex, setSex ] = useState("f");
  const [ node, setNode ] = useState("");
  const [ matriz, setMatriz ] = useState("-1");
  const [ earring, setEarring ] = useState("");
  const [ farm , setFarm ] = useState("-1");
 
  const [ farms , setFarms ] = useState<Farms[]>([]);
  const [ cattle , setCattle ] = useState<Cattle[]>([]);

  
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


    loadPiket();
    loadCattle();

  }, []);


  async function handleCreate() 
  {

    const nameCattle = ( name === "" ? breed +  Math.floor( Math.random() * 10000 + 256 ) : name );

    const typePiquet =  farms.find( farms => farms.id === parseInt( farm ) );
    const amountOffood = typePiquet?.countFood;

    const consumptionBreed = 
    ( 
        breed === "Nelore" ? 3285 : breed === "Holandês" ? 5475 : breed === "Guzerá" ? 5110 : 
        breed === "Girolando" ? 3358 : breed === "Brahman" ? 5657 : breed === "Jersey" ? 4124 : 3285
    );
  
    const occupancyRate =  ( amountOffood != null ? amountOffood : 0 ) / ( consumptionBreed != null ? consumptionBreed : 0 );

    const obj = 
    {
      id: String( uuid.v4() ),
      name: String( nameCattle ),
      breed: String( breed ),
      status:  String( status ),
      initialWeight:  String( weight ),
      weight:  String( weight ),
      purchaseValue:  String( purchaseValue === "" ? "0" : purchaseValue ),
      datePurchase: String( datePurchase === "" ? age : datePurchase ),
      age: String( age ),
      sex: String( sex ),
      node:  String( node ),
      earring : String( earring ),
      matriz: String( matriz ),
      const:  String( count ),
      farm: String( farm ),
      occupancyRate: String( occupancyRate.toFixed( 1 ) ),
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
      navigation.navigate("ListarGados" );

    } 
    catch ( error ) 
    {
       console.log( error );
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
         style={styles.input} value = { name }  
         onChangeText = { setName } 
       />

      <Text style={styles.label}> Numero de gados ( Opcional, O nome dos gados serão gerado automaticamente ) </Text>

      <TextInput 
        style={styles.input} value = { count }   
        keyboardType = "numeric"
        onChangeText = { setCount } 
      /> 

      <Text style={styles.label}> Peso ( kilos ) </Text>
      
      <TextInput 
         style={styles.input} value = { weight }  
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
          mode="date"
          placeholder="select date"
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
         style={styles.input} value = { earring }  
         keyboardType = "numeric"
         onChangeText = { setEarring } 
       /> 

      <Text style={styles.label}> Observações ( Opcional) </Text>

      <TextInput 
        style={styles.input} value = { node }  
        onChangeText = { setNode } 
      /> 

      <Text style={styles.label}> Valor da compra ( Opcional ) </Text>
      
      <TextInput 
         style={styles.input} value = { purchaseValue }  
         keyboardType = "numeric"
         onChangeText = { setPurchaseValue } 
       /> 

      <Text style={styles.label}> Data da compra ( Opcional ) </Text>
      
      <DatePicker
          style={{width: 350, marginBottom: 16, marginTop: 12 }}
          date={ datePurchase }
          mode="date"
          placeholder="select date"
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

      <Text style={styles.label}> Pasto ( Opcional ) </Text>

      <Picker mode = "dropdown" style = { styles.pickerInput } 
        selectedValue = { farm }
        onValueChange={ ( itemValue, itemIndex ) =>
          setFarm( itemValue )
        }>

          <Picker.Item label = "Escolhar uma Pasto" value = "-1" />
          { farms.map(( farm ) => 
          {
              return (
                <Picker.Item key = { farm.id } style={styles.picker}  label = { farm.name } value = { farm.id } />
              );
          })}
        

      </Picker>

      <Text style={styles.label}> Matriz ( Opcional ) </Text>

      <Picker style = { styles.pickerInput }
        selectedValue = { matriz }
        onValueChange={ ( itemValue, itemIndex ) =>
          setMatriz( itemValue )
        }>

          <Picker.Item label = "Escolhar uma Matriz" value = "-1" />
          {  cattle.map(( cattle ) => 
          {
              return (
                <Picker.Item key = { cattle.id } style={styles.picker} label = { cattle.name } value = { cattle.id } />
              );
          })}
          
      </Picker>
     
      <Text style={styles.label}> Raça </Text>

      <Picker mode = "dropdown" style = { styles.pickerInput }
        selectedValue = { breed }
        onValueChange={ ( itemValue, itemIndex ) =>
          setBreed( itemValue )
        }>

         <Picker.Item label = "Nelore" value = "3285" />
         <Picker.Item label = "Holandês" value = "5475" />
         <Picker.Item label = "Guzerá" value = "5110" />
         <Picker.Item label = "Girolando" value = "3358" />
         <Picker.Item label = "Brahman" value = "5657" />
         <Picker.Item label = "Jersey" value = "4124" />

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
        selectedValue = { status }
        onValueChange={ ( itemValue, itemIndex ) =>
          setStatus( itemValue )
        }>
    
          <Picker.Item style={styles.picker} label = "Ativo" value = "a" />
          <Picker.Item style={styles.picker} label = "Emprestado" value = "e" />   
          <Picker.Item style={styles.picker} label = "Locado" value = "l" />
          <Picker.Item style={styles.picker} label = "Morto" value = "m" />
        
      </Picker>
 
      <RectButton style={styles.nextButton} onPress={ handleCreate }>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>

    </ScrollView>
  );
}
