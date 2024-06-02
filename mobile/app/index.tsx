import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from 'react-native';

export default function Login() {
    return (
        <View style={styles.container}>
            <View>
                <Link href="/" style={{ color: "#0603aa" }}>
                    <Text>Ir para o início</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#1a2735"
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
