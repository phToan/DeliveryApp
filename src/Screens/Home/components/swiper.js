import Swiper from 'react-native-swiper'
import { Image } from 'react-native'
const image = {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
}
export const SwiperView = () => (
    <Swiper
        loop
        autoplay
        horizontal
    >
        <Image
            source={require('../../../Assets/Image/slide1.jpg')}
            style={image}
        />
        <Image source={require('../../../Assets/Image/slide2.jpg')}
            style={image}
        />
        <Image source={require('../../../Assets/Image/slide3.jpg')}
            style={image}
        />
    </Swiper>
)