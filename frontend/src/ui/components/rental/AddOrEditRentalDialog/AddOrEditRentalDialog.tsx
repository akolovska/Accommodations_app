import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';

import { RentalCategory } from '../../../../api/types/rentalCategory.ts';
import type { RentalRequest, RentalResponse} from '../../../../api/types/rental.ts';
import useHosts from '../../../../hooks/useHosts.ts';
import useRentals from '../../../../hooks/useRentals.ts';

interface FormData {
    name: string;
    category: RentalCategory | '';
    hostId: string;
    numRooms: string;
}

const emptyFormData: FormData = {
    name: '',
    category: '',
    hostId: '',
    numRooms: ''
};

const rentalToFormData = (rental: RentalResponse): FormData => ({
    name: rental.name,
    category: rental.category,
    hostId: rental.host.id.toString(),
    numRooms: rental.numRooms.toString()
});

interface RentalFormDialogProps {
    open: boolean;
    onClose: () => void;
    rental?: RentalResponse;
}

const AddOrEditRentalDialog = ({
                                   open,
                                   onClose,
                                   rental
                               }: RentalFormDialogProps) => {
    const { onAdd, onEdit } = useRentals();
    const { hosts } = useHosts();

    const isEdit = !!rental;

    const [formData, setFormData] = useState<FormData>(
        rental ? rentalToFormData(rental) : emptyFormData
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
        const selectedHost = hosts.find(
            (host) => host.id === Number(formData.hostId)
        );

        if (!selectedHost || !formData.category) {
            return;
        }

        const payload: RentalRequest = {
            name: formData.name.trim(),
            category: formData.category,
            host: selectedHost,
            numRooms: Number(formData.numRooms)
        };

        if (isEdit && rental) {
            await onEdit(rental.id, payload);
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
                {isEdit ? 'Edit Rental' : 'Add Rental'}
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

                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={formData.category}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value={RentalCategory.HOUSE}>
                            HOUSE
                        </MenuItem>

                        <MenuItem value={RentalCategory.APARTMENT}>
                            APARTMENT
                        </MenuItem>

                        <MenuItem value={RentalCategory.HOTEL}>
                            HOTEL
                        </MenuItem>

                        <MenuItem value={RentalCategory.ROOM}>
                            ROOM
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel>Host</InputLabel>
                    <Select
                        name="hostId"
                        value={formData.hostId}
                        label="Host"
                        onChange={handleChange}
                    >
                        {hosts.map((host) => (
                            <MenuItem
                                key={host.id}
                                value={host.id.toString()}
                            >
                                {host.name} {host.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Number of Rooms"
                    name="numRooms"
                    value={formData.numRooms}
                    onChange={handleChange}
                    type="number"
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

export default AddOrEditRentalDialog;