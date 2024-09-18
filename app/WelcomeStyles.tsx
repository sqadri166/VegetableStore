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
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export { styles }