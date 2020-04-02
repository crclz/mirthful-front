import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationMessageOption } from '@ngx-formly/core/lib/services/formly.config';

export class Valeed {

    static minLengthMessage = function (err, field: FormlyFieldConfig): string {
        return `最小长度: ${field.templateOptions.minLength}`;
    }

    static maxLengthMessage = function (err, field: FormlyFieldConfig): string {
        return `最大长度: ${field.templateOptions.maxLength}`;
    }

    static maxMessage = function (err, field: FormlyFieldConfig): string {
        return `最大值：${field.templateOptions.max}`;
    }

    static minMessage = function (err, field: FormlyFieldConfig): string {
        return `最小值：${field.templateOptions.min}`;
    }

}

export let leopardMessageOptions: ValidationMessageOption[] = [
    { name: 'required', message: '必填' },
    { name: 'minlength', message: Valeed.minLengthMessage },
    { name: 'maxlength', message: Valeed.maxLengthMessage },
    { name: 'min', message: Valeed.minLengthMessage },
    { name: 'max', message: Valeed.maxLengthMessage },
]