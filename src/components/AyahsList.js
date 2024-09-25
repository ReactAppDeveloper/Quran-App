import React from 'react';
import {
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, FONTSTYLE, IMAGES} from '../theme';
import FavoriteView from './FavoriteView';
import VerticalText from './VerticalText';

export const LineView = () => {
  return (
    <View style={{height: 1.4, backgroundColor: COLORS.primaryGray}}></View>
  );
};

const AyashList = ({
  numberCounting = '',
  mainViewCustomStyle,
  leftTitleText = '',
  leftSubText = '',
  rightTitleText = '',
  rightSubText = '',
  backgroundImage = IMAGES.unSelectBackGroundImg,
  onPress = () => {},
  onPressFavoriteIcon = () => {},
  isFavoriteIconShow = true,
  isShowRightTextView = true,
  isShowLeftSubText = true,
  isShowRightSubText = true,
  isFavorite = false,
  item,
}) => {
  const isArabicFont = useSelector(state => state.services.isArabicFont);
  return (
    <>
      <TouchableOpacity
        style={[styles.mainView, mainViewCustomStyle]}
        onPress={onPress}
        activeOpacity={0.5}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundImageStyle}>
          <View style={styles.leftViewStyle}>
            <Text style={styles.idStyle}>{numberCounting}</Text>
          </View>
        </ImageBackground>
        <View style={styles.middleTextView}>
          <VerticalText
            titleText={leftTitleText}
            subText={leftSubText}
            titleTextStyle={styles.leftTitleTextStyle}
            subTextStyle={styles.leftSubTextStyle}
            isShowSubText={isShowLeftSubText}
          />
        </View>
        {isFavoriteIconShow && (
          <FavoriteView
            onPressFavoriteIcon={onPressFavoriteIcon}
            isFavorite={isFavorite}
            surahId={numberCounting}
            item={item}
          />
        )}
        {isShowRightTextView && (
          <View style={styles.rightViewStyle}>
            <VerticalText
              titleText={rightTitleText}
              subText={rightSubText}
              titleTextStyle={[
                {
                  ...FONTSTYLE(
                    Platform.OS === 'android'
                      ? isArabicFont?.key
                      : FONTS[isArabicFont?.key],
                  ).headerText,
                  lineHeight: Platform.OS === 'android' ? 40 : 0,
                  // lineHeight: 0,
                },
                styles.rightTitleTextStyle,
              ]}
              subTextStyle={styles.rightSubTextStyle}
              isShowSubText={isShowRightSubText}
            />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default AyashList;
const styles = ScaledSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '18@s',
    paddingVertical: '12@s',
    borderBottomWidth: 1,
    borderColor: COLORS.lightSlateGray,
  },
  backgroundImageStyle: {
    height: '45@s',
    width: '45@s',
    resizeMode: 'contain',
  },
  leftViewStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  idStyle: {
    ...FONTSTYLE(FONTS.poppinsSemiBold).body,
  },
  middleTextView: {flex: 1, marginHorizontal: '8@vs'},
  leftTitleTextStyle: {
    ...FONTSTYLE(FONTS.poppinsSemiBold).inputs,
  },
  leftSubTextStyle: {
    ...FONTSTYLE(FONTS.poppinsRegular).smallText,
    color: COLORS.slateGray,
  },
  rightViewStyle: {width: '26%'},
  rightTitleTextStyle: {
    textAlign: 'right',
  },
  rightSubTextStyle: {
    ...FONTSTYLE(FONTS.poppinsRegular).caption,
    color: COLORS.slateGray,
    textAlign: 'right',
  },
});
