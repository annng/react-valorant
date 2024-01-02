import { useState } from "react";
import GameService from "../../../../data/remote/GameService";
import { Agents } from "../../../../data/response/Agents";
import { ResponseData } from "../../../../data/response/ResponseData";
import { MapGame } from "../../../../data/response/MapGame";

const MapDetailState = () => {

    const gameService = new GameService()
    
    const [maps , setMaps] = useState<ResponseData<MapGame>>({
        status: 0,
        data: null
    })

    const [mapList , setMapList] = useState<ResponseData<Array<MapGame>>>({
        status: 0,
        data: null
    })


    const fetchMaps = async (uuid : string) => {
        const data = await gameService.getMap(uuid);
        setMaps(data) 
    }

    const fetchListMaps = async () => {
        const data = await gameService.getMaps()
        setMapList(data)
    }

    return {fetchMaps, maps, fetchListMaps, mapList}
}

export default MapDetailState