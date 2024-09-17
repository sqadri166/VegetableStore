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
  Alert,
  TouchableOpacity
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
         <Text style={styles.titleName} >{product.VegetableName}
          

          </Text>
         
         <Image 
    source={{uri:product.ImageName} } 
                 style={styles.thumb}
                 resizeMode="center"
               
               />
           <Text style={styles.title}> Price Per Bag: {product.PricePerPoundOrEach} </Text>
          
          <Text style={styles.title}>Total Bags Available to Buy: {product.TotalBagsAvailable} </Text>
          <Text style={styles.title}>Bag Size: {product.BagSize} </Text>
          
         
            </View>   
           <View style={styles.rightcontainer}>
          
           <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => navigation.push('Listings')}
          >
          <Text style={styles.cartText}>Add To Cart</Text>
 </TouchableOpacity>
              
              <TouchableOpacity
          style={styles.ShowMoreScreenButton}
          onPress={() => navigation.push('Listings')}
          >
          <Text style={styles.loginText}>View More Items</Text>
 </TouchableOpacity> 
        
        <TouchableOpacity
          style={styles.NotScreenButton}
          onPress={() => navigation.push('Listings')}
          >
          <Text style={styles.loginText}>Categories of {product.VegetableName}</Text>
 </TouchableOpacity>
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

      ShowMoreScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:50,
        paddingTop:10,
        paddingBottom:10,

        backgroundColor:'darkcyan',
        borderRadius:10,
        borderWidth: 1,
        height:50 ,
        width:280,
        
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#fff'
      },

      loginScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:50,
        paddingTop:10,
        paddingBottom:10,

        backgroundColor:'darkgreen',
        borderRadius:10,
        borderWidth: 1,
        height:50 ,
        width:280,
        
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#fff'
      },

      NotScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:50,
        paddingTop:10,
        paddingBottom:10,

        backgroundColor:'maroon',
        borderRadius:10,
        borderWidth: 1,
        height:50 ,
        width:280,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#fff'
      },

      NotIntScreenButton : {
        marginRight:40,
        marginLeft:40,
       marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'maroon',
        borderRadius:1,
        borderWidth: 1,
        borderColor: '#fff'
      },
      notIntText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },

      loginText:{
          color:'white',
          textAlign:'center',
          fontWeight:"bold",
          paddingLeft : 75 ,
          paddingRight : 10
      },
      cartText:{
        color:'white',
        textAlign:'center',
        fontWeight:"bold",
        paddingLeft : 100 ,
        paddingRight : 10
    },

      rightcontainer: {
        flex: 1,
        
        marginTop: -100,
        marginLeft: 25,
        justifyContent:"center"
      } ,
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 16,
        left: 5 ,
        fontWeight: "500" ,
          backgroundColor:"lightblue"
        

      },
      titleName: {
        fontSize: 32,
        marginLeft: 120 ,
        fontWeight:"bold",
        marginBottom: 10,
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