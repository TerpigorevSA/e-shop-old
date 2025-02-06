import { error } from "console";
import { canCastToExtendedFetchError, canCastToFetchError } from "./errorsCast";
import { errorsToStrings } from "./errorsToStrings";

export const unexpectedErrorBounce=(error:unknown)=>{
    if(!!error && !Array.isArray(error) ){
        if(canCastToFetchError(error)){
          throw Error(errorsToStrings(error.data).join(',\n'),{cause:error})
        }
        if(canCastToExtendedFetchError(error)){
          throw Error(error.error,{cause:error})
        }
        throw Error('Unknown error',{cause:error});
      }
}