import { useCallback } from 'react'
import { useCarContext } from '@/entities/car'
import type {
    InteractionDataForm,
    InteractionResData
} from '@/entities/interaction'
import {
    useCreateInteractionMutation,
    useUpdateFuelInteractionMutation,
    useUpdateInteractionMutation,
    useCreateFuelInteractionMutation,
    useCreateOrUpdateRepairInteractionMutation,
    useCreateOrUpdatePartInteractionMutation,
    useCreateWheelInteractionMutation,
    useUpdateWheelInteractionMutation,
    isFuelType,
    isRepairType,
    isPartType,
    isWheelType
} from '@/entities/interaction'
import { useRouter } from '@/shared/i18n'
import { useLogger } from '@/shared/model'
import { pagesRoute } from '@/shared/routes'

interface UseSaveInteractionReturn {
    saveCallback: (data: InteractionDataForm | InteractionResData) => void
}

export function useSaveInteraction(): UseSaveInteractionReturn {
    const router = useRouter()
    const { error: logError } = useLogger()

    const [createMutation] = useCreateInteractionMutation()
    const [updateMutation] = useUpdateInteractionMutation()

    const [createFuelMutation] = useCreateFuelInteractionMutation()
    const [updateFuelMutation] = useUpdateFuelInteractionMutation()
    const [createOrUpdateRepairMutation] =
        useCreateOrUpdateRepairInteractionMutation()
    const [createOrUpdatePartMutation] =
        useCreateOrUpdatePartInteractionMutation()
    const [createWheelMutation] = useCreateWheelInteractionMutation()
    const [updateWheelMutation] = useUpdateWheelInteractionMutation()

    const { car } = useCarContext()

    const catchError = useCallback(
        (error: unknown) => {
            if (error) logError('useSaveInteraction', error)
        },
        [logError]
    )

    const saveCallback = useCallback(
        (body: InteractionDataForm | InteractionResData) => {
            return 'id' in body
                ? updateMutation({
                      carId: car.id,
                      interactionId: body.id,
                      body
                  }).then(async ({ data, error }) => {
                      if (data?.id) {
                          const {
                              fuelInteraction,
                              repairInteractions,
                              partInteractions,
                              wheelInteraction
                          } = body
                          const { id: interactionId } = data

                          if (fuelInteraction && isFuelType(data.type)) {
                              const {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  createdAt,
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  updatedAt,
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
                                  interactionId: _,
                                  ...fuelData
                              } = fuelInteraction
                              await updateFuelMutation({
                                  carId: car.id,
                                  interactionId,
                                  body: fuelData
                              })
                          } else if (
                              repairInteractions &&
                              isRepairType(data.type)
                          ) {
                              const repairIds = repairInteractions.map(
                                  repair => repair.repairId
                              )
                              await createOrUpdateRepairMutation({
                                  carId: car.id,
                                  interactionId,
                                  body: { ids: repairIds }
                              })
                          } else if (
                              partInteractions &&
                              isPartType(data.type)
                          ) {
                              const partIds = partInteractions.map(
                                  part => part.partId
                              )
                              await createOrUpdatePartMutation({
                                  carId: car.id,
                                  interactionId,
                                  body: { ids: partIds }
                              })
                          } else if (
                              wheelInteraction &&
                              isWheelType(data.type)
                          ) {
                              const {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  createdAt,
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  updatedAt,
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
                                  interactionId: _,
                                  ...wheelData
                              } = wheelInteraction
                              await updateWheelMutation({
                                  carId: car.id,
                                  interactionId,
                                  body: wheelData
                              })
                          }

                          router.push(pagesRoute.carId(car.id))
                      }
                      catchError(error)
                  })
                : createMutation({ carId: car.id, body }).then(
                      async ({ data, error }) => {
                          if (data?.id) {
                              const {
                                  fuelData,
                                  repairData,
                                  partData,
                                  wheelData
                              } = body
                              const { id: interactionId } = data

                              if (fuelData && isFuelType(data.type)) {
                                  await createFuelMutation({
                                      carId: car.id,
                                      interactionId,
                                      body: fuelData
                                  })
                              } else if (
                                  repairData &&
                                  isRepairType(data.type)
                              ) {
                                  await createOrUpdateRepairMutation({
                                      carId: car.id,
                                      interactionId,
                                      body: repairData
                                  })
                              } else if (partData && isPartType(data.type)) {
                                  await createOrUpdatePartMutation({
                                      carId: car.id,
                                      interactionId,
                                      body: partData
                                  })
                              } else if (wheelData && isWheelType(data.type)) {
                                  await createWheelMutation({
                                      carId: car.id,
                                      interactionId,
                                      body: wheelData
                                  })
                              }

                              router.push(pagesRoute.carId(car.id))
                          }
                          catchError(error)
                      }
                  )
        },
        // eslint-disable-next-line no-commented-code/no-commented-code
        /* ('id' in body
                ? updateMutation({
                      carId: car.id,
                      interactionId: body.id,
                      body
                  })
                : createMutation({ carId: car.id, body })}
            ).then(({ data, error }) => {
                if (data?.id) {
                    router.push(pagesRoute.carId(car.id))
                }
                if (error) logError('useSaveInteraction', error)
            }) */
        [
            car.id,
            catchError,
            createFuelMutation,
            createMutation,
            createOrUpdatePartMutation,
            createOrUpdateRepairMutation,
            createWheelMutation,
            router,
            updateFuelMutation,
            updateMutation,
            updateWheelMutation
        ]
    )

    return { saveCallback }
}
