import React from "react";

const Input = ({
    id,
    name,
    placeholder,
    value,
    type = "text",
    onChange,
    disabled = false,
    ...props
}) => {
    return (
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            disabled={disabled}
            className="w-full rounded-md border-none bg-[#222] px-4 py-2 text-xl outline-none placeholder:opacity-50 focus:opacity-75"
            {...props}
        />
    );
};

export default Input;
