import { useFocusEffect } from '@react-navigation/native';
import { Text, View, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import {  useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import uuid from 'react-native-uuid';

import styles from "./styles";

interface DetailsRouteParams 
{
    id: string;
}
interface Cattle
{
    id: number;
    name: string;
    breed: string; 
    status: boolean;
    initialWeight: number; 
    Weight: number;  
    age: Date;  
    sexo: string;
    occupancyRate: number;
}
interface PickedUsed
{
    id: string;
    dateEntryPicket: String,
    dateExitPicket: String,
    picketID : string,
    cattleID : number,
    occupancyRate : number,
}

interface Farms 
{
   id: string;
   name: string;
   size: number;
   countFood: number;
   latitude: number;
   longitude: number;
}

const CatleList: React.FC = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as DetailsRouteParams;

    const [ cattle , setCattle ] = useState<Cattle[]>([]);
    const [ pickedUsed , setPicketUsed ] = useState<PickedUsed[]>([]);

    const [ farms , setFarms ] = useState<Farms[]>([]);

    const now = new Date();
    let count = 0;

    useEffect(() => 
    {

      async function loadPicketUsed() 
      {
          const responsePickedUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );

          const responseFormattedPickedUsed = responsePickedUsed ? JSON.parse( responsePickedUsed ) : [];
          const expensivesPickedUsed = responseFormattedPickedUsed;

          setPicketUsed( expensivesPickedUsed );
      }
    
      async function load() 
      {
          const response = await AsyncStorage.getItem( '@appIF:Cattle' );
   
          const responseFormatted = response ? JSON.parse( response ) : [];
          const expensives = responseFormatted;
    
          setCattle( expensives );
      }

      async function loadPiket() 
      {
         const response = await AsyncStorage.getItem( '@appIF:Farm' );
  
         const responseFormatted = response ? JSON.parse( response ) : [];
         const expensives = responseFormatted;
  
         setFarms( expensives );  
      }

      load();
      loadPiket();
      loadPicketUsed();

    }, [ pickedUsed ]);


    async function handleAddCattleList( id: number )
    {
       
        const cattleExists = cattle.find( cattle => cattle.id ===  id );

        const consumptionBreed = 
        ( 
            cattleExists?.breed == "Nelore" ? 3285 : cattleExists?.breed == "Holandês" ? 5475 : cattleExists?.breed == "Guzerá" ? 5110 : 
            cattleExists?.breed == "Girolando" ? 3358 : cattleExists?.breed == "Brahman" ? 5657 : cattleExists?.breed == "Jersey" ? 4124 : 3285
        );

        const typePiquet =  farms.find( farms => farms.id === params.id  );
        const amountOffood = typePiquet?.countFood;

        const occupancyRate =  ( amountOffood != null ? amountOffood : 0 ) / ( consumptionBreed != null ? consumptionBreed : 0 );
      

        var idPicketUsed = String( uuid.v4() );
        var dataPicketUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );
        var currentDataPicketUsed = dataPicketUsed ? JSON.parse( dataPicketUsed ) : [];
        var dataFormattedPicketUsed = [];

        const objPicketUsed = 
        {
          id: idPicketUsed,
          dateEntryPicket: new Date().toLocaleDateString(),
          dateExitPicket: null,
          picketID : params.id,
          cattleID : id,
          occupancyRate : occupancyRate.toFixed( 1 ),
        }

        try 
        {  
            dataFormattedPicketUsed = [
                ...currentDataPicketUsed,
                objPicketUsed
            ];

            await AsyncStorage.setItem( '@appIF:PicketUsed' , JSON.stringify( dataFormattedPicketUsed ) );  

            const idPiket = params.id;
            navigation.navigate("AddCattle", { idPiket } );  
        
        } 
        catch ( error ) 
        {
            console.log( error );
        }

    }

    return (
        <View style = { styles.container } >
    
            <Text style = { styles.title }>Gados</Text>

            <ScrollView style= { styles.scroll } >

                { cattle.map(( cattle ) => 
                {
                    const pickedUsedExistsAlert = pickedUsed.find( pickedUsed =>  pickedUsed.cattleID === cattle.id );

                    if( pickedUsedExistsAlert?.id == undefined )
                    {
                        count++;
                    
                        return(

                            <View key = { cattle.id } style = { styles.card } >
                                <View style = { styles.iconCard }>
                                    <MaterialCommunityIcons name = "cow" size={50} color="#000" /> 
                                </View>

                                <View style = { styles.cardBory }>
                                    <Text style = { styles.textCard }> { cattle.name } </Text>  
                                    <Text style = { styles.textCard }> Raça : { cattle.breed } </Text>    
                                    <Text style = { styles.textCard }> Sexo : { cattle.sexo == "m" ? "Macho" : "Fêmea" } </Text> 
                                    <Text style = { styles.textCard }> Idade : { cattle.age } </Text>                 
                                </View>

                                {                             
                                    <RectButton key = { Number( cattle.id ) } style = { styles.btnCard } onPress = { () => handleAddCattleList(  cattle.id  ) }>
                                        <Text style = { styles.btnCardTxt }> Adicionar </Text>
                                    </RectButton>
                                }
                                 
                            </View>
                        );  
                    }

                })}

            </ScrollView>

            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    { count } Gado(s) Disponives para Locaçao
                </Text>

                <RectButton style = {styles.addButton} >
                    <Feather name="check" size={25} color="#fff" />
                </RectButton>

            </View>

        </View>            
    );
};

export default CatleList;
    