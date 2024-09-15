import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ScrollView,
  } from 'react-native';
  import {db} from '../Firebase';
import { collection, getDocs } from "firebase/firestore";
import { converBase64ToImage } from 'convert-base64-to-image';
import { useNavigation } from 'expo-router';

const ProductListings = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "Vegetables"))
        .then((querySnapshot)=>{               
            const newData:any = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
             setProducts(newData);                
        })

}

useEffect(()=>{
    fetchPost();
}, [])
   const pathToSaveImage = '../assets/images/'

  return (
    <SafeAreaView style={styles.container}>

<ScrollView
         style={styles.scrollView}
         contentContainerStyle={{
           flexDirection: "row",
           flexWrap: "wrap",
           justifyContent: "center",
         }}
         horizontal={false}
       >
         {products.map((prod, i) => {
           return (
             <View
               style={{
                 padding: 5,
               }}
               key={i}
             >
                <Text style={styles.boldcase}>{prod.ConditionNotes}</Text>
                <TouchableOpacity style={styles.card} onPress={ () => {
        navigation.push('ProductDetails', {
          productId: prod.id,
        });
      }}>
                  <Image 
    source={{uri:prod.ImageName} } 
                 style={styles.thumb}
                 resizeMode="center"
               
               />
                  <Text style={styles.title}>{prod.VegetableName}</Text>
                  <Text style={styles.title}>{prod.PricePerPoundOrEach}</Text>
                  <Text style={styles.title}>Select Me</Text>
                   
                  </TouchableOpacity>
             </View>
           );
         })}
       </ScrollView>
       </SafeAreaView>


  );
};




const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },

      headerTitle: {
        fontSize: 20
      },

    ImageContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        width: "100%",
      },
      boldcase :{
        fontSize: 16,
        fontWeight: "bold"


      },
      card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
        marginVertical: 20,
      },
      Image: {
        shadowColor: "black",
        shadowOffset: {
          width: -10,
          height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation:5
      },
      thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
      },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
    
    viewcontainer: {
        paddingTop: 50,
      },
  
    mediumImage: {
        width: 250,
        height: 650,
    }
  });

  export default ProductListings;
