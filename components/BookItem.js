import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

const BookItem = ({ book, onPress }) => {
  const { width } = useWindowDimensions();
  const itemWidth = width > 600 ? width / 3 - 20 : width / 2 - 15;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { width: itemWidth }]}>
        <Image source={book.image} style={[styles.image, { width: itemWidth - 20, height: (itemWidth - 20) * 1.5 }]} />
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toFixed(3)} đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default BookItem;
