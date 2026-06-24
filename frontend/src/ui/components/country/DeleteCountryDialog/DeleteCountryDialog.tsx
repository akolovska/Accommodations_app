import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useCountries from "../../../../hooks/useCountries.ts";
import type {CountryResponse} from "../../../../api/types/country.ts";

interface DeleteCountryDialogProps {
    country: CountryResponse;
    open: boolean,
    onClose: () => void;
}

const DeleteCountryDialog = ({ country, open, onClose }: DeleteCountryDialogProps) => {
    const { onDelete } = useCountries();

    const handleSubmit = async () => {
        await onDelete(country.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Country</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{country.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCountryDialog;