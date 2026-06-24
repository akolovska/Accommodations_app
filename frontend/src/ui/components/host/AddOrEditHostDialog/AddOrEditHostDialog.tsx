import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
    TextField
} from '@mui/material';
import {useEffect, useState} from 'react';
import * as React from 'react';
import useHosts from '../../../../hooks/useHosts.ts';
import useCountries from "../../../../hooks/useCountries.ts";
import type {HostRequest, HostResponse} from "../../../../api/types/host.ts";

interface FormData {
    name: string;
    surname: string;
    country: string
}

const emptyFormData: FormData = {
    name: '',
    surname: '',
    country: ''
};

const HostToFormData = (Host: HostResponse): FormData => ({
    name: Host.name,
    surname: Host.surname,
    country: Host.country.name
});

interface HostFormDialogProps {
    open: boolean;
    onClose: () => void;
    host?: HostResponse;
}

const AddOrEditHostDialog = ({ open, onClose, host }: HostFormDialogProps) => {
    const { countries } = useCountries();
    const { onAdd, onEdit } = useHosts();

    const isEdit = host !== undefined;

    const [formData, setFormData] = useState<FormData>(
        host ? HostToFormData(host) : emptyFormData
    );

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setFormData(
            host ? HostToFormData(host) : emptyFormData
        );
    }, [host]);

    const handleSubmit = async () => {
        const selectedCountry = countries.find(
            (c) => c.name === formData.country
        );

        if (!selectedCountry || !formData.country) {
            return;
        }
        const payload: HostRequest = {
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            country: selectedCountry
        };

        if (isEdit) {
            await onEdit(host.id, payload);
        } else {
            await onAdd(payload);
            setFormData(emptyFormData);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>{isEdit ? 'Edit Host' : 'Add Host'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label='Surname'
                    name='surname'
                    value={formData.surname}
                    onChange={handleChange}
                    multiline={true}
                    rows={3}
                    fullWidth
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        label='Country'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        variant='outlined'>
                        {countries.map((c) => (
                            <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='primary'>
                    {isEdit ? 'Edit' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrEditHostDialog;