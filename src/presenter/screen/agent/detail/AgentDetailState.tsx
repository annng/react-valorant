import { useState } from "react"
import { Agents } from "../../../../data/response/Agents"
import { ResponseData } from "../../../../data/response/ResponseData"
import GameService from "../../../../data/remote/GameService"

const AgentDetailState = () => {

    const gameService = new GameService()
    
    const [agents , setAgents] = useState<ResponseData<Agents>>({
        status: 0,
        data: null
    })


    const fetchAgent = async (uuid : string) => {
        const data = await gameService.getAgent(uuid);
        setAgents(data) 
    }

    return {fetchAgent, agents}
}

export default AgentDetailState