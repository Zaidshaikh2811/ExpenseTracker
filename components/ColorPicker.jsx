import React from 'react'
import { View } from 'react-native'
import Colors from '../utils/Colors'
import { TouchableOpacity } from 'react-native';

const ColorPicker = ({ setSelectedColor, selectedColor }) => {


    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
            {Colors.COLOR_LIST.map((color, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={[{
                            height: 30,
                            width: 30,
                            backgroundColor: color,
                            borderRadius: 99,

                        }, selectedColor == color && { borderWidth: 2 }]}
                        onPress={() => setSelectedColor(color)}
                    />
                );
            })}
        </View>
    );
};

export default ColorPicker;
