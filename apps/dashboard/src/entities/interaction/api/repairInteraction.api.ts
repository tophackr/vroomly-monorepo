import type { RepairOnInteraction } from '@vroomly/prisma'
import { array } from 'valibot'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import { backendApi, makeValidatedQueryFn } from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { InteractionIdProps } from '../model/props'
import type { RepairInteractionData } from '../model/schemas/repairInteractionSchema'
import {
    repairInteractionReqSchema,
    repairInteractionResSchema
} from '../model/schemas/repairInteractionSchema'

interface RepairInteractionApiBody {
    body: RepairInteractionData
}

export const repairInteractionApi = backendApi.injectEndpoints({
    endpoints: build => ({
        createOrUpdateRepairInteraction: build.mutation<
            RepairOnInteraction[],
            CarIdProps & InteractionIdProps & RepairInteractionApiBody
        >({
            queryFn: makeValidatedQueryFn(
                {
                    reqSchema: repairInteractionReqSchema,
                    resSchema: array(repairInteractionResSchema)
                },
                ({ carId, interactionId, body }) => ({
                    url: apiRoute.repairInteractionId(carId, interactionId),
                    method: 'PUT',
                    body
                })
            )
        })
    })
})

export const { useCreateOrUpdateRepairInteractionMutation } =
    repairInteractionApi
