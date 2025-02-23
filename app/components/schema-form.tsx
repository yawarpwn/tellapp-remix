import type { SchemaFormProps, FormSchema } from 'remix-forms'
import { SchemaForm as BaseForm } from 'remix-forms'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function SchemaForm<Schema extends FormSchema>(props: SchemaFormProps<Schema>) {
  return (
    <BaseForm<Schema>
      // className={/* your form classes */}
      // fieldComponent={/* your custom Field */}
      // labelComponent={/* your custom Label */}
      // inputComponent={/* your custom Input */}
      // multilineComponent={/* your custom Multiline */}
      // selectComponent={/* your custom Select */}
      // checkboxComponent={/* your custom Checkbox */}
      // checkboxWrapperComponent={/* your custom checkbox wrapper */}
      // buttonComponent={/* your custom Button */}
      // fieldErrorsComponent={/* your custom FieldErrors */}
      // globalErrorsComponent={/* your custom GlobalErrors */}
      // errorComponent={/* your custom Error */}
      errorComponent={({ children }) => <div className="text-sm text-destructive">{children}</div>}
      {...props}
    />
  )
}

export { SchemaForm }
