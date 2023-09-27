import { Entity, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { ITableCreateProps, ITableProps } from ".";

export class Table extends Entity<ITableProps> {
  get id(): string {
    return this._id.toString();
  }

  public setCapacity(value: number): Result<void> {
    this.props.capacity = value;
    return Result.ok<void>();
  }

  public setIsAvailable(value: boolean): Result<void> {
    this.props.isAvailable = value;
    return Result.ok<void>();
  }

  private constructor(props: ITableProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: ITableProps, id: EntityID): Result<Table> {
    return Result.ok<Table>(new Table(props, id));
  }

  public static create(props: ITableCreateProps): Result<Table> {
    return Result.ok<Table>(
      new Table({
        ...props,
        isAvailable: true,
      }),
    );
  }
}
