import React from 'react'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import * as MailComposer from 'expo-mail-composer'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()
    const incident = route.params.incident
    const message = `Hello ${incident.name}, i'm getting in contact to help in the ${incident.title} incident, with the value of ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
        .format(incident.value)} `

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of the incident: ${incident.title}`,
            recipients: [incident.email],
            body: message,

        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapps}&text=${message}`)

    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Institution:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Incident:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })
                        .format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day</Text>
                <Text style={styles.heroTitle}>Be the Hero in this incident</Text>

                <Text style={styles.heroDescription}>Get in contact</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>
                            Whatsapp
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>
                            E-mail
                            </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>

    )
}