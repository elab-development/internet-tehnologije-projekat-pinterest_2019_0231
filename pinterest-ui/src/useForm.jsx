//custom use form hook

import { useState } from 'react';

const useForm = (initialData) => {
    const [formData, setFormData] = useState(initialData);


    const handleChange = (event) => {
        setFormData(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        handleChange,
        formData,
    }
}

export default useForm;