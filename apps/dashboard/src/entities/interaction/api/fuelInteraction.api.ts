import type { FuelInteraction } from '@vroomly/prisma'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import { backendApi, makeValidatedQueryFn } from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { InteractionIdProps } from '../model/props'
import type { FuelInteractionData } from '../model/schemas/fuelInteractionSchema'
import {
    fuelInteractionReqSchema,
    fuelInteractionResSchema
} from '../model/schemas/fuelInteractionSchema'

interface FuelInteractionApiBody {
    body: FuelInteractionData
}

export const fuelInteractionApi = backendApi.injectEndpoints({
    endpoints: build => ({
        createFuelInteraction: build.mutation<
            FuelInteraction,
            CarIdProps & InteractionIdProps & FuelInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: fuelInteractionReqSchema,
                    resSchema: fuelInteractionResSchema
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.fuelInteractionId(carId, interactionId),
                    method: 'POST',
                    body
                })
            )
        }),
        updateFuelInteraction: build.mutation<
            FuelInteraction,
            CarIdProps & InteractionIdProps & FuelInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: fuelInteractionReqSchema,
                    resSchema: fuelInteractionResSchema
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.fuelInteractionId(carId, interactionId),
                    method: 'PATCH',
                    body
                })
            )
        })
    })
})

export const {
    useCreateFuelInteractionMutation,
    useUpdateFuelInteractionMutation
} = fuelInteractionApi
