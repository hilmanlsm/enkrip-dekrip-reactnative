import React from 'react';
import { Text, View } from 'react-native';

const ValueApp = ({
    title = title ? title : '',
    value = '',
}) => (
    <View style={{
        paddingHorizontal: 10,
        paddingVertical: 15,
    }}>
        <Text style={{
            color: 'red',
        }}>{title} :</Text>
        <Text style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
        }}>{value.length ? value : '-'}</Text>
        {/* <Icon name='sc-telegram' type='evilicon' color='#517fa4' /> */}
    </View>
);

export default ValueApp;
