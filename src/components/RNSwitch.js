import React from 'react';
import {Platform, Switch, View} from 'react-native';
import {COLORS} from '../theme';

const RNSwitch = ({onValueChange, value}) => {
  return (
    <View>
      <Switch
        trackColor={{
          false: COLORS.lightSlateGray,
          true: COLORS.lightSlateYellow,
        }}
        thumbColor={COLORS.yellow}
        ios_backgroundColor={COLORS.lightSlateGray}
        onValueChange={onValueChange}
        value={value}
        style={{
          transform:
            Platform.OS === 'ios'
              ? [{scaleX: 0.9}, {scaleY: 0.85}]
              : [{scaleX: 1}, {scaleY: 1}],
        }}
      />
    </View>
  );
};

export default RNSwitch;
