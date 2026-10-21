import { FC } from 'react'
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useTransactionContext } from '@/context/transaction.context'

interface Params {
  visible: boolean
  hideModal: () => void
  handleDeleteTransaction: () => void
  loading: boolean
}

export const DeleteModal: FC<Params> = ({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}) => {
  const { closeAllSwipeables } = useTransactionContext()

  // Fecha o modal e recolhe a lixeira
  const handleCancelDelete = () => {
    if (loading) return

    hideModal()
    closeAllSwipeables()
  }

  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={handleCancelDelete}
      >
        <TouchableWithoutFeedback onPress={handleCancelDelete}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback
              onPress={(e) => e.stopPropagation()}
            >
              <View className="m-5 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                <View className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                  <View className="flex-row gap-6 items-center">
                    <MaterialIcons
                      name="error-outline"
                      color={colors.gray[400]}
                      size={25}
                    />

                    <Text className="text-white text-lg">
                      Apagar transação?
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={handleCancelDelete}
                    disabled={loading}
                    hitSlop={10}
                  >
                    <MaterialIcons
                      name="close"
                      color={colors.gray[800]}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Tem certeza que deseja apagar essa transação? Esta ação não
                    pode ser desfeita
                  </Text>
                </View>

                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity
                    onPress={handleCancelDelete}
                    disabled={loading}
                    className="w-[100] border-2 border-accent-brand items-center justify-center p-3 rounded-md"
                  >
                    <Text className="text-accent-brand">
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleDeleteTransaction}
                    disabled={loading}
                    className="w-[100] bg-accent-red-background-primary items-center justify-center p-3 rounded-md"
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      <Text className="text-white">
                        Apagar
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}