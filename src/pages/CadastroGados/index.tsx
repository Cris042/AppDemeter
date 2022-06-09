import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import  DatePicker  from 'react-native-datepicker';
import uuid from 'react-native-uuid';

import styles from "./styles";

interface Farms 
{
  id: number;
  name: string;
  size: number;
  status: string;
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
  earring: number;
}

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

  const dataKey = '@appIF:Cattle';
  const navigation = useNavigation();
  const route = useRoute();
  
  const [ name, setName ] = useState("");
  const [ count, setCount ] = useState(" ");
  const [ breed, setBreed ] = useState("Nelore");
  const [ status, setStatus ] = useState("a");
  const [ weight, setWeight ] = useState("");
  const [ purchaseValue, setPurchaseValue ] = useState("");
  const [ datePurchase, setDatePurchase ] = useState("");
  const [ age, setAge ] = useState("");
  const [ sex, setSex ] = useState("f");
  const [ node, setNode ] = useState("");
  const [ matriz, setMatriz ] = useState("-1");
  const [ earring, setEarring ] = useState(" ");
  const [ farm , setFarm ] = useState("-1");
 
  const [ farms , setFarms ] = useState<Farms[]>([]);
  const [ cattle , setCattle ] = useState<Cattle[]>([]);
  const [ user, setUser ] = useState<User[]>([]);
  
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

    async function load() 
    {
       const response = await AsyncStorage.getItem( '@appIF:User' );

       const responseFormatted = response ? JSON.parse( response ) : [];
       const expensives = responseFormatted;

       setUser( expensives );  
    }

    load();
    loadPiket();
    loadCattle();

  }, [ cattle ]);


  async function handleCreatePicketUsed( objPicketUsed = [{}] )
  {
      var dataPicketUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );
      var currentDataPicketUsed = dataPicketUsed ? JSON.parse( dataPicketUsed ) : [];
      var dataFormattedPicketUsed = [];

      try 
      {  
          dataFormattedPicketUsed = [
            ...currentDataPicketUsed,
            ...objPicketUsed
          ];

          await AsyncStorage.setItem( '@appIF:PicketUsed' , JSON.stringify( dataFormattedPicketUsed ) );    
      
      } 
      catch ( error ) 
      {
          console.log( error );
      }
  }

  async function handleCreate( obj = [{}] )
  {
      var data = await AsyncStorage.getItem( dataKey );
      var currentData = data ? JSON.parse( data ) : [];
      var dataFormatted = [];

      try 
      {  
          dataFormatted = [
            ...currentData,
            ...obj
          ];
          
          await AsyncStorage.setItem( dataKey, JSON.stringify( dataFormatted ) );    
      
      } 
      catch ( error ) 
      {
          console.log( error );
      }
  }

  async function handle() 
  {

    const typePiquet =  farms.find( farms => farms.name ===  farm  );
    const amountOffood = typePiquet?.countFood;

    const consumptionBreed = 
    ( 
        breed === "Nelore" ? 3285 : breed === "Holandês" ? 5475 : breed === "Guzerá" ? 5110 : 
        breed === "Girolando" ? 3358 : breed === "Brahman" ? 5657 : breed === "Jersey" ? 4124 : 3285
    );
  
    const occupancyRate =  ( amountOffood != null ? amountOffood : 0 ) / ( consumptionBreed != null ? consumptionBreed : 0 );
    const aux = count === " " ? 1 : parseInt( count );

    const cattleExistsAlert =  cattle.find( cattle => cattle.name ===  name );
    const cattleEarringExistsAlert = cattle.find( cattle => cattle.earring == Number( earring ) );

    if( ( weight !== "" && age !== "" ) && ( cattleExistsAlert === undefined ) && ( cattleEarringExistsAlert === undefined || earring == " " ) )
    {

      var obj = [{}];
      var picketUsed = [{}];

      for ( let i = 0; i < aux; i++ ) 
      {
          var nameCattle = ( name === "" ? breed + Math.floor( Math.random() * 10000 + 256 ) : name );
          var id = String( uuid.v4() );
          var idPicketUsed = String( uuid.v4() );

          var earringAux = Number( earring ) + i;

          obj[ i ] = 
          {
            id: id,
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
            earring : String( earring === " " ?  null : earringAux ),
            matriz: String( matriz ),
            farm: String( typePiquet?.id ),
            occupancyRate: String( occupancyRate.toFixed( 1 ) ),
            id_user: String( user[0]?.id ),
          }

          picketUsed[ i ] = 
          {
            id: idPicketUsed,
            dateEntryPicket: new Date().toLocaleDateString(),
            dateExitPicket: null,
            picketID : typePiquet?.id,
            cattleID : id,
            occupancyRate : occupancyRate.toFixed( 1 ),
          }
      }
   
      handleCreate( obj );

      if( farm != "-1" && status != "l" )
        handleCreatePicketUsed( picketUsed );
      else
        alert("Nao foi possivel adicionar os gados ao pasto, pois nao e permetido adicionar gados que estao emprestados.");

      navigation.navigate("ListarGados" );

    }
    else
      alert
      (
          weight === "" || age === "" ? "Ops! O Campos Obrigatorio não foram preenchidos" : 
          cattleEarringExistsAlert !== undefined ? "Ops! Ja existe um animal com esse brinco"
          : "Ops! Ja existe um animal com esse nome" 
      );
    
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
          minDate="01-01-2000"
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
              if( String( farm.status ) == "true")
              {
                  return (
                    <Picker.Item key = { farm.id } style ={ styles.picker}  label = { farm.name } value = { farm.name } />
                  );
              }
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
        selectedValue = { status }
        onValueChange={ ( itemValue, itemIndex ) =>
          setStatus( itemValue )
        }>
    
          <Picker.Item style={styles.picker} label = "Ativo" value = "a" />
          <Picker.Item style={styles.picker} label = "Emprestado" value = "e" />   
          <Picker.Item style={styles.picker} label = "Locado" value = "l" />
      </Picker>
 
      <RectButton style={styles.nextButton} onPress={ handle }>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>

    </ScrollView>
  );
}
