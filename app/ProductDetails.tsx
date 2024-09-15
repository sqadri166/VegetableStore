import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert
  } from 'react-native';
import {db} from '../Firebase';
import { collection, getDocs ,doc , Firestore } from "firebase/firestore";


const ProductDetails = ({ route,navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState({});




    useEffect(()=>{
        fetchPostProduct(productId);
    }, [])


const fetchPostProduct = async (prodId:any) => {

    console.log(prodId); 
    //setProduct(currentproduct);                
    var currentProduct:any;
    await getDocs(collection(db,"/Vegetables"))
        .then((querySnapshot)=>{               
            const newData:any = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                currentProduct = newData.filter(function(el:any) {
                    return el.id === productId;
                  });
              
             setProduct(currentProduct[0]);                
        }).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
          setProduct(currentProduct[0]);                

        }
 
return (
   
       
           <View style={styles.container}>
         <View style={styles.card}>
         <Image 
    source={{uri:product.ImageName} } 
                 style={styles.thumb}
                 resizeMode="center"
               
               />
            </View>   
           <View style={styles.rightcontainer}>
           <Text style={styles.titleName} >{product.VegetableName}
          

          </Text>
          <Text style={styles.title}>Market Search :{product.Description} </Text>
          <Text style={styles.title}>Total Bags Available to Buy : {product.TotalBagsAvailable} </Text>
          <Text style={styles.title}>FreshNess Level : {product.ConditionNotes} </Text>
          <Text style={styles.title}> Sweetness Level :{product.SweetnessLevel} </Text>
          <Button
          title="Add Another Product" 
          color="green"
          onPress={() =>  {
            navigation.push('Listings')}
          }/>
              </View>
              <View style={styles.fixToText}>
        <Button
          title="Add to Cart"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Not Interested"
            color="maroon"
            onPress={() => {
            navigation.push('Listings')}
          }
        />
      </View>

         
         
          </View>
        
   

  );
   

  
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },

      headerTitle: {
        fontSize: 20
      },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
          height: 12,
          width: 14,
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
        marginTop: StatusBar.currentHeight || 15,
      },

      rightcontainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 15,
        marginLeft: 0
      } ,
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 16,
        left: 5 ,
        fontWeight: "500"

      },
      titleName: {
        fontSize: 32,
        left: 120 ,
        fontWeight:"bold",
        top: -30,
      },
    
    viewcontainer: {
        paddingTop: 80,
        left: 15
      },

      buttonblue : {
 
        color: "blue",
        top:300 

      } ,
  
    mediumImage: {
        width: 250,
        height: 650,
    }
  });


export default ProductDetails;