import { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useBottomSheetContext } from '@/context/bottomsheet.context'
import { DateFilter } from './DateFilter'
import { CategoryFilter } from './CategoryFilter'
import { TypeFilter } from './TypeFilter'
import { AppButton } from '@/components/AppButton'
import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export const TransactionsFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const {
    fetchTransactions,
    handleLoadings,
    resetFilter,
    closeAllSwipeables,
  } = useTransactionContext()

  const { handleError } = useErrorHandler()

  const [loading, setLoading] = useState(false)

  const handleCloseFilter = () => {
    if (loading) return

    closeBottomSheet()
  }

  const handleFetchTransactions = async () => {
    if (loading) return

    try {
      setLoading(true)
      handleLoadings({
        key: 'refresh',
        value: true,
      })

      await fetchTransactions({ page: 1 })

      // Recolhe lápis e lixeira
      closeAllSwipeables()

      closeBottomSheet()
    } catch (error) {
      handleError(error, 'Falha ao aplicar filtros')
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
      setLoading(false)
    }
  }

  const handleResetFilter = async () => {
    if (loading) return

    try {
      setLoading(true)
      handleLoadings({
        key: 'refresh',
        value: true,
      })

      await resetFilter()

      // Recolhe lápis e lixeira
      closeAllSwipeables()

      closeBottomSheet()
    } catch (error) {
      handleError(error, 'Falha ao limpar filtros')
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 p-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold mb-5 text-white">
          Filtrar transações
        </Text>

        <TouchableOpacity
          onPress={handleCloseFilter}
          disabled={loading}
          hitSlop={10}
        >
          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[600]}
          />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />

      <TypeFilter />

      <View className="flex-row gap-4 mt-8">
        <AppButton
          className="flex-1"
          widthFull={false}
          mode="outline"
          onPress={handleResetFilter}
          disabled={loading}
        >
          Limpar filtros
        </AppButton>

        <AppButton
          className="flex-1"
          widthFull={false}
          onPress={handleFetchTransactions}
          disabled={loading}
        >
          Filtrar
        </AppButton>
      </View>

      {loading && (
        <View className="mt-4 items-center">
          <ActivityIndicator
            color={colors['accent-blue']}
            size="small"
          />
        </View>
      )}
    </View>
  )
}
