export { mergeClasses } from './classnames'
export { trimText } from './trim-text'

export type { APIStatus } from './api'

export { createStatusObjectSelector, useAppDispatch, useAppSelector } from './redux'
export {
    type SliceStateError,
    type SliceStateStatus,
    type AnyErrorKey,
    type AnyStatusKey,
    type ResetErrorActionPayload,
    type ResetStatusActionPayload,
    type SliceStateStatusName,
    type RejectValue
} from './slice-types'

export {
    processError,
    pendingHandler,
    rejectedHandler,
    resetSliceStatus,
    resetSliceError,
    addDefaultExtraReducers,
    handleError
} from './slice'