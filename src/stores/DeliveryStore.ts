import { CoordinatesDto } from "src/constracts/Services/ICalculateDeliveryService/Dtos/CoordinatesDto";
import { ICalculateDeliveryService } from "src/constracts/Services/ICalculateDeliveryService/ICalculateDeliveryService";

export type Frete = {
  street: string;
  neighborhood: string;
  localidade: string;
  PriceDelivery: number;
};

export class DeliveryStore {
  constructor(
    private readonly calculateDeliveryService: ICalculateDeliveryService,
    private readonly cepOrigin: string,
    private readonly valueByKm: number
  ) {}

  async CalculateFreightAndHandleLocale(cepDestiny: string): Promise<Frete | null> {
    const addressOrigin = await this.calculateDeliveryService.SearchAddressByCep(this.cepOrigin);
    const addressDestiny = await this.calculateDeliveryService.SearchAddressByCep(cepDestiny);

    const addressStringOrigin = `${addressOrigin.logradouro} ${addressOrigin.bairro} ${addressOrigin.localidade} ${addressOrigin.uf} ${addressOrigin.cep} brasil`;
    const addressStringDestiny = `${addressDestiny.logradouro} ${addressDestiny.bairro} ${addressDestiny.localidade} ${addressDestiny.uf} ${addressDestiny.cep} brasil`;

    const coordinatesOrigin = await this.calculateDeliveryService.GetGeoLocationByAddress(addressStringOrigin);
    const coordinatesDestiny = await this.calculateDeliveryService.GetGeoLocationByAddress(addressStringDestiny);

    if (coordinatesOrigin && coordinatesDestiny) {
      const distancia = this.CalculateDistance(coordinatesOrigin, coordinatesDestiny);
      const PriceDelivery = distancia * this.valueByKm;

      return {
        street: addressDestiny.logradouro,
        neighborhood: addressDestiny.bairro,
        localidade: addressDestiny.localidade,
        PriceDelivery,
      };
    } else {
      return null;
    }
  }

  private CalculateDistance(coordinatesOrigin: CoordinatesDto, coordinatesDestiny: CoordinatesDto): number {
    const latOrigem = coordinatesOrigin.latitude;
    const lonOrigem = coordinatesOrigin.longitude;
    const latDestino = coordinatesDestiny.latitude;
    const lonDestino = coordinatesDestiny.longitude;

    const earthRadius = 6371; // Raio médio da Terra em quilômetros

    // Conversão das coordenadas para radianos
    const latOrigemRad = this.ToRadians(latOrigem);
    const lonOrigemRad = this.ToRadians(lonOrigem);
    const latDestinoRad = this.ToRadians(latDestino);
    const lonDestinoRad = this.ToRadians(lonDestino);

    // Diferença das latitudes e longitudes
    const latDiff = latDestinoRad - latOrigemRad;
    const lonDiff = lonDestinoRad - lonOrigemRad;

    // Fórmula de Haversine
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(latOrigemRad) * Math.cos(latDestinoRad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  private ToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
