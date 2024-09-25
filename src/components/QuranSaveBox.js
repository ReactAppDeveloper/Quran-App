import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {getStorageItem} from '../mmkvStorage/storeData';
import {COLORS, FONTS, FONTSTYLE, IMAGES} from '../theme';
import VerticalText from './VerticalText';

const QuranSaveBox = ({
  Icon = '',
  titleText = '',
  subText = '',
  onPress = () => {},
}) => {
  const navigation = useNavigation();

  const pinAyah = getStorageItem('pin');
  const bookmarksList = getStorageItem('bookmark');
  const favoritesList = getStorageItem('favorites');

  const subTextValue =
    titleText === 'Resume'
      ? `Surah ${
          pinAyah?.AyahItem?.verseKey ? pinAyah?.AyahItem?.verseKey : '-'
        }`
      : titleText === 'Bookmarks'
      ? `Total Ayahs ${
          bookmarksList?.length !== 0 ? bookmarksList?.length : '-'
        }`
      : titleText === 'Favorite'
      ? `Surah ${favoritesList?.length !== 0 ? favoritesList?.length : '-'}`
      : subText;

  const IconSource =
    titleText === 'Resume'
      ? IMAGES.pinIcon
      : titleText === 'Bookmarks'
      ? IMAGES.addBookmarkIcon
      : titleText === 'Favorite'
      ? IMAGES.heartIcon
      : Icon;

  const InPressTouchable = () => {
    titleText === 'Resume'
      ? pinAyah?.AyahItem?.verseKey &&
        navigation.navigate('SurahDetailPage', {
          selectedAyahItems: pinAyah?.AyahItem,
          selectedSurahItems: pinAyah?.SurahItem,
          fromPinAyah: true,
        })
      : titleText === 'Bookmarks'
      ? navigation.navigate('Bookmark')
      : titleText === 'Favorite'
      ? navigation.navigate('Favorite')
      : onPress();
  };

  // useEffect(() => {
  // // Find date and time for pin ayah
  //   const getCurrentDateTime = () => {
  //     const date = moment().format('YYYY-MM-DD');
  //     const time = moment().format('HH:mm:ss');
  //     return {date, time};
  //   };

  //   const {date, time} = getCurrentDateTime();
  //   console.log('currentDateTime=======>', date, time);
  // }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.mainView}
        onPress={() => {
          InPressTouchable();
        }}
        activeOpacity={0.7}>
        <View>
          <Image style={styles.iconStyle} source={IconSource} />
        </View>
        <View style={styles.textView}>
          <VerticalText
            titleText={titleText}
            titleTextStyle={styles.titleTextStyle}
            subTextStyle={styles.subTextStyle}
            subText={subTextValue}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default QuranSaveBox;

const styles = ScaledSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: '5@s',
    borderColor: COLORS?.lightSlateGray,
    paddingHorizontal: '5@s',
    paddingVertical: '10@s',
    marginRight: '8@s',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: '22@s',
    width: '22@s',
    resizeMode: 'contain',
  },
  textView: {maxWidth: 100},
  titleTextStyle: {
    ...FONTSTYLE(FONTS.poppinsRegular).body,
    color: COLORS.primaryGray,
  },
  subTextStyle: {
    ...FONTSTYLE(FONTS.poppinsRegular).smallText,
    color: COLORS.yellow,
  },
});
