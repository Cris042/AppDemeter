import { useFocusEffect } from '@react-navigation/native';
import { Text, View, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import {  useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

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

interface PickedUsed
{
    id: string;
    dateEntryPicket: String,
    dateExitPicket: String,
    picketID : number,
    cattleID : string,
    occupancyRate : number,
}

const CatleList: React.FC = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as DetailsRouteParams;

    const [ farm, setFarm ] = useState<Farms>();
    const [ cattle , setCattle ] = useState<Cattle[]>([]);
    const [ pickedUsed , setPicketUsed ] = useState<PickedUsed[]>([]);

    const now = new Date();

    useFocusEffect(() =>
    {
  
      async function load()
      {
        const dataKey = '@appIF:Farm';
        const response = await AsyncStorage.getItem( dataKey );
  
        const responseFormatted = response ? JSON.parse( response ) : [];
        const expensives = responseFormatted;
  
        setFarm( expensives );  
      }
  
      load();
  
    });

    useEffect(() => 
    {

      async function load() 
      {
        const dataKey = '@appIF:Cattle';
        const response = await AsyncStorage.getItem( dataKey );
 
        const responseFormatted = response ? JSON.parse( response ) : [];
        const expensives = responseFormatted;
  
        setCattle( expensives );
      }

      async function loadPicketUsed() 
      {
          const responsePickedUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );

          const responseFormattedPickedUsed = responsePickedUsed ? JSON.parse( responsePickedUsed ) : [];
          const expensivesPickedUsed = responseFormattedPickedUsed;

          setPicketUsed( expensivesPickedUsed );
      }

      load();
      loadPicketUsed();

    }, [ params.id ]);

    function handleNavigatCattleList()
    {
        navigation.navigate("CadastarGados");
    }

    function handleDeletCattleList()
    {
        alert( "Remover");
    }

    function handleAddCattleList()
    {
        alert( "Adicionar");
    }



    return (
        <View style = { styles.container } >
    
            <Text style = { styles.title }>Gados</Text>

            <ScrollView style= { styles.scroll } >

                { cattle.map(( cattle ) => 
                {
                  
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

                            { pickedUsed.map(( pickedUsed ) => 
                            {                                
                                return (
                                    <RectButton 
                                        key = { pickedUsed.id } 
                                        style = { styles.btnCard } 
                                        onPress = { Number( pickedUsed.cattleID ) == cattle.id && params.id === farm!.id ? handleDeletCattleList : handleAddCattleList }
                                    >
                                        <Text style = { styles.btnCardTxt }> 
                                            { Number( pickedUsed.cattleID ) == cattle.id && params.id === farm!.id ? "Adicionar" : "Selecionado" }
                                        </Text>

                                    </RectButton>
                                );
                                
                            })}

                        
                        </View>
                    );  

                })}

            </ScrollView>

            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    { cattle.length } Gados(s) selecionados
                </Text>

                <RectButton
                    style = {styles.addButton}
                    onPress = { handleNavigatCattleList }
                >
                    <Feather name="check" size={20} color="#fff" />

                </RectButton>

            </View>

        </View>            
    );
};

export default CatleList;
    