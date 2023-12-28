import { useState, useEffect } from "react";
import GameService from "../../../../data/remote/GameService";
import { Agents } from "../../../../data/response/Agents";
import { ResponseData } from "../../../../data/response/ResponseData";

const AgentListState = () => {
    const gameService = new GameService()

    const [agents, setAgents] = useState<ResponseData<Array<Agents>>>({
        status: 0,
        data: null
    })

    const [visibleAgents, setVisibleAgents] = useState<Array<Agents>>([])


    const fetchAgents = async () => {
        const data = await gameService.getAgents();
        setAgents(data)
       
        if(data.data != null)
            setVisibleAgents(data.data)
    }

    const searchAgents = (keyword: string | null) => {
        if(keyword === "" || keyword === null){
            setVisibleAgents(agents.data ?? [])
        }else{
            var filterAgents = agents.data?.filter(e => e.displayName.toLowerCase().includes(keyword.toLowerCase()))
            setVisibleAgents(filterAgents ?? [])
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])



    return { fetchAgents, agents, visibleAgents, searchAgents }
}

export default AgentListState

