import { useEffect, useState } from "react";
import GameService from "../../../../data/remote/GameService";
import { MapGame } from "../../../../data/response/MapGame";
import { ResponseData } from "../../../../data/response/ResponseData";
import { Weapons } from "../../../../data/response/Weapons";

const WeaponListState = () => {
    const gameService = new GameService()

    const [weapons, setWeapons] = useState<ResponseData<Array<Weapons>>>({
        status: 0,
        data: []
    })

    const [visibleWeapon, setVisibleWeapon] = useState<Array<Weapons>>([])

    const fetchWeapons = async () => {
        const data = await gameService.getWeapons();
        setWeapons(data)
        setVisibleWeapon(data.data ?? [])
    }

    const searchWeapons = (keyword: string | null) => {
        if (keyword === "" || keyword === null) {
            setVisibleWeapon(weapons.data ?? [])
        } else {
            var filterAgents = weapons.data?.filter(e => e.displayName.toLowerCase().includes(keyword.toLowerCase()))
            setVisibleWeapon(filterAgents ?? [])
        }
    }

    useEffect(() => {
        fetchWeapons()
    }, [])

    return { fetchMaps: fetchWeapons, weapons: weapons, searchMaps: searchWeapons, visibleWeapons: visibleWeapon }
}

export default WeaponListState