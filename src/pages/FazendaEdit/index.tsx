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

  const [ farms , setFarms ] = useState<Farms[]>([]);
  const [ farm, setFarm ] = useState<Farms>();

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
      setFarm( farmsObj );   
    }

    load();

  }, [ farms ] );

  if (!farm) 
  {
    return (
      <View style = { styles.container } >
        <Text style = { styles.title }>Carregando...</Text>
      </View>
    );
  }
 
  async function handleEdit() 
  {   
    alert("Ops!")
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
              initialRegion={{
                latitude: -16.81508090497519,
                longitude: -48.02909970297907,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={ styles.map }
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
        <TextInput style={styles.input} value = { farm.name } placeholder = "Nome do pasto ( Minimo 3 letras )"  />

        <Text style={styles.label}>Tamanho em hectares</Text>
        <TextInput style={styles.input} value = { farm.size }  keyboardType = "numeric"  placeholder = "Tamanho do pasto" />

        <Text style={styles.label}>Tipo</Text>

        <Picker mode = "dropdown"  >
          <Picker.Item  label = { farm.type } value = {  farm.type } style = {styles.picker} />
        </Picker>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>O pasto esta disponivel ?</Text>
          <Switch
            thumbColor="#fff"
            value = { true }
            trackColor={{ false: "#ccc", true: "#39CC83" }}
          />
        </View>

        <RectButton style={styles.nextButton} onPress={ handleEdit  }>
          <Text style={styles.nextButtonText}> Editar </Text>
        </RectButton>

    </ScrollView>
    );
}
