import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from '../Components/ProfileHeader';
import ProductCard from '../Components/ProductCard';
import EditAddProduct from '../Components/EditAddProduct';

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState([
    {
      id: '1',
      ref: 'REF001',
      name: 'Product 1',
      category: {name: 'Category 1'},
      imageUrl:
        'file:///data/user/0/com.eyapfe/cache/rn_image_picker_lib_temp_03986e6c-9830-4e9f-9b86-e1410c46c349.jpg',
      sellPrice: 10.0,
    },
  ]);

  const handleEdit = product => {
    setSelectedProduct(product);
    setIsEdit(true);
    setModalVisible(true);
  };

  const handleAdd = product => {
    setProducts([...products, {...product, id: String(products.length + 1)}]);
  };

  const handleSave = updatedProduct => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product,
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader name={'Eya BouKadida'} />
      <View style={styles.CardsBox}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setIsEdit(false);
          }}
          style={styles.addButton}>
          <Image
            style={styles.addIcon}
            resizeMode="contain"
            source={require('../Assets/Icons/addProduct.png')}
          />
        </TouchableOpacity>
        <Text style={styles.Header}>List Of Product</Text>
        <ScrollView style={styles.scrollContainer}>
          {products.map(product => (
            <ProductCard
              product={product}
              onEdit={handleEdit}
              key={product.id}
            />
          ))}
        </ScrollView>
      </View>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        visible={isModalVisible}>
        <EditAddProduct
          product={selectedProduct}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          isEdit={isEdit}
          onAdd={handleAdd}
        />
      </Modal>
    </View>
  );
};

export default Product;

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  CardsBox: {
    width: Width,
    paddingTop: Height * 0.1,
    backgroundColor: '#fff',
    height: Height * 0.6,
    borderRadius: 50,
    top: -Height * 0.12,
  },
  scrollContainer: {},
  addButton: {
    width: Width * 0.17,
    height: Width * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 100,
    right: 20,
    top: 20,
    // paddingHorizontal: Width * 0.05,
    backgroundColor: '#28209C',
  },
  addIcon: {width: '50%'},
  Header: {
    position: 'absolute',
    zIndex: 100,
    left: 50,
    top: Height * 0.04,
    fontSize: 22,
  },
});
