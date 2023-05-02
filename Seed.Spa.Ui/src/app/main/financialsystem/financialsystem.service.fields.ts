import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ServiceBase } from '../../common/services/service.base';

@Injectable()
export class FinancialSystemServiceFields extends ServiceBase {


	constructor() {
		super()
	}

	getKey() {
		return "FinancialSystem";
	}

	getFormControls(moreFormControls? : any) {
		var formControls = Object.assign({
      name : new FormControl(),
      financialSystemId : new FormControl(),
      month : new FormControl(),
      year : new FormControl(),
      closingDay : new FormControl(),
      monthCopy : new FormControl(),
      yearCopy : new FormControl(),
      generateExpenseCopy : new FormControl(),
		},moreFormControls || {});
		return formControls;
	}

	getFormFields(moreFormControls?: any) {
		return new FormGroup(this.getFormControls(moreFormControls));
	}

	getInfosFields(moreInfosFields? : any, useMoreInfosFields = false) {
		var defaultInfosFields = {
      name: { label: 'name', type: 'string', isKey: false, list:false  ,  },
      financialSystemId: { label: 'financialSystemId', type: 'int', isKey: true, list:false  ,  },
      month: { label: 'month', type: 'int', isKey: false, list:true  ,  },
      year: { label: 'year', type: 'int', isKey: false, list:true  ,  },
      closingDay: { label: 'closingDay', type: 'int', isKey: false, list:true  ,  },
      monthCopy: { label: 'monthCopy', type: 'int', isKey: false, list:true  ,  },
      yearCopy: { label: 'yearCopy', type: 'int', isKey: false, list:true  ,  },
      generateExpenseCopy: { label: 'generateExpenseCopy', type: 'bool', isKey: false, list:true  ,  },
		};
		return this.mergeInfoFields(defaultInfosFields, moreInfosFields, useMoreInfosFields);
	}

}
