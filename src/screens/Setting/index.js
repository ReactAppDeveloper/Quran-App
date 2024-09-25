import Slider from '@react-native-community/slider';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Platform, ScrollView, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HorizontalView from '../../components/HorizontalView';
import RegularText from '../../components/RegularText';
import RNSwitch from '../../components/RNSwitch';
import {setStorageItem} from '../../mmkvStorage/storeData';
import {
  setArabic,
  setArabicFont,
  setArabicFontSize,
  setTranslation,
  setTranslationFontSize,
  setTransliteration,
} from '../../redux/reduxToolkit/store/servicesSlice';
import {COLORS, FONTS, FONTSTYLE, IMAGES} from '../../theme';

const Setting = ({navigation, route}) => {
  const {isFromPage, selectedPageItem} = route?.params;
  const isArabicFont = useSelector(state => state.services.isArabicFont);

  const arabicFontSize = useSelector(state => state.services.arabicFontSize);
  const translationFontSize = useSelector(
    state => state.services.translationFontSize,
  );
  const isArabic = useSelector(state => state.services.isArabic);
  const isTranslation = useSelector(state => state.services.isTranslation);
  const isTransliteration = useSelector(
    state => state.services.isTransliteration,
  );
  let minFontSize = 10;
  let maxFontSize = 40;
  const isFocused = useIsFocused();

  const [isEnableArabic, setIsEnableArabic] = useState(isArabic);
  const [isEnableTranslation, setIsEnableTranslation] = useState(isTranslation);
  const [isEnableTransliteration, setIsEnableTransliteration] =
    useState(isTransliteration);
  const [arabicFontSizeValue, setArabicFontSizeValue] =
    useState(arabicFontSize);
  const [translationFontSizeValue, setTranslationFontSizeValue] =
    useState(translationFontSize);
  const [selectFont, setSelectFont] = useState(isArabicFont);
  const dispatch = useDispatch();

  const arabicFontList = [
    {id: 1, key: 'arabic_Al_Qalam', fontTitle: 'Al Qalam Quran Majeed'},
    {id: 2, key: 'arabic_Uthmani', fontTitle: 'Uthmani'},
    {id: 3, key: 'arabic_Indopak', fontTitle: 'IndoPak'},
    {id: 4, key: 'arabic_Tajweed', fontTitle: 'Tajweed'},
    {id: 5, key: 'arabic_Al_Mushaf_Quran', fontTitle: 'Al_Mushaf'},
    {id: 6, key: 'arabic_AmiriQuran_Regular', fontTitle: 'Amiri_Quran'},
    {id: 7, key: 'arabic_Lateef_Regular', fontTitle: 'Lateef'},
    {id: 8, key: 'arabic_Madina', fontTitle: 'Madina'},
    {id: 9, key: 'arabic_Me_Quran_Regular', fontTitle: 'Me_Quran'},
    {id: 10, key: 'arabic_noorehidayat_Regular', fontTitle: 'Noorehidayat'},
    {id: 11, key: 'arabic_noorehira_Regular', fontTitle: 'Noorehira'},
    {id: 12, key: 'arabic_noorehuda_Regular', fontTitle: 'Noorehuda'},
    {
      id: 13,
      key: 'arabic_PDMS_IslamicFont_Regular',
      fontTitle: 'PDMS_IslamicFont',
    },
    {
      id: 14,
      key: 'arabic_PDMS_Saleem_QuranFont_Regular',
      fontTitle: 'PDMS_Saleem',
    },
    {id: 15, key: 'arabic_ScheherazadeNew_Regular', fontTitle: 'Scheherazade'},
  ];
  useEffect(() => {
    setIsEnableArabic(isArabic);
    setIsEnableTranslation(isTranslation);
    setIsEnableTransliteration(isTransliteration);
    setArabicFontSizeValue(arabicFontSize);
    setTranslationFontSizeValue(translationFontSize);
    setSelectFont(isArabicFont);
  }, [isFocused]);

  const arabicFontSwitch = () => {
    return (
      <>
        <RNSwitch
          value={isEnableArabic}
          onValueChange={() => {
            if (!(!isEnableTranslation && !isEnableTransliteration)) {
              setIsEnableArabic(!isEnableArabic);
            }
          }}
        />
      </>
    );
  };

  const translationFontSwitch = () => {
    return (
      <>
        <RNSwitch
          value={isEnableTranslation}
          onValueChange={() => {
            if (!(!isEnableArabic && !isEnableTransliteration)) {
              setIsEnableTranslation(!isEnableTranslation);
            }
          }}
        />
      </>
    );
  };
  const transliterationFontSwitch = () => {
    return (
      <>
        <RNSwitch
          value={isEnableTransliteration}
          onValueChange={() => {
            if (!(!isEnableArabic && !isEnableTranslation)) {
              setIsEnableTransliteration(!isEnableTransliteration);
            }
          }}
        />
      </>
    );
  };

  const renderItem = item => {
    return (
      <View style={styles.dropdownItemStyle}>
        <Text style={styles.dropdownTitleText}>{item?.fontTitle}</Text>
        {item == selectFont && <View></View>}
      </View>
    );
  };
  const onClickReset = () => {
    setStorageItem('dynamicArabicFontSize', 24);
    dispatch(setArabicFontSize(24));

    setStorageItem('dynamicTranslationFontSize', 12);
    dispatch(setTranslationFontSize(12));

    const defaultFont = {
      id: 12,
      key: 'arabic_noorehuda_Regular',
      fontTitle: 'Noorehuda',
    };
    setStorageItem('isArabicFont', defaultFont);
    dispatch(setArabicFont(defaultFont));

    setStorageItem('isArabic', true);
    dispatch(setArabic(true));

    setStorageItem('isTranslation', true);
    dispatch(setTranslation(true));

    setStorageItem('isTransliteration', true);
    dispatch(setTransliteration(true));

    if (isFromPage) {
      navigation.push('SurahFullView', {
        selectedPageItem: selectedPageItem,
      });
    } else {
      navigation?.goBack();
    }
  };
  const onClickSave = () => {
    // === for Arabic font ===
    setStorageItem('dynamicArabicFontSize', arabicFontSizeValue);
    dispatch(setArabicFontSize(arabicFontSizeValue));

    // === for Translation and Transliteration font ===
    setStorageItem('dynamicTranslationFontSize', translationFontSizeValue);
    dispatch(setTranslationFontSize(translationFontSizeValue));

    setStorageItem('isArabicFont', selectFont);
    dispatch(setArabicFont(selectFont));

    setStorageItem('isArabic', isEnableArabic);
    dispatch(setArabic(isEnableArabic));

    setStorageItem('isTranslation', isEnableTranslation);
    dispatch(setTranslation(isEnableTranslation));

    setStorageItem('isTransliteration', isEnableTransliteration);
    dispatch(setTransliteration(isEnableTransliteration));

    if (isFromPage) {
      navigation.push('SurahFullView', {
        selectedPageItem: selectedPageItem,
      });
    } else {
      navigation?.goBack();
    }
  };

  const onSelectFont = font => {
    setSelectFont(font);
  };
  const onChangeArabicFontSize = fontSize => {
    setArabicFontSizeValue(fontSize);
  };
  const onChangeTranslationFontSize = fontSize => {
    setTranslationFontSizeValue(fontSize);
  };
  return (
    <View style={styles.safeAreaView}>
      <Header
        title={'Setting'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        rightIcon={false}
      />
      <ScrollView>
        <View style={styles.mainView}>
          <HorizontalView
            leftViewText="Translation And Transliteration"
            isRightImageShow={true}
            isRightImage={IMAGES.rightArrowIcon}
            onPress={() => {
              navigation.navigate('TranslatePage');
            }}
          />
          <View style={styles.line} />
          <HorizontalView
            leftViewText="Arabic"
            customeRightImageView={!isFromPage ? arabicFontSwitch : null}
          />
          {!isFromPage ? (
            <>
              <HorizontalView
                leftViewText="Translation"
                customeRightImageView={translationFontSwitch}
              />
              <HorizontalView
                leftViewText="Transliteration"
                customeRightImageView={transliterationFontSwitch}
              />
            </>
          ) : null}
        </View>

        <View style={styles.mainView}>
          <View style={styles.selectFontMainView}>
            <RegularText text={'Arabic Font'} />
          </View>
          <Dropdown
            style={styles.dropdownStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={arabicFontList}
            search={false}
            maxHeight={200}
            labelField="fontTitle"
            valueField="id"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={selectFont}
            onChange={item => {
              onSelectFont(item);
            }}
            renderRightIcon={() => (
              <View>
                <Image
                  source={IMAGES.dropdownArrowIcon}
                  style={styles.dropdownIcon}
                />
              </View>
            )}
            renderItem={renderItem}
          />
          <HorizontalView
            mainViewCustomeStyle={styles.horizontalViewCustomeStyle}
            isLeftImage={IMAGES.textIcon}
            leftViewText={`Arabic Font Size - ${arabicFontSizeValue}`}
          />
          <Slider
            style={styles.slider}
            minimumValue={minFontSize}
            maximumValue={maxFontSize}
            value={arabicFontSizeValue}
            step={1}
            onValueChange={sliderValue => {
              onChangeArabicFontSize(sliderValue);
            }}
            minimumTrackTintColor={COLORS.yellow}
            maximumTrackTintColor={COLORS.secondGray}
            thumbTintColor={COLORS.yellow}
          />
          <View style={styles.fontSizeView}>
            <Text
              style={[
                styles.textStyle,
                {
                  ...FONTSTYLE(
                    Platform.OS === 'android'
                      ? selectFont?.key
                      : FONTS[selectFont?.key],
                    arabicFontSizeValue,
                  ).arabicText,
                  lineHeight:
                    Platform.OS === 'android' ? arabicFontSizeValue * 1.9 : 0,
                },
              ]}>
              {'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ١'}
            </Text>
          </View>
        </View>

        <View style={styles.mainView}>
          <HorizontalView
            mainViewCustomeStyle={styles.horizontalViewCustomeStyle}
            isLeftImage={IMAGES.textIcon}
            leftViewText={`Translation And Transliteration Font Size - ${translationFontSizeValue}`}
          />
          <Slider
            style={styles.slider}
            minimumValue={minFontSize}
            maximumValue={maxFontSize}
            value={translationFontSizeValue}
            step={1}
            onValueChange={sliderValue => {
              onChangeTranslationFontSize(sliderValue);
            }}
            minimumTrackTintColor={COLORS.yellow}
            maximumTrackTintColor={COLORS.secondGray}
            thumbTintColor={COLORS.yellow}
          />
          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.caption,
                {
                  ...FONTSTYLE(FONTS.poppinsLight, translationFontSizeValue)
                    .arabicText,
                },
              ]}>
              {'Bismillah hir rahman nir raheem'}
            </Text>
            <View style={styles.lineView} />
            <Text
              style={[
                styles.caption,
                {
                  ...FONTSTYLE(FONTS.poppinsLight, translationFontSizeValue)
                    .arabicText,
                },
              ]}>
              {
                'In the name of Allah, the Entirely Merciful, the Especially Merciful'
              }
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonMainView}>
        <View style={styles.buttonViewStyle}>
          <Button
            title="Reset"
            onPress={() => {
              onClickReset();
            }}
            textColor={COLORS.white}
            style={{
              backgroundColor: COLORS.yellow,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={styles.buttonViewStyle}>
          <Button
            title="Save"
            onPress={() => {
              onClickSave();
            }}
            textColor={COLORS.white}
            style={{
              backgroundColor: COLORS.primaryBlue,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = ScaledSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: COLORS.white,
    paddingVertical: '8@s',
    paddingHorizontal: '15@s',
    marginBottom: '8@s',
  },
  line: {
    height: 1.2,
    backgroundColor: COLORS.secondGray,
  },
  lineView: {
    height: 1,
    marginVertical: '10@s',
    backgroundColor: COLORS.lightSlateGray,
    width: '100%',
  },
  selectFontMainView: {paddingVertical: '8@s'},
  dropdownStyle: {
    width: '100%',
    height: '42@s',
    paddingHorizontal: '15@s',
    borderRadius: '6@s',
    borderColor: COLORS.secondGray,
    borderWidth: 1.3,
  },
  dropdownIcon: {
    height: '24@s',
    width: '24@s',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  dropdownItemStyle: {
    padding: '12@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {marginBottom: '10@s'},
  horizontalViewCustomeStyle: {paddingVertical: 0, paddingTop: '8@s'},
  fontSizeView: {
    padding: '10@s',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: COLORS.paleGray,
    borderRadius: 10,
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.thirdGray,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.black,
  },
  iconStyle: {
    width: '20@s',
    height: '20@s',
  },
  inputSearchStyle: {
    height: '32@s',
    fontSize: 14,
  },
  detailContainer: {
    padding: '10@s',
    borderColor: COLORS.lightSlateGray,
    marginBottom: '8@s',
    borderWidth: 1.2,
    borderColor: COLORS.paleGray,
    borderRadius: 10,
  },

  caption: {
    color: COLORS.slateGray,
    textAlign: 'left',
  },
  line: {
    height: 1,
    marginVertical: '10@s',
    backgroundColor: COLORS.lightSlateGray,
  },
  buttonMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5@s',
    padding: '10@s',
  },
  buttonViewStyle: {flex: 1, marginHorizontal: '5@s'},
  textStyle: {
    color: COLORS.black,
    textAlign: 'center',
  },
  dropdownTitleText: {color: COLORS.black},
});
