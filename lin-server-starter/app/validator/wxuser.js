import { LinValidator, Rule } from 'lin-mizar';
import { PaginateValidator } from './common';
class AppSearchValidator extends PaginateValidator {
  constructor () {
    super();
    this.q = new Rule('isOptional');
  }
}

class CreateOrUpdateAppValidator extends LinValidator {
  constructor () {
    super();
    this.username = new Rule('isNotEmpty', '必须传入名称');
  }
}

export { CreateOrUpdateAppValidator, AppSearchValidator };
