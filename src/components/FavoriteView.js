import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IMAGES} from '../theme';

const FavoriteView = ({
  favoriteIconCustomStyle,
  onPressFavoriteIcon = () => {},

  isFavorite,
}) => {
  return (
    <TouchableOpacity
      hitSlop={{bottom: 15, top: 15, left: 15, right: 15}}
      onPress={onPressFavoriteIcon}
      activeOpacity={0.7}>
      <Image
        style={[styles.favoriteIconStyle, favoriteIconCustomStyle]}
        source={isFavorite ? IMAGES.favoriteIcon : IMAGES.unFavoriteIcon}
      />
    </TouchableOpacity>
  );
};

export default FavoriteView;

const styles = ScaledSheet.create({
  favoriteIconStyle: {
    height: '22@s',
    width: '24@s',
    resizeMode: 'contain',
  },
});
