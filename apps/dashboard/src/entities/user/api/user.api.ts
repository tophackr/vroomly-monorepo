import type { User } from '@vroomly/prisma'
import { ApiTags, backendApi, makeValidatedQueryFn } from '@/shared/lib/store'
import { apiRoute } from '@/shared/routes'
import type { UserData } from '../model/userSchema'
import { userReqSchema, userResSchema } from '../model/userSchema'

interface UserApiBody {
    body: UserData
}

export const userApi = backendApi
    .injectEndpoints({
        endpoints: build => ({
            createUser: build.mutation<User, UserApiBody>({
                queryFn: makeValidatedQueryFn(
                    { reqSchema: userReqSchema, resSchema: userResSchema },
                    ({ body }) => ({
                        url: apiRoute.me,
                        method: 'POST',
                        body
                    })
                )
            }),
            findOneUser: build.query<User, void>({
                queryFn: makeValidatedQueryFn(
                    { resSchema: userResSchema },
                    () => apiRoute.me
                )
            }),
            updateUser: build.mutation<User, UserApiBody>({
                queryFn: makeValidatedQueryFn(
                    { reqSchema: userReqSchema, resSchema: userResSchema },
                    ({ body }) => ({
                        url: apiRoute.me,
                        method: 'PATCH',
                        body
                    })
                )
            })
        })
    })
    .enhanceEndpoints({
        endpoints: {
            createUser: {
                invalidatesTags: [ApiTags.user]
            },
            findOneUser: {
                providesTags: [ApiTags.user]
            },
            updateUser: {
                invalidatesTags: [ApiTags.user]
            }
        }
    })

export const {
    useCreateUserMutation,
    useLazyFindOneUserQuery,
    useUpdateUserMutation
} = userApi
