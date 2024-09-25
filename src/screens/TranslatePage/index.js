import React, {useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {SceneMap, TabView} from 'react-native-tab-view';
import Header from '../../components/Header';
import {COLORS, FONTS, FONTSTYLE} from '../../theme';
import Translations from '../Translation';
import Transliteration from '../Transliteration';

const TranslatePage = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'translations', title: 'Translations'},
    {key: 'transliteration', title: 'Transliteration'},
  ]);

  const renderScene = SceneMap({
    translations: () => <Translations navigation={navigation} />,
    transliteration: () => <Transliteration navigation={navigation} />,
  });

  const renderTabBar = props => {
    const currentIndex = props.navigationState.index;
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = currentIndex === i ? COLORS.yellow : COLORS.white;

          return (
            <TouchableOpacity
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
                    width: '85%',
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

  return (
    <View style={styles.container}>
      <Header
        title={'Setting'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        rightIcon={false}
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

export default TranslatePage;
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
