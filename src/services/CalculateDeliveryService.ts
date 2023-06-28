require('dotenv').config();

import axios from 'axios';
import { AddressDto } from 'src/constracts/Services/ICalculateDeliveryService/Dtos/AddressDto';
import { CoordinatesDto } from 'src/constracts/Services/ICalculateDeliveryService/Dtos/CoordinatesDto';
import { ICalculateDeliveryService } from 'src/constracts/Services/ICalculateDeliveryService/ICalculateDeliveryService';

class CalculateDeliveryService implements ICalculateDeliveryService {
  private readonly viacepUrl: string = "https://viacep.com.br/ws/";
  private readonly hereGeocodingUrl: string = "https://geocode.search.hereapi.com/v1/geocode";

  async SearchAddressByCep(cep: string): Promise<AddressDto> {
    const response = await axios.get(`${this.viacepUrl + cep.toString()}/json/`);
    const addressData: AddressDto = response.data;

    return addressData;
  }

  async GetGeoLocationByAddress(address: string): Promise<CoordinatesDto | null> {
    const encodedAddress = encodeURIComponent(address);
    const url = `${this.hereGeocodingUrl}?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&q=${encodedAddress}`;
    const response = await axios.get(url);

    const geoData = response.data.items[0];
    if (geoData) {
      const position = geoData.position;
      return {
        latitude: position.lat,
        longitude: position.lng,
      };
    } else {
      return null;
    }
  }
}

export const calculateDeliveryService = new CalculateDeliveryService();
