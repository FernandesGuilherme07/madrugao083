import { calculateDeliveryService } from "src/services/CalculateDeliveryService";
import { DeliveryStore } from "src/stores/DeliveryStore";

export const deliveryStore = new DeliveryStore(calculateDeliveryService, "58065156", 2)