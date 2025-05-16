export enum ApiTags {
    user = 'user',
    car = 'car',
    interaction = 'interaction',
    repair = 'repair',
    part = 'part'
}

export interface TagDescription<T extends ApiTags> {
    type: T
    id: string
}
