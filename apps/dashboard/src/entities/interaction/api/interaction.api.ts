import type { Interaction } from '@vroomly/prisma'
import { array } from 'valibot'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import {
    ApiTags,
    backendApi,
    invalidatesTagsToList,
    makeValidatedQueryFn,
    providesTagsToList
} from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { InteractionIdProps } from '../model/props'
import type {
    InteractionData,
    InteractionResData
} from '../model/schemas/interactionSchema'
import {
    interactionFindResSchema,
    interactionReqSchema,
    interactionResSchema
} from '../model/schemas/interactionSchema'

interface InteractionApiBody {
    body: InteractionData
}

export const interactionApi = backendApi
    .injectEndpoints({
        endpoints: build => ({
            createInteraction: build.mutation<
                Interaction,
                CarIdProps & InteractionApiBody
            >({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: interactionReqSchema,
                        resSchema: interactionResSchema
                    },
                    ({ carId, body }) => ({
                        url: apiRoute.interaction(carId),
                        method: 'POST',
                        body
                    })
                )
            }),
            findAllInteractions: build.query<InteractionResData[], CarIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: array(interactionFindResSchema) },
                    ({ carId }) => apiRoute.interaction(carId)
                )
            }),
            findOneInteraction: build.query<
                InteractionResData,
                CarIdProps & InteractionIdProps
            >({
                queryFn: makeValidatedQueryFn(
                    { resSchema: interactionFindResSchema },
                    ({ carId, interactionId }) =>
                        apiRoute.interactionId(carId, interactionId)
                )
            }),
            updateInteraction: build.mutation<
                Interaction,
                CarIdProps & InteractionIdProps & InteractionApiBody
            >({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: interactionReqSchema,
                        resSchema: interactionResSchema
                    },
                    ({ carId, interactionId, body }) => ({
                        url: apiRoute.interactionId(carId, interactionId),
                        method: 'PATCH',
                        body
                    })
                )
            }),
            deleteInteraction: build.mutation<
                Interaction,
                CarIdProps & InteractionIdProps
            >({
                queryFn: makeValidatedQueryFn(
                    { resSchema: interactionResSchema },
                    ({ carId, interactionId }) => ({
                        url: apiRoute.interactionId(carId, interactionId),
                        method: 'DELETE'
                    })
                )
            })
        })
    })
    .enhanceEndpoints({
        endpoints: {
            createInteraction: {
                invalidatesTags: () =>
                    invalidatesTagsToList({
                        tag: ApiTags.interaction
                    })
            },
            findAllInteractions: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.interaction, result })
            },
            findOneInteraction: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.interaction, result })
            },
            updateInteraction: {
                invalidatesTags: result =>
                    invalidatesTagsToList({
                        tag: ApiTags.interaction,
                        result
                    })
            },
            deleteInteraction: {
                invalidatesTags: () =>
                    invalidatesTagsToList({
                        tag: ApiTags.interaction
                    })
            }
        }
    })

export const {
    useCreateInteractionMutation,
    useFindAllInteractionsQuery,
    useFindOneInteractionQuery,
    useUpdateInteractionMutation,
    useDeleteInteractionMutation
} = interactionApi
