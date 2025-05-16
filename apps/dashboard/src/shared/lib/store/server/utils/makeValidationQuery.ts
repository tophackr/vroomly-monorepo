import type {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    QueryReturnValue
} from '@reduxjs/toolkit/query/react'
import {
    type BaseIssue,
    type BaseSchema,
    type InferOutput,
    safeParse
} from 'valibot'
import { getLogger } from '@/shared/model'

type TBaseSchema = BaseSchema<unknown, unknown, BaseIssue<unknown>>

interface BodyArgs<TReq extends TBaseSchema> {
    body: InferOutput<TReq>
}

interface SchemasProps<
    TReq extends TBaseSchema | undefined,
    TRes extends TBaseSchema
> {
    reqSchema?: TReq | undefined
    resSchema: TRes
}

export function formatIssues<T>(issues: BaseIssue<T>[]): string[] {
    return issues.map(issue => {
        const path = issue.path?.length
            ? issue.path.map(i => i.key).join('.')
            : '(root)'
        return `${path}: ${issue.message}`
    })
}

export function makeValidatedQueryFn<
    TReq extends TBaseSchema | undefined,
    TRes extends TBaseSchema,
    BaseQuery extends BaseQueryFn,
    TArgs = TReq extends TBaseSchema ? BodyArgs<TReq> : unknown
>(
    { reqSchema, resSchema }: SchemasProps<TReq, TRes>,
    getRequest: (arg: TArgs) => string | FetchArgs
) {
    return async (
        arg: TArgs,
        _queryApi: BaseQueryApi,
        _extraOptions: unknown,
        fetchWithBQ: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
    ): Promise<QueryReturnValue<InferOutput<TRes>, unknown, object>> => {
        const { log } = getLogger()

        if (reqSchema) {
            const parsedArg = arg as BodyArgs<Extract<TReq, TBaseSchema>>
            log('validation request:', parsedArg.body)
            const requestParsed = safeParse(reqSchema, parsedArg.body)
            if (!requestParsed.success) {
                return {
                    error: {
                        status: 'VALIDATION_ERROR',
                        issues: formatIssues(requestParsed.issues)
                    }
                }
            }
        }

        const result = await fetchWithBQ(getRequest(arg))

        if (result?.error) return result

        log('validation response', result.data)
        const responseParsed = safeParse(resSchema, result.data)
        if (!responseParsed.success) {
            return {
                error: {
                    status: 'VALIDATION_ERROR',
                    issues: formatIssues(responseParsed.issues)
                }
            }
        }

        log('result', result)

        return result
    }
}
