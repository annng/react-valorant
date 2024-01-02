import ApiConfig from "../../core/shared/ApiConfig";
import { ResponseData } from "../response/ResponseData";
import { Weapons } from "../response/Weapons";

class WeaponService{
    private apiConfig: ApiConfig;

    constructor(){
        this.apiConfig = ApiConfig.getInstance()
    }

    public async getWeaponDetails(uuid : string): Promise<ResponseData<Weapons>> {
      
        const result = await this.apiConfig.getAxiosInstance().get(`weapons/${uuid}`)
        .then((response => {
          return response.data
        }))
    
        return result
      }
}