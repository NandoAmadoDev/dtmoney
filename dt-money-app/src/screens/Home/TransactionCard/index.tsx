
import { Transaction } from '@/shared/interfaces/transaction'
import { FC, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { colors } from '@/shared/colors'
import { TransactionType } from '@/shared/enums/transaction-type'
import { useTransactionContext } from '@/context/transaction.context'
import clsx from 'clsx'
import { RightAction } from './RightAction'
import { LeftAction } from './LeftAction'
import { moneyMapper } from '@/shared/utils/money-mapper'

interface Params {
  transaction: Transaction
}

export const TransactionCard: FC<Params> = ({ transaction }) => {
  const isExpense = transaction.type.id === TransactionType.EXPENSE

  const swipeableRef = useRef<SwipeableMethods>(null)
  const { swipeCloseVersion } = useTransactionContext()

  const handleCloseSwipeable = () => {
    swipeableRef.current?.close()
  }

  useEffect(() => {
    swipeableRef.current?.close()
  }, [swipeCloseVersion])

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'visible',
        width: '90%',
        marginBottom: 16,
      }}
      renderRightActions={() => (
        <RightAction transactionId={transaction.id} />
      )}
      renderLeftActions={() => (
        <LeftAction
          transaction={transaction}
          onEditSuccess={handleCloseSwipeable}
        />
      )}
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="h-[140] bg-background-tertiary rounded-md p-6 justify-between">

        {/* LINHA SUPERIOR: DESCRIÇÃO E ÍCONE */}
        <View className="flex-row justify-between items-center">
          <Text
            className="text-white text-base flex-1 mr-3"
            numberOfLines={1}
          >
            {transaction.description}
          </Text>

          <MaterialIcons
            name={
              isExpense
                ? 'arrow-circle-down'
                : 'arrow-circle-up'
            }
            color={
              isExpense
                ? colors['accent-red']
                : colors['accent-blue']
            }
            size={24}
          />
        </View>

        {/* VALOR */}
        <Text
          className={clsx(
            'text-xl font-bold',
            isExpense
              ? 'text-accent-red'
              : 'text-accent-blue',
          )}
        >
          {isExpense && '-'}R$ {moneyMapper(transaction.value)}
        </Text>

        {/* LINHA INFERIOR: CATEGORIA E DATA */}
        <View className="flex-row w-full justify-between items-center">

          <View className="items-center flex-row flex-1 mr-2">
            <MaterialIcons
              name="label-outline"
              color={colors.gray[700]}
              size={23}
            />

            <Text
              className="text-gray-700 text-base ml-2 flex-shrink"
              numberOfLines={1}
            >
              {transaction.category.name}
            </Text>
          </View>

          <View className="items-center flex-row">
            <MaterialIcons
              name="calendar-month"
              color={colors.gray[700]}
              size={20}
            />

            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, 'dd/MM/yyyy')}
            </Text>
          </View>

        </View>
      </View>
    </Swipeable>
  )
}