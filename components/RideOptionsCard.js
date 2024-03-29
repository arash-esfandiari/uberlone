import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { selectTravelTimeInformation } from '../slices/navSlice'


const data = [
    {
        id: 'Uber-X-123',
        title: 'Uberlone X',
        multiplier: 1,
        image: require('../assets/UberX.webp'),
    },
    {
        id: 'Uber-XL-456',
        title: 'Uberlone XL',
        multiplier: 1.2,
        image: require('../assets/UberXL.webp'),
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uberlone LUX',
        multiplier: 1.75,
        image: require('../assets/UberLUX.webp'),
    },
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={tw`z-50`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
            </View>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            <FlatList data={data} keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                            source={image}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-ca', {
                                style: 'currency',
                                currency: 'CAD'
                            }).format(
                                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`} > Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})