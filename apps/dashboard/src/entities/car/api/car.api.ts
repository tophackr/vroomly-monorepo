import type { Car } from '@vroomly/prisma'
import { array } from 'valibot'
import {
    ApiTags,
    backendApi,
    invalidatesTagsToList,
    makeValidatedQueryFn,
    providesTagsToList
} from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { CarData } from '../model/carSchema'
import { carReqSchema, carResSchema } from '../model/carSchema'
import type { CarIdProps } from '../model/props'

interface CarApiBody {
    body: CarData
}

export const carApi = backendApi
    .injectEndpoints({
        endpoints: build => ({
            createCar: build.mutation<Car, CarApiBody>({
                queryFn: makeValidatedQueryFn(
                    { reqSchema: carReqSchema, resSchema: carResSchema },
                    ({ body }) => ({
                        url: apiRoute.car,
                        method: 'POST',
                        body
                    })
                )
            }),
            findAllCars: build.query<Car[], void>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: array(carResSchema) },
                    () => apiRoute.car
                )
            }),
            findOneCar: build.query<Car, CarIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: carResSchema },
                    ({ carId }) => apiRoute.carId(carId)
                )
            }),
            updateCar: build.mutation<Car, CarIdProps & CarApiBody>({
                queryFn: makeValidatedQueryFn(
                    { reqSchema: carReqSchema, resSchema: carResSchema },
                    ({ carId, body }) => ({
                        url: apiRoute.carId(carId),
                        method: 'PATCH',
                        body
                    })
                )
            }),
            deleteCar: build.mutation<Car, CarIdProps>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: carResSchema },
                    ({ carId }) => ({
                        url: apiRoute.carId(carId),
                        method: 'DELETE'
                    })
                )
            })
        })
    })
    .enhanceEndpoints({
        endpoints: {
            createCar: {
                invalidatesTags: () =>
                    invalidatesTagsToList({ tag: ApiTags.car })
            },
            findAllCars: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.car, result })
            },
            findOneCar: {
                providesTags: result =>
                    providesTagsToList({ tag: ApiTags.car, result })
            },
            updateCar: {
                invalidatesTags: result =>
                    invalidatesTagsToList({ tag: ApiTags.car, result })
            },
            deleteCar: {
                invalidatesTags: () =>
                    invalidatesTagsToList({ tag: ApiTags.car })
            }
        }
    })

export const {
    useCreateCarMutation,
    useFindAllCarsQuery,
    useFindOneCarQuery,
    useUpdateCarMutation,
    useDeleteCarMutation
} = carApi
