import { StyleSheet } from 'react-native';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 38,
  },
  containerChat: {
    flex: 2,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },

  containerChatBox: {
    flex: 1,
    alignItems: 'center',
    padding: 80,
    marginTop: 10,
  },
  

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'navyblue'
  },


  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'darkcyan',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonSend: {
   color: "darkcyan" ,
   marginLeft: 90,
    position: 'absolute',
   marginTop: -20,
   height: 100,
   width:70

  },
  buttonRecordingOff: {
    color: "darkred" ,
    marginLeft: 35,
    marginTop: 5,
    height: 80,
    width:50
   },

   buttonRecordingOn: {
    color: "darkgreen" ,
    marginLeft: 20,
    marginTop: 200,
    height: 80,
    width:50
 


   },
  buttonMicStyle: {
    color: "darkcyan" ,
    marginLeft: 150,
     position: 'absolute',
    marginTop: 1,
    height: 80,
    width:50

  },



  rightArrow: {
    position: "absolute",
    backgroundColor: "#0078fe",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },
  
  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20
  
  },
  
  /*Arrow head for recevied messages*/
  leftArrow: {
      position: "absolute",
      backgroundColor: "#dedede",
      //backgroundColor:"red",
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomRightRadius: 25,
      left: -10
  },
  
  leftArrowOverlap: {
      position: "absolute",
      backgroundColor: "#eeeeee",
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomRightRadius: 18,
      left: -20
  
  },


  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
});

export { styles }