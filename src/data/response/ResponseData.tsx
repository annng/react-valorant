import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export interface ResponseData<T>{
    status : Int32,
    data? : T | null
    message? : string
}