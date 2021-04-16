import React from 'react'
import { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LargeBtn, MediumBtn, SmallBtn } from './buttons';

export const GridView = () => {
    const [data, setData] = useState([
        {name: 'apple', id: '1', type: 'medium'},
        {name: 'banana', id: '2', type: 'large'},
        {name: 'orange', id: '3', type: 'large'},
        {name: 'grape', id: '4', type: 'large'},
        {name: 'orange', id: '5', type: 'medium'},
        {name: 'grape', id: '6', type: 'large'},
    ]);

    const buttonMap = (type) => {
        if (type === 'small') {
            return(<SmallBtn></SmallBtn>);
        } else if (type === 'medium') {
            return(<View><MediumBtn></MediumBtn><MediumBtn></MediumBtn></View>);
        } else if (type === 'large') {
            return(<LargeBtn></LargeBtn>);
        } else {
            return(<View></View>);
        }
    }

    const smartLayout = ({item}) => {
        return buttonMap(item.type);
    }

    return(
        <View>
            <FlatList
                contentContainerStyle={{justifyContent:'space-between'}}
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={data}
                renderItem={smartLayout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default GridView;