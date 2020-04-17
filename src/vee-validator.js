import { extend } from 'vee-validate';
import { required, email, confirmed, min } from 'vee-validate/dist/rules';

// Override the default message.
extend('required', {
    ...required,
    message: 'يجب ادخال {_field_}'
});
// Override the default message.
extend('email', {
    ...email,
    message: 'تأكد من صيغه البريد الالكتروني'
});

extend('confirmed', {
    ...confirmed,
    message: '{_field_} غير متطابقه'
})

extend('min', {
    ...min,
    params: ['length'],
    message: 'يجب الا تقل {_field_} عن {length}'
})