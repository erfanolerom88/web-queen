/** Public prop contract for the `Select` component. */

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectVariant = 'default' | 'outline' | 'ghost';

export type SelectStatus = 'idle' | 'error' | 'success';

export type SelectOption = {
  value: string;
  /** Visible text for the option and the closed trigger. */
  label: string;
  /** Renders the option as unselectable. */
  disabled?: boolean;
};

export interface SelectProps {
  /** Bound option value. @default '' */
  value?: string;
  /** Rendered in a `<label>` above the field and linked via `for`/`id`. */
  label?: string;
  /** Options rendered in the popup. @default [] */
  options?: SelectOption[];
  /** Shown as the first option while no value is selected. @default 'Select an option' */
  placeholder?: string;
  /** Disables the control and lowers opacity. @default false */
  disabled?: boolean;
  /** Marks the field as required on the native control. @default false */
  required?: boolean;
  /** Control height and typography scale. @default 'md' */
  size?: SelectSize;
  /** Visual treatment of the control. @default 'default' */
  variant?: SelectVariant;
  /** Validation state driving border, ring and message styling. @default 'idle' */
  status?: SelectStatus;
  /** Helper text below the field, exposed via `aria-describedby`. @default '' */
  hint?: string;
  /** Shown when the field is in an error state; linked via `aria-describedby`. @default '' */
  errorMessage?: string;
  /** Stretches the field to fill its container. @default false */
  fullWidth?: boolean;
  /** Native `name` attribute, for form submission. @default '' */
  name?: string;
  /**
   * Back-compat alias for an error message. Non-empty values put the field in the
   * error state alongside `status === 'error'`; `errorMessage` takes precedence.
   * @default ''
   */
  error?: string;
  /** Back-compat alias for `hint`. @default '' */
  helperText?: string;
}
