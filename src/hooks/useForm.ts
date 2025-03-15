import { useState, ChangeEvent } from "react"

export interface FormValues {
    [key: string]: string;
}

export function useForm(inputValues={}) {
    const [values, setValues] = useState<FormValues>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    }

    return {values, handleChange, setValues}
}
