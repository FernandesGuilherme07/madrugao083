import { AddressDto } from "./Dtos/AddressDto";
import { CoordinatesDto } from "./Dtos/CoordinatesDto";

export interface ICalculateDeliveryService {
    SearchAddressByCep(cep: string): Promise<AddressDto>;
    GetGeoLocationByAddress(address: string): Promise<CoordinatesDto | null>
}