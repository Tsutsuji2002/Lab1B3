import React from 'react';
import { View, FlatList, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import BookItem from '../components/BookItem';
import { books } from '../data/book';

const BookList = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
});

export default BookList;
