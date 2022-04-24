import { ScrollView, Text, TextInput, View, Switch, Linking } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import uuid from 'react-native-uuid';

import mapMaker from "../../images/map-marker.png";
import api from "../../services/axios";
import styles from "./styles";

interface DetailsRouteParams 
{
  id: string;
}

interface Farms 
{
  id: string;
  name: string;
  type: string;
  size: string;
  latitude: number;
  longitude: number; 
  status: string;
}

export default function FazendaEdit()
{
  const route = useRoute();
  const navigation = useNavigation();
  const dataKey = '@appIF:Farm';

  const [ farms , setFarms ] = useState<Farms[]>([]);
  const [ farm, setFarm ] = useState<Farms>();

  const [ initialPosition, setInitialPosition ] = useState({ latitude: 0, longitude: 0 });
  const params = route.params as DetailsRouteParams;

  useFocusEffect(() =>
  {

    async function load()
    {
      const dataKey = '@appIF:Farm';
      const response = await AsyncStorage.getItem( dataKey );

      const responseFormatted = response ? JSON.parse( response ) : [];
      const expensives = responseFormatted;

      setFarms( expensives );  
    }

    load();

  });

  useEffect(() => 
  {

    async function load() 
    { 
      const farmsObj =  farms.find( farms => farms.id === params.id );
      const latitude = Number( farmsObj?.latitude );
      const longitude = Number( farmsObj?.longitude );

      setInitialPosition( { latitude, longitude } );
      setFarm( farmsObj );   
    }

    load();

  }, [ farms ] );

  
  const [ name, setName ] = useState( String( farm?.name ) );
  const [ size, setSize ] = useState( String( farm?.size ) );
  const [ type, setType ] = useState( String( farm?.type ) );
  const [ status, setStatus ] = useState( String( farm?.status ) );
  

  if (!farm) 
  {
    return (
      <View style = { styles.container } >
        <Text style = { styles.title }>Carregando...</Text>
      </View>
    );
  }

  async function handleCreateFarm( obj = {}, id : string )
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
      navigation.navigate("Home" );

    } 
    catch ( error ) 
    {
      console.log( error );
    }

  }


  async function handleEdit() 
  {   
      const amountOffood = 
      ( 
          type === "Braquiarão" ? 14000 : type === "Mombaça" ? 28000 : type === "Tanzania" ? 21000 : 
          type === "Tifton" ? 12600 : type === "Colonião" ? 12600 : 14000
      );

      let obj = {};

      obj = 
      {
        id: farm?.id,
        name: name == "" ? farm?.name : name,
        countFood: String( amountOffood ),
        type: type == "" ? "Braquiarão" : String( type ),
        size: String( size == "" ? farm?.size : size ),
        latitude: String( initialPosition.latitude ),
        longitude: String( initialPosition.longitude ),
        status: String( status == "" ? farm?.status : status ),
        id_user: String( uuid.v4() ),
      }

      if( name != farm?.name )
      {
        const farmsExistsAlert =  farms.find( farms => farms.name ===  name );

        if( farmsExistsAlert?.id === undefined )       
          handleCreateFarm( obj, String( farm?.id ) );
        else
          alert( size === "" ? "Ops! O Campo : Tamanho do pasto e Obrigatorio" : "Ops! Ja existe um pasto com esse nome" );
      }
      else
         handleCreateFarm( obj, String( farm?.id ) );
  } 

  function handleManagePasture( id: string )
  {
     navigation.navigate("ManagePasture", { id } );
  }

  return (
      <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
      >
        <Text style={styles.title}> { farm.name } </Text>

        <RectButton style={styles.button} onPress = { () => handleManagePasture(  farm.id  )  }>
          <MaterialCommunityIcons name = "cog-outline" size = { 35 } color="#000" /> 
        </RectButton>

        <View style={styles.mapView}>
          <MapView
              region={{
                latitude:  initialPosition.latitude ,
                longitude: initialPosition.longitude ,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}

              zoomEnabled = { false }
              pitchEnabled = { false }
              scrollEnabled = { false }
              rotateEnabled = { false }
              style = { styles.map }

            >
              <Marker
                icon={ mapMaker }
                coordinate={{
                  latitude: Number( farm.latitude ),
                  longitude: Number( farm.longitude ),
                }}
              />

          </MapView>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput 
            style={styles.input}
            placeholder = { farm.name }
            onChangeText = { setName } 
          />

        <Text style={styles.label}>Tamanho em hectares</Text>
        <TextInput 
            style={styles.input} 
            keyboardType = "numeric"  
            placeholder = { farm.size }
            onChangeText = { setSize }  
        />

        <Text style={styles.label}>Tipo</Text>

        <Picker mode = "dropdown"  
          selectedValue = { type }
          onValueChange = { ( itemValue, itemIndex ) =>
            setType( itemValue )
          }>

            <Picker.Item label = "Braquiarão" value = "Braquiarão" style = { styles.picker } />
            <Picker.Item label = "Mombaça" value = "Mombaça" style = { styles.picker } />
            <Picker.Item label = "Tanzania" value = "Tanzania" style = { styles.picker } />
            <Picker.Item label = "Tifton" value = "Tifton" style = { styles.picker } />
            <Picker.Item label = "Colonião" value = "Colonião" style = { styles.picker } />
        
        </Picker>


       
        <Text style={styles.label}>O pasto esta disponivel ?</Text>
         
        <Picker mode = "dropdown"  
          selectedValue = { String( status )}
          onValueChange = { ( itemValue, itemIndex ) =>
            setStatus( itemValue )
          }>

            <Picker.Item label = "Sim" value= "true" style = { styles.picker } />
            <Picker.Item label = "Não" value = "false" style = { styles.picker } />
        
        </Picker>


        <RectButton style={styles.nextButton} onPress={ handleEdit  }>
          <Text style={styles.nextButtonText}> Editar </Text>
        </RectButton>

    </ScrollView>
    );
}
