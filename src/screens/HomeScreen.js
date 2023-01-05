import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AddItem from '../components/AddItem';
import Header from '../components/Header';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
const HomeScreen = ({navigation, route}) => {
  const [results, setResults] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Books', [], (tx, results) => {
          // setResults(results);
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }

          setResults(temp);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  function totalPages(number1) {
    var sum = null;
    return (sum = number1 + number1);
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Button
            title="Go To Details"
            onPress={() => navigation.navigate('Details')}
          />
          <Button
            title="Go To Books"
            onPress={() => navigation.navigate('Books')}
          />
          <StatusBar backgroundColor="green" />
          <Header />

          <Text />
          <AddItem />
        </View>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <View style={{flex: 1}}>
            <View>
              <Text>Total Number Of Pages: last one is the total</Text>
              {Object.values(results).map(data => (
                <Text>{totalPages(data.Pages)}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
});
export default HomeScreen;
