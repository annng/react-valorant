import { useState, useEffect } from "react";
import GameService from "../../../data/remote/GameService";
import { Agents } from "../../../data/response/Agents";
import { MapGame } from "../../../data/response/MapGame";
import { ResponseData } from "../../../data/response/ResponseData";
import { Weapons } from "../../../data/response/Weapons";

const HomeState = () => {
    const gameService = new GameService()

    const [maps , setMaps] = useState<ResponseData<Array<MapGame>>>({
        status: 0,
        data: null
    })

    const [agents , setAgents] = useState<ResponseData<Array<Agents>>>({
        status: 0,
        data: null
    })

    const [weapons , setWeapons] = useState<ResponseData<Array<Weapons>>>({
        status: 0,
        data: null
    })

    const fetchMap = async () => {
        const mapData = await gameService.getMaps();
        setMaps(mapData) 
    }



    const fetchAgents = async () => {
        const data = await gameService.getAgents();
        setAgents(data) 
    }

    const fetchWeapons = async () => {
        const data = await gameService.getWeapons();
        setWeapons(data) 
    }

    useEffect(()=> {
        fetchMap()
        fetchAgents()
        fetchWeapons()
    }, [])
   
    return {fetchMap,fetchAgents, fetchWeapons, agents, maps, weapons}
}

export default HomeState

