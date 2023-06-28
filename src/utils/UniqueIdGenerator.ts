export class UniqueIdGenerator {
    private static counter: number = 0;
  
    public static generateUniqueId(): number {
      const timestamp = Date.now();
      const uniqueId = timestamp + UniqueIdGenerator.counter;
      UniqueIdGenerator.counter++;
      return uniqueId;
    }
}
  