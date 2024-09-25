import React, {useEffect, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getAvailableReciters, getTafsirs} from '../../api';
import Header from '../../components/Header';
import {
  setArabic,
  setArabicFont,
  setArabicFontSize,
  setChapterDetail,
  setJuzList,
  setPagesList,
  setTafseerAuthor,
  setTafseerLanguage,
  setTranslation,
  setTranslationFontSize,
  setTranslationLanguage,
  setTranslationList,
  setTransliteration,
  setTransliterationLanguage,
  setTransliterationList,
} from '../../redux/reduxToolkit/store/servicesSlice';
import {COLORS, FONTS, FONTSTYLE} from '../../theme';
import {getAllChaptersData} from '../../utils/chapter';
import JuzList from '../JuzList';
import PageList from '../PageList';
import SurahList from '../SurahList';

import {useFocusEffect} from '@react-navigation/native';
import {juzDataList} from '../../data/juzDataList';
import localeLanguage from '../../helper/localLanguage';
import {getStorageItem, setStorageItem} from '../../mmkvStorage/storeData';
import {setRecitersDataList} from '../../redux/reduxToolkit/store/recitersDataList';

const DashBoard = ({navigation, route}) => {
  const selectedTafseerLanguage = useSelector(
    state => state.services.tafseerLanguage,
  );
  const reciters = getStorageItem('reciters');
  const dynamicArabicFontSize = getStorageItem('dynamicArabicFontSize');
  const dynamicTranslationFontSize = getStorageItem(
    'dynamicTranslationFontSize',
  );
  const isArabicFont = getStorageItem('isArabicFont');
  const isArabic = getStorageItem('isArabic');
  const isTranslation = getStorageItem('isTranslation');
  const isTransliteration = getStorageItem('isTransliteration');
  const translationList = getStorageItem('translationList');
  const translationLanguage = getStorageItem('translationLanguage');
  const transliterationList = getStorageItem('transliterationList');
  const transliterationLanguage = getStorageItem('transliterationLanguage');
  const tafseerLanguage = getStorageItem('tafseerLanguage');
  const tafseerAuthor = getStorageItem('tafseerAuthor');

  const [index, setIndex] = useState(0);
  const [searchbarVisible, setSearchbarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [allSurahList, setAllSurahList] = useState([]);
  const [allJuzList, setAllJuzList] = useState([]);
  const [allPagesList, setAllPagesList] = useState([]);

  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'surah', title: 'Surah'},
    {key: 'juz', title: 'Juz'},
    {key: 'pages', title: 'Pages'},
  ]);
  const renderScene = SceneMap({
    surah: () => <SurahList navigation={navigation} route={route} />,
    juz: () => <JuzList navigation={navigation} />,
    pages: () => <PageList navigation={navigation} />,
  });

  const renderTabBar = props => {
    const currentPageIndex = props?.navigationState?.index;
    const inputRange = props?.navigationState?.routes?.map((x, i) => i);
    const currentIndex = currentPageIndex;
    setCurrentPageIndex(currentPageIndex);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color = currentIndex === i ? COLORS.yellow : COLORS.white;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  ...FONTSTYLE(
                    currentIndex === i
                      ? FONTS.poppinsMedium
                      : FONTS.poppinsRegular,
                  ).body,
                  color,
                }}>
                {route.title}
              </Animated.Text>
              {currentIndex === i && (
                <Animated.View
                  style={{
                    width: '100%',
                    height: 4,
                    backgroundColor: color,
                    position: 'absolute',
                    bottom: 0,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const onClickSearchIcon = () => {
    setSearchText('');
    getChaptersData(localeLanguage);
    getJuzData();
    setSearchbarVisible(true);
  };

  useEffect(() => {
    getChaptersData(localeLanguage);
    getJuzData();
    pagesListData();
  }, []);

  useFocusEffect(React.useCallback(() => {}, []));
  useEffect(() => {
    if (route?.params?.selectedSurahItems) {
      setIndex(route?.params?.tabIndex);
    }
  }, [route?.params]);

  useEffect(async () => {
    if (dynamicArabicFontSize?.length != 0) {
      dispatch(setArabicFontSize(dynamicArabicFontSize));
    }
    if (dynamicTranslationFontSize?.length != 0) {
      dispatch(setTranslationFontSize(dynamicTranslationFontSize));
    }
    if (isArabicFont?.length != 0) {
      dispatch(setArabicFont(isArabicFont));
    }

    if (isArabic?.length != 0) {
      dispatch(setArabic(isArabic));
    }
    if (isTranslation?.length != 0) {
      dispatch(setTranslation(isTranslation));
    }
    if (isTransliteration?.length != 0) {
      dispatch(setTransliteration(isTransliteration));
    }

    if (translationList?.length != 0) {
      dispatch(setTranslationList(translationList));
    }
    if (translationLanguage?.length != 0) {
      dispatch(setTranslationLanguage(translationLanguage));
    }

    if (transliterationList?.length != 0) {
      dispatch(setTransliterationList(transliterationList));
    }
    if (transliterationLanguage?.length != 0) {
      dispatch(setTransliterationLanguage(transliterationLanguage));
    }

    if (tafseerLanguage?.length != 0) {
      dispatch(setTafseerLanguage(tafseerLanguage));
    }

    if (tafseerAuthor?.length != 0) {
      dispatch(setTafseerAuthor(tafseerAuthor));
    }
    getReciterData(localeLanguage);
    if (tafseerAuthor?.length == 0) {
      getTafseerAuthor();
    }

    const unsubscribe = navigation.addListener('blur', async () => {
      setSearchText('');
      setSearchbarVisible(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getChaptersData = async lag => {
    const chaptersData = await getAllChaptersData();

    const chapterDataWithIds = Object.entries(chaptersData).map(
      ([id, chapter]) => ({
        ...chapter,
        id,
      }),
    );

    setAllSurahList(chapterDataWithIds);
    dispatch(setChapterDetail(chapterDataWithIds));
  };

  const getJuzData = async () => {
    const juzData = juzDataList;
    const juzList = juzData.map((item, index) => ({
      ...item,
      id: item.index + 1,
      juzNumber: `Juz ${item.index + 1}`,
    }));
    setAllJuzList(juzList);
    dispatch(setJuzList(juzList));
  };

  const pagesListData = () => {
    const pageItems = [];
    for (let i = 1; i <= 604; i++) {
      pageItems.push({id: i, pageNumber: `Page ${i}`});
    }
    setAllPagesList(pageItems);
    dispatch(setPagesList(pageItems));
  };

  const getReciterData = async lag => {
    const reciterData = await getAvailableReciters(lag);

    const updatedArray = reciterData?.reciters?.filter(
      (value, index, self) =>
        index === self.findIndex(item => item?.name === value?.name),
    );
    dispatch(setRecitersDataList(updatedArray));
    if (reciters?.length === 0) {
      setStorageItem('reciters', updatedArray[0]);
    } else {
    }
  };

  const getTafseerAuthor = async () => {
    const lang = selectedTafseerLanguage?.name
      ? selectedTafseerLanguage?.name
      : 'english';
    const tafseerAuthorData = await getTafsirs(lang);
    dispatch(setTafseerAuthor(tafseerAuthorData?.tafsirs[0]));
  };

  useEffect(() => {
    handleSearchBySurah(searchText);
    handleSearchByJuz(searchText);
    handleSearchByPage(searchText);
  }, [searchText]);

  const handleSearchBySurah = text => {
    if (text) {
      const filterChapterDetail = allSurahList?.filter(item => {
        const itemData = item?.transliteratedName?.toUpperCase();
        const textData = text?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      dispatch(setChapterDetail(filterChapterDetail));
    } else {
      getChaptersData(localeLanguage);
    }
  };

  const handleSearchByJuz = text => {
    if (text) {
      const filterJuzDetail = allJuzList.filter(item => {
        const itemData = item?.juzNumber;
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      dispatch(setJuzList(filterJuzDetail));
    } else {
      getJuzData();
    }
  };

  const handleSearchByPage = text => {
    if (text) {
      const filterPagesDetail = allPagesList?.filter(item => {
        const itemData = String(item?.pageNumber);
        const textData = String(text);
        return itemData.indexOf(textData) > -1;
      });
      dispatch(setPagesList(filterPagesDetail));
    } else {
      pagesListData();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Al-Quran'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        leftIcon={false}
        onPressRightIcon={() => {
          onClickSearchIcon();
        }}
        onClickCloseSearch={() => {
          setSearchText('');
          setSearchbarVisible(false);
        }}
        searchText={searchText}
        onChangeText={text => {
          setSearchText(text);
          if (currentPageIndex == 0) {
            handleSearchBySurah(text);
          } else if (currentPageIndex == 1) {
            handleSearchByJuz(text);
          } else if (currentPageIndex == 2) {
          } else {
          }
        }}
        searchEnable={searchbarVisible}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default DashBoard;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlue,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5@s',
    paddingBottom: '14@s',
  },
});
