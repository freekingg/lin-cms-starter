import { LinValidator, Rule } from 'lin-mizar';
import { PaginateValidator } from './common';
class OrderSearchValidator extends PaginateValidator {
  constructor () {
    super();
    this.q = new Rule('isOptional');
  }
}

class OrderSearchValidator2  extends LinValidator {
  constructor () {
    super();
  }
}

class CreateOrUpdateOrderValidator extends LinValidator {
  constructor () {
    super();
    this.user_phone = new Rule('isNotEmpty', '必须传入用户手机');
    // this.name = new Rule('isNotEmpty', '必须传入名称');
    // this.name = new Rule('isNotEmpty', '必须传入名称');
  }
}

export { CreateOrUpdateOrderValidator, OrderSearchValidator ,OrderSearchValidator2};
