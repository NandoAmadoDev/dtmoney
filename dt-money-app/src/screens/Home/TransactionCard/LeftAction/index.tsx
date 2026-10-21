
import { Transaction } from '@/shared/interfaces/transaction'
import { FC } from 'react'
import { View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'
import { EditTransactionForm } from './EditTransactionForm'

interface Params {
  transaction: Transaction
  onEditSuccess: () => void
}

export const LeftAction: FC<Params> = ({
  transaction,
  onEditSuccess,
}) => {
  const { openBottomSheet } = useBottomSheetContext()

  const handleEdit = () => {
    openBottomSheet(
      <EditTransactionForm
        transaction={transaction}
        onEditSuccess={onEditSuccess}
      />,
      0,
    )
  }

  return (
    <RectButton
      onPress={handleEdit}
      style={{
        width: 80,
        height: 140,
        backgroundColor: colors['accent-brand-background-primary'],
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
      }}
    >
      <View className="flex-1 items-center justify-center">
        <MaterialIcons
          name="edit"
          size={30}
          color={colors.white}
        />
      </View>
    </RectButton>
  )
}
