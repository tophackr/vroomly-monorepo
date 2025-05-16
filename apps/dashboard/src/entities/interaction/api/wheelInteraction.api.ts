import type { WheelInteraction } from '@vroomly/prisma'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import { backendApi, makeValidatedQueryFn } from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { InteractionIdProps } from '../model/props'
import type { WheelInteractionData } from '../model/schemas/wheelInteractionSchema'
import {
    wheelInteractionReqSchema,
    wheelInteractionResSchema
} from '../model/schemas/wheelInteractionSchema'

interface WheelInteractionApiBody {
    body: WheelInteractionData
}

export const wheelInteractionApi = backendApi.injectEndpoints({
    endpoints: build => ({
        createWheelInteraction: build.mutation<
            WheelInteraction,
            CarIdProps & InteractionIdProps & WheelInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: wheelInteractionReqSchema,
                    resSchema: wheelInteractionResSchema
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.wheelInteractionId(carId, interactionId),
                    method: 'POST',
                    body
                })
            )
        }),
        updateWheelInteraction: build.mutation<
            WheelInteraction,
            CarIdProps & InteractionIdProps & WheelInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: wheelInteractionReqSchema,
                    resSchema: wheelInteractionResSchema
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.wheelInteractionId(carId, interactionId),
                    method: 'PATCH',
                    body
                })
            )
        })
    })
})

export const {
    useCreateWheelInteractionMutation,
    useUpdateWheelInteractionMutation
} = wheelInteractionApi
