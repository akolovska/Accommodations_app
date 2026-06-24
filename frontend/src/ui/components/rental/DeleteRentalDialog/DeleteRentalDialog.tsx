import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type {RentalResponse} from "../../../../api/types/rental.ts";
import useRentals from "../../../../hooks/useRentals.ts";

interface DeleteRentalDialogProps {
    rental: RentalResponse;
    open: boolean,
    onClose: () => void;
}

const DeleteRentalDialog = ({ rental, open, onClose }: DeleteRentalDialogProps) => {
    const { onDelete } = useRentals();

    const handleSubmit = async () => {
        await onDelete(rental.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete rental</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{rental.name}</strong>? This action cannot be undone.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteRentalDialog;