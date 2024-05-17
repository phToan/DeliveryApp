import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import color from '../../Assets/color';
import { styles } from './styles';

const LoadingModal = ({ visible }) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.background}>
                <View style={styles.component}>
                    <ActivityIndicator
                        size={'large'}
                        color={color.darkorange}
                    />
                    <Text style={styles.indicator}> Loading...</Text>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;
