import type { Repair } from '@vroomly/prisma'
import { array } from 'valibot'
import type { CarIdProps } from '@/entities/car/@x/repair'
import {
    ApiTags,
    backendApi,
    invalidatesTagsToList,
    makeValidatedQueryFn,
    providesTagsToList
} from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import {
    type CommonRepairResData,
    commonRepairResSchema
} from '../model/commonRepairSchema'
import type { RepairIdProps } from '../model/props'
import {
    type RepairReqData,
    repairReqSchema,
    repairResSchema
} from '../model/repairSchema'

interface RepairApiBody {
    body: RepairReqData
}

interface ManyRepairApiBody {
    body: RepairReqData[]
}

export const repairApi = backendApi
    .injectEndpoints({
        endpoints: build => ({
            createRepair: build.mutation<Repair, CarIdProps & RepairApiBody>({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: repairReqSchema,
                        resSchema: repairResSchema
                    },
                    ({ carId, body }) => ({
                        url: apiRoute.repair(carId),
                        method: 'POST',
                        body
                    })
                )
            }),
            findAllRepairs: build.query<CommonRepairResData[], CarIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: array(commonRepairResSchema) },
                    ({ carId }) => apiRoute.repair(carId)
                )
            }),
            findOneRepair: build.query<Repair, CarIdProps & RepairIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: repairResSchema },
                    ({ carId, repairId }) => apiRoute.repairId(carId, repairId)
                )
            }),
            updateRepair: build.mutation<
                Repair,
                CarIdProps & RepairIdProps & RepairApiBody
            >({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: repairReqSchema,
                        resSchema: repairResSchema
                    },
                    ({ carId, repairId, body }) => ({
                        url: apiRoute.repairId(carId, repairId),
                        method: 'PATCH',
                        body
                    })
                )
            }),
            updateManyRepair: build.mutation<
                Repair[],
                CarIdProps & ManyRepairApiBody
            >({
                queryFn: makeValidatedQueryFn(
                    {
                        reqSchema: array(repairReqSchema),
                        resSchema: array(repairResSchema)
                    },
                    ({ carId, body }) => ({
                        url: apiRoute.repair(carId),
                        method: 'PATCH',
                        body
                    })
                )
            }),
            deleteRepair: build.mutation<Repair, CarIdProps & RepairIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: repairResSchema },
                    ({ carId, repairId }) => ({
                        url: apiRoute.repairId(carId, repairId),
                        method: 'DELETE'
                    })
                )
            })
        })
    })
    .enhanceEndpoints({
        endpoints: {
            createRepair: {
                invalidatesTags: () =>
                    invalidatesTagsToList({
                        tag: ApiTags.repair,
                        depsTags: [ApiTags.interaction]
                    })
            },
            findAllRepairs: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.repair, result })
            },
            findOneRepair: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.repair, result })
            },
            updateRepair: {
                invalidatesTags: result =>
                    invalidatesTagsToList({
                        tag: ApiTags.repair,
                        result,
                        depsTags: [ApiTags.interaction]
                    })
            },
            deleteRepair: {
                invalidatesTags: () =>
                    invalidatesTagsToList({
                        tag: ApiTags.repair,
                        depsTags: [ApiTags.interaction]
                    })
            }
        }
    })

export const {
    useCreateRepairMutation,
    useFindAllRepairsQuery,
    useFindOneRepairQuery,
    useUpdateRepairMutation,
    useUpdateManyRepairMutation,
    useDeleteRepairMutation
} = repairApi
