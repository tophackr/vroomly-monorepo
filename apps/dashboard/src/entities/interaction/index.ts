export type { WheelInteractionData } from './model/schemas/wheelInteractionSchema'
export {
    isMileageType,
    isFuelType,
    isRepairType,
    isPartType,
    isWheelType
} from './model/isType'
export {
    useCreateFuelInteractionMutation,
    useUpdateFuelInteractionMutation
} from './api/fuelInteraction.api'
export { useCreateOrUpdateRepairInteractionMutation } from './api/repairInteraction.api'
export { useCreateOrUpdatePartInteractionMutation } from './api/partInteraction.api'
export {
    useCreateWheelInteractionMutation,
    useUpdateWheelInteractionMutation
} from './api/wheelInteraction.api'
export {
    useCreateInteractionMutation,
    useDeleteInteractionMutation,
    useFindAllInteractionsQuery,
    useFindOneInteractionQuery,
    useUpdateInteractionMutation
} from './api/interaction.api'
export {
    InteractionContextProvider,
    useInteractionContext
} from './model/InteractionContextProvider'
export type {
    InteractionData,
    InteractionResData,
    InteractionDataForm
} from './model/schemas/interactionSchema'
export type {
    CategoryProps,
    InteractionIdProps,
    InteractionProps
} from './model/props'
export { actionsRoute } from './routes/actions'
export { InteractionFormSkeleton } from './ui/InteractionFormSkeleton'
export { InteractionList } from './ui/InteractionList'
