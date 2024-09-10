import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Platform, Dimensions } from 'react-native';
import BookItem from '../components/BookItem';
import { books } from '../data/book';

const BookList = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [orientation, setOrientation] = useState(
    dimensions.width > dimensions.height ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  const numColumns = orientation === 'landscape' ? 3 : 2;

  return (
    <View style={styles.container}>
      <FlatList
        key={orientation}
        data={books}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item, orientation })}
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