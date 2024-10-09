import { StyleSheet } from 'react-native';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 38,
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
   marginLeft: 20,
   marginTop: 20,
   height: 80,
   width:50

  },
  buttonRecordingOff: {
    color: "darkred" ,
    marginLeft: 20,
    marginTop: 20,
    height: 80,
    width:50
   },

   buttonRecordingOn: {
    color: "darkgreen" ,
    marginLeft: 20,
    marginTop: 20,
    height: 80,
    width:50
 


   },
  buttonMicStyle: {
    color: "darkcyan" ,
    marginLeft: 20,
    marginTop: 20,
    height: 20,
    width:80

  },






  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export { styles }