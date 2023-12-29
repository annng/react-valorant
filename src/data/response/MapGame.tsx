import { ImageSourcePropType } from "react-native";

export type MapGame = {
    uuid:                 string;
    displayName:          string;
    narrativeDescription: string;
    tacticalDescription:  string;
    coordinates:          string;
    displayIcon:          string;
    listViewIcon:         string;
    splash:               string;
    assetPath:            string;
    mapUrl:               string;
    callouts:            Callout[] | []
}

export interface Callout {
    regionName:      string;
    superRegionName: string;
    location:        Location;
}

export interface Location {
    x: number;
    y: number;
}
