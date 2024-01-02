import { useEffect, useState } from "react";
import GameService from "../../../../data/remote/GameService";
import { MapGame } from "../../../../data/response/MapGame";
import { ResponseData } from "../../../../data/response/ResponseData";

const MapListState = () => {
    const gameService = new GameService()

    const [maps, setMaps] = useState<ResponseData<Array<MapGame>>>({
        status: 0,
        data: []
    })

    const [visibleMap, setVisibleMap] = useState<Array<MapGame>>([])

    const fetchMaps = async () => {
        const data = await gameService.getMaps();
        setMaps(data)
        setVisibleMap(data.data ?? [])
    }

    const searchMaps = (keyword: string | null) => {
        if (keyword === "" || keyword === null) {
            setVisibleMap(maps.data ?? [])
        } else {
            var filterAgents = maps.data?.filter(e => e.displayName.toLowerCase().includes(keyword.toLowerCase()))
            setVisibleMap(filterAgents ?? [])
        }
    }

    useEffect(() => {
        fetchMaps()
    }, [])

    return { fetchMaps, maps, searchMaps, visibleMap }
}

export default MapListState