import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import AyahsList from '../../components/AyahsList';
import EmptyView from '../../components/EmptyView';
import Header from '../../components/Header';
import ar from '../../data/chapters/ar.json';
import {getStorageItem, setStorageItem} from '../../mmkvStorage/storeData';
import {COLORS} from '../../theme';
import {SIZES} from '../../theme/Sizes';

const Favorite = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoriteList();
  }, []);

  const getFavoriteList = () => {
    const favoritesList = getStorageItem('favorites');
    setFavorites(favoritesList);
  };
  const removeFavorite = item => {
    const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
    setFavorites(updatedFavorites);
    setStorageItem('favorites', updatedFavorites);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.ayahsListView}>
      <AyahsList
        numberCounting={item?.id}
        leftTitleText={item?.transliteratedName}
        leftSubText={item?.translatedName}
        rightTitleText={ar[index + 1]?.transliteratedName}
        rightSubText={`${item?.versesCount} Ayahs`}
        isFavorite={true}
        onPressFavoriteIcon={() => removeFavorite(item)}
        onPress={() => {
          navigation.navigate('SurahDetailPage', {
            selectedSurahItems: item,
          });
        }}
        item={item}
      />
    </View>
  );

  return (
    <View style={styles.safeAreaView}>
      <Header
        title="Favorite"
        onPressLeftIcon={() => {
          navigation?.goBack();
        }}
        rightIcon={false}
      />
      <View style={{flex: 1}}>
        <FlatList
          data={favorites}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyViewStyle}>
              <EmptyView />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Favorite;

const styles = ScaledSheet.create({
  safeAreaView: {
    flex: 1,
  },
  ayahsListView: {
    backgroundColor: COLORS.white,
  },
  emptyViewStyle: {marginTop: SIZES.height / 2.2},
});
