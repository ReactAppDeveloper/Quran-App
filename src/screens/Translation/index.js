import {groupBy, isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {getAvailableTranslations} from '../../api';
import Button from '../../components/Button';
import DropDownComponent from '../../components/DropDownComponent';
import HorizontalView from '../../components/HorizontalView';
import {capitalizeWords} from '../../helper/utils';
import {setStorageItem} from '../../mmkvStorage/storeData';
import {
  setTranslationLanguage,
  setTranslationList,
} from '../../redux/reduxToolkit/store/servicesSlice';
import {COLORS, IMAGES} from '../../theme';

const Translations = ({navigation}) => {
  //
  const translationList = useSelector(state => state.services.translationList);
  const translationLanguage = useSelector(
    state => state.services.translationLanguage,
  );
  const [selectLanguage, setSelectLanguage] = useState(translationLanguage);
  const [selectedItems, setSelectedItems] = useState(translationList);
  const [translationsData, setTranslationsData] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [translationDataByLanguages, settranslationDataByLanguages] = useState(
    [],
  );

  const dispatch = useDispatch();
  useEffect(() => {
    getTranslationsLanguages();
  }, []);

  useEffect(() => {
    if (!isEmpty(translationDataByLanguages)) {
      getTranslationsData(selectLanguage?.language);
    }
  }, [translationDataByLanguages, selectLanguage]);

  const getTranslationsLanguages = async () => {
    const translationData = await getAvailableTranslations('en');
    const translationByLanguages = groupBy(
      translationData?.translations,
      'languageName',
    );
    settranslationDataByLanguages(translationByLanguages);
  };

  const getTranslationsData = async selectLanguage => {
    const selectedTranslationGroup = translationDataByLanguages[selectLanguage];

    const translationLanguages = Object.keys(translationDataByLanguages);

    const languagesList = translationLanguages?.map((language, index) => ({
      id: index + 1,
      name: capitalizeWords(language),
      language,
    }));
    const filterArray = selectedTranslationGroup?.filter(
      item => item?.authorName != 'Transliteration',
    );
    setLanguagesList(languagesList);
    setTranslationsData(filterArray);
  };

  const onClickSave = () => {
    dispatch(setTranslationList(selectedItems));
    setStorageItem('translationList', selectedItems);

    dispatch(setTranslationLanguage(selectLanguage));
    setStorageItem('translationLanguage', selectLanguage);
    navigation?.goBack();
  };

  const onClickReset = () => {
    dispatch(setTranslationList(131));
    setStorageItem('translationList', 131);

    const defaultLanguage = {
      _index: 0,
      id: 1,
      language: 'english',
      name: 'English',
    };
    dispatch(setTranslationLanguage(defaultLanguage));
    setStorageItem('translationLanguage', defaultLanguage);
    navigation?.goBack();
  };
  const selectTranslationLanguage = item => {
    setSelectLanguage(item);
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems === item?.id;
    const borderColor = isSelected ? COLORS.yellow : COLORS.lightSlateGray;
    return (
      <View>
        <HorizontalView
          mainViewCustomeStyle={[
            styles.horizontalViewCustomeStyle,
            {borderColor: borderColor},
          ]}
          leftViewTextStyle={{color: COLORS?.primaryGray}}
          leftIconCustomeStyle={styles.leftIcon}
          leftViewText={item?.translatedName?.name}
          isRightImageShow={isSelected}
          isRightImage={isSelected ? IMAGES.checkCircleIcon : null}
          onPress={() => {
            setSelectedItems(item?.id);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <DropDownComponent
          data={languagesList}
          maxHeight={250}
          labelField="name"
          valueField="id"
          placeholderText="Select Language"
          searchPlaceholder="Search..."
          onChange={item => {
            selectTranslationLanguage(item);
          }}
          value={selectLanguage}
        />
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={translationsData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

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

const styles = ScaledSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {paddingVertical: '13@s', paddingHorizontal: '15@s'},
  flatListView: {
    flex: 1,
    paddingVertical: '10@s',
    paddingHorizontal: '15@s',
    backgroundColor: COLORS.white,
  },
  horizontalViewCustomeStyle: {
    paddingHorizontal: '12@s',
    marginVertical: '5@s',
    paddingVertical: '8@s',
    borderRadius: '10@s',
    borderWidth: 1.3,
    backgroundColor: COLORS.white,
  },
  leftIcon: {
    height: '65@s',
    width: '65@s',
    borderRadius: '35@s',
    backgroundColor: COLORS.paleGray,
  },
  buttonMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5@s',
    padding: '10@s',
  },
  buttonViewStyle: {flex: 1, marginHorizontal: '5@s'},
});
export default Translations;
