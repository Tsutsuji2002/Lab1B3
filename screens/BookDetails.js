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
  Dimensions,
  Keyboard,
} from 'react-native';

const BookDetails = ({ route, navigation }) => {
  const { book } = route.params;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [orientation, setOrientation] = useState(
    dimensions.width > dimensions.height ? 'landscape' : 'portrait'
  );
  const [comment, setComment] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const updateDimensions = ({ window }) => {
      setDimensions(window);
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    };

    const dimensionsSubscription = Dimensions.addEventListener('change', updateDimensions);
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      dimensionsSubscription.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const imageWidth = orientation === 'landscape' ? dimensions.width * 0.3 : dimensions.width * 0.6;
  const imageHeight = imageWidth * 1.5;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.content, orientation === 'landscape' && styles.landscapeContent]}>
          <View style={styles.imageContainer}>
            <Image source={book.image} style={[styles.image, { width: imageWidth, height: imageHeight }]} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <Text style={styles.price}>{book.price.toFixed(3)} đ</Text>
            <Text style={styles.description}>{book.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.addToCartButton]}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buyNowButton]}
                onPress={() => {/* Handle buy now */}}
              >
                <Text style={styles.buttonText}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  landscapeContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 20,
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
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentSection: {
    padding: 20,
  },
  commentSectionWithKeyboard: {
    marginBottom: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
  },
});

export default BookDetails;