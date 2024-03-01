import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
export const GradientColor = ({
    style,
    x1,
    x2,
    y1,
    y2
}) => (
    <Svg style={style}>
        <Defs>
            <LinearGradient id="gradient" x2={`${x2}%`} y1={`${y1}%`} x1={`${x1}%`} y2={`${y2}%`}>
                <Stop offset="0%" stopColor="rgb(255,242,161)" />
                <Stop offset="35%" stopColor="rgba(255,248,211,1)" />
                <Stop offset="100%" stopColor="rgba(229,251,255,1)" />
            </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
)