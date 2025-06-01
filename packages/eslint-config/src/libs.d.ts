declare module "eslint-plugin-i"
declare module "eslint-plugin-unicorn"
declare module "eslint-plugin-only-warn"
declare module "eslint-plugin-no-commented-code"
declare module "eslint-plugin-etc"
declare module "eslint-plugin-boundaries"
declare module "@feature-sliced/eslint-plugin-messages" // only used for processor "fs"
declare module "eslint-config-prettier" {
  import { RulesRecord } from "eslint"
  const rules: RulesRecord
  export default { rules }
}
