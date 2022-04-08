import { StyleSheet,  SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import Form from './src/components/Form';
import styles from './src/Styles';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Form> </Form>


        </ScrollView>
      </SafeAreaView>

  );
}

