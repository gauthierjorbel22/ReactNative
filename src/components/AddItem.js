import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import CustomButton from '../utils/CustomButton';
import {Picker} from '@react-native-picker/picker';
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

export default function Login({navigation, route}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState();
  useEffect(() => {
    createTable();
    insertData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Books ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Author Text, Genre Text, Pages INTEGER);',
      );
    });
  };
  // Insert the data
  const insertData = () => {
    if (title != '' && author != '' && genre != '' && pages != '') {
      try {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Books (Title, Author, Genre, Pages) VALUES (?,?,?,?)',
            [title, author, genre, pages],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Data Saved Successfully',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                alert('Registration Failed');
              }
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/books.jpg')}
          />
          <Text style={styles.text}>ADD A BOOK</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your title"
            onChangeText={value => setTitle(value)}
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your author"
            onChangeText={value => setAuthor(value)}
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your genre"
            onChangeText={value => setGenre(value)}
            required
          />

          <Picker
            selectedValue={selectedLanguage}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="SciFic" value="sciencefiction" />
            <Picker.Item label="Romance" value="romance" />
            <Picker.Item label="Thriller" value="thriller" />
            <Picker.Item label="Action" value="action" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Enter your pages"
            onChangeText={value => setPages(value)}
            required
          />
          <CustomButton
            title="SAVE"
            color="#1eb900"
            onPressFunction={insertData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 200,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
