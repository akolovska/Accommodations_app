import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type {RentalRequest, RentalResponse} from "../api/types/rental.ts";
import rentalApi from "../api/rentalApi.ts";
import RentalsContext from "../context/rentalsContext.ts";

const RentalsProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [rentals, setRentals] = useState<RentalResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await rentalApi.findAll();
            setRentals(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load rentals.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onAdd = useCallback(async (data: RentalRequest) => {
        try {
            await rentalApi.add(data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to add rental.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onEdit = useCallback(async (id: number, data: RentalRequest) => {
        try {
            await rentalApi.edit(id.toString(), data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit rental.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await rentalApi.delete(id.toString());
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete rental.', 'error');
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    const value = useMemo(
        () => ({ rentals, loading, onAdd, onEdit, onDelete }),
        [rentals, loading, onAdd, onEdit, onDelete]
    );

    return <RentalsContext value={value}>{children}</RentalsContext>;
};

export default RentalsProvider;