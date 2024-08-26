import { InputHTMLAttributes } from 'react';

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-foreground shadow-sm ring-0 focus:ring-0 active:ring-0 active:border-none' +
                className
            }
        />
    );
}
