import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Keyboard
} from 'react-native';

const BookDetails = ({ route, navigation }) => {
  const { book } = route.params;
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState(width > height ? 'landscape' : 'portrait');
  const [comment, setComment] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const newOrientation = width > height ? 'landscape' : 'portrait';
      setOrientation(newOrientation);
    };

    updateOrientation();
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [width, height]);

  const imageWidth = orientation === 'landscape' ? width * 0.4 : width * 0.8;
  const imageHeight = imageWidth * 1.5;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.content, orientation === 'landscape' && styles.landscapeContent]}>
          <Image source={ book.image } style={[styles.image, { width: imageWidth, height: imageHeight }]} />
          <View style={styles.details}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <Text style={styles.price}>{book.price.toFixed(3)} đ</Text>
            <Text style={styles.description}>{book.description}</Text>
            <TouchableOpacity
              style={[styles.button, orientation === 'landscape' && styles.landscapeButton]}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.commentSection, keyboardVisible && styles.commentSectionWithKeyboard]}>
          <TextInput
            style={styles.input}
            placeholder="Viết bình luận..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  landscapeContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    resizeMode: 'contain',
    marginBottom: 20,
  },
  details: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  landscapeButton: {
    width: '50%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentSection: {
    padding: 20,
  },
  commentSectionWithKeyboard: {
    marginBottom: 250, // Điều chỉnh giá trị này tùy thuộc vào kích thước bàn phím
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
});

export default BookDetails;