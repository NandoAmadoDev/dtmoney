import NativeDateTimePicker, {
  type IOSNativeProps,
} from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface DatePickerProps {
  isVisible: boolean
  date?: Date
  onCancel: () => void
  onConfirm: (date: Date) => void
}

// Keep the modal's draft date in sync without forwarding its legacy listener.
const IOSPicker = ({ onChange, ...props }: IOSNativeProps) => (
  <NativeDateTimePicker
    {...props}
    onValueChange={(event, date) =>
      onChange?.({ ...event, type: 'set' }, date)
    }
  />
)

export const DatePicker = ({
  isVisible,
  date = new Date(),
  onCancel,
  onConfirm,
}: DatePickerProps) => {
  if (Platform.OS === 'android') {
    if (!isVisible) return null

    return (
      <NativeDateTimePicker
        value={date}
        mode="date"
        onValueChange={(_, selectedDate) => onConfirm(selectedDate)}
        onDismiss={onCancel}
        onNeutralButtonPress={onCancel}
      />
    )
  }

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      date={date}
      onCancel={onCancel}
      onConfirm={onConfirm}
      customPickerIOS={IOSPicker}
      mode="date"
      confirmTextIOS="Confirmar"
      cancelTextIOS="Cancelar"
      locale="pt-BR"
    />
  )
}
