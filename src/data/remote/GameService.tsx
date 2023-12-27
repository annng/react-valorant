import ApiConfig from "../../core/shared/ApiConfig";
import { Agents } from "../response/Agents";
import { MapGame } from "../response/MapGame";
import { ResponseData } from "../response/ResponseData";
import { Weapons } from "../response/Weapons";

class GameService {
    private apiConfig: ApiConfig;
  
    constructor() {
      this.apiConfig = ApiConfig.getInstance();
    }
  
    public async getMaps(): Promise<ResponseData<Array<MapGame>>> {
      
      const result = await this.apiConfig.getAxiosInstance().get('maps')
      .then((response => {
        return response.data
      }))
  
      return result
    }
  
  
    public async getAgents(): Promise<ResponseData<Array<Agents>>> {
  
      const result = await this.apiConfig.getAxiosInstance().get('agents', {
        params: {
          isPlayableCharacter: true
        }
      }).then((response => {
        return response.data
      }))
  
      return result
    }


    public async getWeapons(): Promise<ResponseData<Array<Weapons>>> {
  
      const result = await this.apiConfig.getAxiosInstance().get('weapons').then((response => {
        return response.data
      }))
  
      return result
    }


    public async getAgent(uuid: string): Promise<ResponseData<Agents>> {
      const result = await this.apiConfig.getAxiosInstance().get('agents/' + uuid, {
        params: {
          isPlayableCharacter: true
        }
      }).then((response => {
        return response.data
      }))
  
      return result
    }

    
  
  }
  
  export default GameService;