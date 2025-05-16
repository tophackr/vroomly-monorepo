import type { PartOnInteraction } from '@vroomly/prisma'
import { array } from 'valibot'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import { backendApi, makeValidatedQueryFn } from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { InteractionIdProps } from '../model/props'
import {
    partInteractionReqSchema,
    partInteractionResSchema,
    type PartInteractionData
} from '../model/schemas/partInteractionSchema'

interface PartInteractionApiBody {
    body: PartInteractionData
}

export const partInteractionApi = backendApi.injectEndpoints({
    endpoints: build => ({
        createOrUpdatePartInteraction: build.mutation<
            PartOnInteraction[],
            CarIdProps & InteractionIdProps & PartInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: partInteractionReqSchema,
                    resSchema: array(partInteractionResSchema)
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.partInteractionId(carId, interactionId),
                    method: 'PUT',
                    body
                })
            )
        })
    })
})

export const { useCreateOrUpdatePartInteractionMutation } = partInteractionApi
