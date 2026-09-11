import type { InputHTMLAttributes, ReactElement, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cloneElement } from "react";

type Control = ReactElement<
  InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>
>;

export function FormField({
  id,
  label,
  error,
  optional,
  children
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  children: Control;
}) {
  const errId = `${id}-err`;
  const control = cloneElement(children, {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined
  });
  return (
    <div className={`field${["challenge", "inquiry", "outcome"].includes(id) ? " field--full" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional ? <span className="optional"> {optional}</span> : null}
      </label>
      {control}
      <p className="error" id={errId}>{error || ""}</p>
    </div>
  );
}
