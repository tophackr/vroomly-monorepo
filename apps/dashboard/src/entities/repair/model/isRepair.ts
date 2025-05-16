import type { RepairOption } from '@vroomly/prisma'

// todo: this is a temporary solution that needs to be fixed.
// enum does not return values, although the other one works correctly.
const repairOptions: RepairOption[] = [
    'engine_oil',
    'transmission_oil',
    'oil_filter',
    'air_filter',
    'cabin_filter',
    'front_brake_pads',
    'rear_brake_pads',
    'brake_fluid',
    'front_brake_discs',
    'rear_brake_discs',
    'air_conditioner_refill',
    'spark_plugs',
    'coolant',
    'alignment',
    'timing_belt',
    'fuel_filter',
    'transfer_case_oil',
    'differential_oil',
    'car_battery',
    'power_steering_fluid',
    'clutch'
]

export function isRepair(value: string): value is RepairOption {
    return (repairOptions as readonly string[]).includes(value)
}
