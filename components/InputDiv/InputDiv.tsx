import React from "react";

interface InputDivData {
  label: string;
  inputType: string;
  inputValue?: string | number;
  required: boolean;
  inputId: string;
  inputName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function InputDiv({
  inputId,
  inputType,
  inputName,
  label,
  required,
  inputValue,
  onChange,
  disabled,
}: InputDivData) {
  return (
    <div className="inputDiv">
      <label className="inputLabel">
        <span>{label}</span>
        {required && <span>*</span>}
      </label>
      <input
        type={inputType}
        className="input"
        value={inputValue}
        required={required}
        id={inputId}
        name={inputName}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
    </div>
  );
}
