import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    type SelectChangeEvent,
    TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';

import useCountries from "../../../../hooks/useCountries.ts";
import type {CountryRequest, CountryResponse} from "../../../../api/types/country.ts";

interface FormData {
    name: string;
    continent: string;
}

const emptyFormData: FormData = {
    name: '',
    continent: ''
};

const CountryToFormData = (Country: CountryResponse): FormData => ({
    name: Country.name,
    continent: Country.continent
});

interface CountryFormDialogProps {
    open: boolean;
    onClose: () => void;
    country?: CountryResponse;
}

const AddOrEditCountryDialog = ({
                                   open,
                                   onClose,
                                    country
                               }: CountryFormDialogProps) => {
    const { onAdd, onEdit } = useCountries();

    const isEdit = !!country;

    const [formData, setFormData] = useState<FormData>(
        country ? CountryToFormData(country) : emptyFormData
    );

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const payload: CountryRequest = {
            name: formData.name.trim(),
            continent: formData.continent.trim()
        };

        if (isEdit && country) {
            await onEdit(country.id, payload);
        } else {
            await onAdd(payload);
        }

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {isEdit ? 'Edit Country' : 'Add Country'}
            </DialogTitle>

            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {isEdit ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrEditCountryDialog;