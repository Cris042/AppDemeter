import { Text, View, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import {  useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";


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

const CatleList: React.FC = () => {

    const navigation = useNavigation();
    const [ cattle , setCattle ] = useState<Cattle[]>([]);

    const now = new Date();

    useEffect(() => 
    {

      async function load() 
      {
        const response = await AsyncStorage.getItem( '@appIF:Cattle' );
 
        const responseFormatted = response ? JSON.parse( response ) : [];
        const expensives = responseFormatted;
  
        setCattle( expensives );
      }
  
      load();

    });

    function handleNavigatCattleList()
    {
        navigation.navigate("CadastarGados");
    }

    function handleNavigatFarmDetails( id: number ) 
    {
        navigation.navigate("CattleEdit", { id } );
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

                            <Text style = { styles.btnCard } onPress={() => handleNavigatFarmDetails( cattle.id )} > Editar Gado </Text>     
                        </View>
                    );   
                })}

            </ScrollView>

            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    { cattle.length } Gados(s) encontrado(s)
                </Text>

                <RectButton
                    style = {styles.addButton}
                    onPress = { handleNavigatCattleList }
                >
                    <Feather name="plus" size={20} color="#fff" />

                </RectButton>

            </View>

        </View>            
    );
};

export default CatleList;
    