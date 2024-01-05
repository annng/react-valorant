import { useState } from "react"
import WeaponService from "../../../../data/remote/WeaponService"
import { ResponseData } from "../../../../data/response/ResponseData"
import { Weapons } from "../../../../data/response/Weapons"

const WeaponDetailState = () => {
    const weaponService = new WeaponService()

    const [weapon, setWeapon] = useState<ResponseData<Weapons>>({
        status: 0,
        data: null
    })

    const fetchWeaponDetail = async (uuid: string) => {
        const data = await weaponService.getWeaponDetails(uuid);
        setWeapon(data)
    }

    return {fetchWeaponDetail, weapon}

}

export default WeaponDetailState