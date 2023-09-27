import { ValueObject } from "@/core/domain";
import { Result } from "@/core/monads";

interface IBirthdateVO {
  value: Date;
}

export class BirthdateVO extends ValueObject<IBirthdateVO> {
  get value() {
    return this.props.value.toISOString().split("T")[0];
  }

  private constructor(props: IBirthdateVO) {
    super(props);
  }

  public static create(value: Date): Result<BirthdateVO> {
    return Result.ok<BirthdateVO>(
      new BirthdateVO({
        value: new Date(value),
      })
    );
  }
}
