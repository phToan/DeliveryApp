import moment from "moment/moment";
import { Linking } from "react-native";

export const renderTime = (time) => {
    const localDate = moment.utc(time).utcOffset('+07:00');
    const formattedDate = localDate.format("HH:mm:ss DD-MM-YYYY");
    return formattedDate
}
