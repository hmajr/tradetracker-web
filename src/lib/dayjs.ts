import dayjs from "dayjs";
import 'dayjs/locale/pt'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export const FORMAT_STYLE = 'ddd, DD MMM YYYY HH:mm:ss'
dayjs.locale('pt')