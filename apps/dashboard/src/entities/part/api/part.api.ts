import type { Part } from '@vroomly/prisma'
import { array } from 'valibot'
import type { CarIdProps } from '@/entities/car/@x/part'
import {
    ApiTags,
    backendApi,
    invalidatesTagsToList,
    makeValidatedQueryFn,
    providesTagsToList
} from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import {
    type PartData,
    partReqSchema,
    partResSchema
} from '../model/partSchema'
import type { PartIdProps } from '../model/props'

interface PartApiBody {
    body: PartData
}

export const partApi = backendApi
    .injectEndpoints({
        endpoints: build => ({
            createPart: build.mutation<Part, CarIdProps & PartApiBody>({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: partReqSchema,
                        resSchema: partResSchema
                    },
                    ({ carId, body }) => ({
                        url: apiRoute.part(carId),
                        method: 'POST',
                        body
                    })
                )
            }),
            findAllParts: build.query<Part[], CarIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: array(partResSchema) },
                    ({ carId }) => apiRoute.part(carId)
                )
            }),
            findOnePart: build.query<Part, CarIdProps & PartIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: partResSchema },
                    ({ carId, partId }) => apiRoute.partId(carId, partId)
                )
            }),
            updatePart: build.mutation<
                Part,
                CarIdProps & PartIdProps & PartApiBody
            >({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: partReqSchema,
                        resSchema: partResSchema
                    },
                    ({ carId, partId, body }) => ({
                        url: apiRoute.partId(carId, partId),
                        method: 'PATCH',
                        body
                    })
                )
            }),
            deletePart: build.mutation<Part, CarIdProps & PartIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: partResSchema },
                    ({ carId, partId }) => ({
                        url: apiRoute.partId(carId, partId),
                        method: 'DELETE'
                    })
                )
            })
        })
    })
    .enhanceEndpoints({
        endpoints: {
            createPart: {
                invalidatesTags: () =>
                    invalidatesTagsToList({ tag: ApiTags.part })
            },
            findAllParts: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.part, result })
            },
            findOnePart: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.part, result })
            },
            updatePart: {
                invalidatesTags: result =>
                    invalidatesTagsToList({ tag: ApiTags.part, result })
            },
            deletePart: {
                invalidatesTags: () =>
                    invalidatesTagsToList({ tag: ApiTags.part })
            }
        }
    })

export const {
    useCreatePartMutation,
    useFindAllPartsQuery,
    useFindOnePartQuery,
    useUpdatePartMutation,
    useDeletePartMutation
} = partApi
