export abstract class Mapper<Aggregate, ToDomainProps, ToPersistentResponse> {
  abstract toDomain(raw: ToDomainProps): Aggregate;
  abstract toPersistence(aggregate: Aggregate): ToPersistentResponse;
}
