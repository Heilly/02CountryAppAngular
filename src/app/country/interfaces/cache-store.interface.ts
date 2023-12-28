import { Country } from "./country.interface"
import { Region } from "./region.type"

export interface CacheStore {
    termCountry: TermsContry,
    termCapital: TermsContry,
    regionCountry: RegionCountry
}

export interface TermsContry {
    term: string,
    country: Country[]
}

export interface RegionCountry {
    region: Region,
    countries: Country[]
}