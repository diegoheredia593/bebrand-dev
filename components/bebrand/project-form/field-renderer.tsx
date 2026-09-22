'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { LeadAnswerValue } from '@/lib/leads';
import type { ProjectFormField } from '@/lib/project-form-steps';

type FieldRendererProps = {
  field: ProjectFormField;
  value: LeadAnswerValue | undefined;
  onChange: (id: string, value: LeadAnswerValue) => void;
  error?: string;
};

export function FieldRenderer({ field, value, onChange, error }: FieldRendererProps) {
  return (
    <fieldset className="form-field" aria-invalid={error ? true : undefined}>
      <legend>
        {field.label}
        {field.required && (
          <span className="required-mark" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      {field.helperText && <p className="field-helper">{field.helperText}</p>}
      {renderControl(field, value, onChange)}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function renderControl(
  field: ProjectFormField,
  value: LeadAnswerValue | undefined,
  onChange: (id: string, value: LeadAnswerValue) => void
) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <Input
          type={field.type}
          value={(value as string) ?? ''}
          onChange={(event) => onChange(field.id, event.target.value)}
          placeholder={field.placeholder}
          autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'off'}
        />
      );
    case 'textarea':
      return (
        <Textarea
          value={(value as string) ?? ''}
          onChange={(event) => onChange(field.id, event.target.value)}
          placeholder={field.placeholder}
          rows={4}
        />
      );
    case 'radio':
      return (
        <RadioGroup value={(value as string) ?? ''} onValueChange={(next) => onChange(field.id, next)}>
          {field.options?.map((option) => (
            <Label key={option.value} className="option-row">
              <RadioGroupItem value={option.value} />
              <span>{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
      );
    case 'checkbox': {
      const selected = Array.isArray(value) ? value : [];
      function toggle(optionValue: string) {
        const next = selected.includes(optionValue)
          ? selected.filter((item) => item !== optionValue)
          : [...selected, optionValue];
        onChange(field.id, next);
      }
      return (
        <div className="option-group">
          {field.options?.map((option) => (
            <Label key={option.value} className="option-row">
              <Checkbox checked={selected.includes(option.value)} onCheckedChange={() => toggle(option.value)} />
              <span>{option.label}</span>
            </Label>
          ))}
        </div>
      );
    }
    case 'select':
      return (
        <Select value={(value as string) ?? ''} onValueChange={(next) => onChange(field.id, next)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return null;
  }
}
