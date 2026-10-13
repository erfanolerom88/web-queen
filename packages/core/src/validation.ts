export type ValidationFormat = 'email';

export type ValidationRule = {
  required?: boolean;
  format?: ValidationFormat;
  requiredMessage?: string;
  formatMessage?: string;
};

export type ValidationErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;

const formatValidators: Record<ValidationFormat, (value: string) => boolean> = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
};

export function validateValues<T extends Record<string, unknown>>(
  values: T,
  rules: Partial<Record<keyof T, ValidationRule>>
): ValidationErrors<T> {
  const errors: ValidationErrors<T> = {};

  for (const field of Object.keys(rules) as (keyof T)[]) {
    const rule = rules[field];
    if (!rule) continue;

    const value = values[field];
    const textValue = value == null ? '' : String(value).trim();

    if (rule.required && !textValue) {
      errors[field] = rule.requiredMessage ?? 'This field is required.';
      continue;
    }

    const formatValidator = rule.format ? formatValidators[rule.format] : undefined;

    if (formatValidator && textValue && !formatValidator(textValue)) {
      errors[field] = rule.formatMessage ?? `Enter a valid ${rule.format}.`;
    }
  }

  return errors;
}