import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, FONTSTYLE, IMAGES} from '../theme';
import Searchbar from './Searchbar';

const HIT_SLOP = {bottom: 40, top: 40, left: 20, right: 20};
const Header = ({
  title = '',
  leftIcon = true,
  rightIcon = true,
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  onClickCloseSearch = () => {},
  onChangeText = () => {},
  customBackIcon = null,
  customRightIcon = null,
  customTitleTextStyle = {},
  searchEnable = false,
  searchText,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryBlue}
      />
      <View style={styles.mainView}>
        {searchEnable ? (
          <Searchbar
            onPressLeftIcon={() => {}}
            onPressRightIcon={() => {
              onClickCloseSearch();
            }}
            onChangeText={onChangeText}
            searchText={searchText}
          />
        ) : (
          <>
            <View style={styles.leftIconView}>
              {leftIcon ? (
                <TouchableOpacity hitSlop={HIT_SLOP} onPress={onPressLeftIcon}>
                  <Image style={styles.backIcon} source={IMAGES.backIcon} />
                </TouchableOpacity>
              ) : customBackIcon ? (
                customBackIcon()
              ) : null}
            </View>
            <View style={[styles.titleTextView, customTitleTextStyle]}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.rightIconView}>
              {rightIcon ? (
                <TouchableOpacity hitSlop={HIT_SLOP} onPress={onPressRightIcon}>
                  <Image style={styles.searchIcon} source={IMAGES.searchIcon} />
                </TouchableOpacity>
              ) : customRightIcon ? (
                customRightIcon()
              ) : null}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : '10@s',
    backgroundColor: COLORS.primaryBlue,
    minHeight: '46@s',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15@s',
    paddingBottom: '10@s',
  },

  leftIconView: {
    width: '20%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleTextView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconView: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backIcon: {
    height: '17@s',
    width: '17@s',
    resizeMode: 'contain',
  },
  searchIcon: {height: '24@s', width: '24@s', resizeMode: 'contain'},
  titleText: {
    ...FONTSTYLE(FONTS.poppinsSemiBold).headerText,
    alignSelf: 'center',
    color: COLORS.yellow,
  },
});
