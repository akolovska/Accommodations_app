import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type { RentalProjection, RentalRequest } from "../api/types/rental.ts";
import rentalApi from "../api/rentalApi.ts";
import RentalDetailsContext from "../context/rentalDetailsContext.ts";
import {useParams} from "react-router";

const RentalDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useSnackbar();

    const [rental, setRental] = useState<RentalProjection | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRental = useCallback(async () => {
        if (!id)
            return;
        setLoading(true);

        try {
            const response = await rentalApi.findById(id.toString());
            setRental(response.data);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to load rental.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    }, [id, showSnackbar]);

    const onEdit = useCallback(
        async (id:number, data: RentalRequest) => {
            try {
                await rentalApi.edit(id.toString(), data);
                await fetchRental();
            } catch (err) {
                showSnackbar(
                    err instanceof Error ? err.message : 'Failed to edit rental.',
                    'error'
                );
            }
        },
        [fetchRental, showSnackbar]
    );

    const onDelete = useCallback(async (id: number) => {
        try {
            await rentalApi.delete(id.toString());
            setRental(null);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to delete rental.',
                'error'
            );
        }
    }, [showSnackbar]);

    useEffect(() => {
        const load = async () => {
            await fetchRental();
        };

        void load();
    }, [fetchRental]);

    const value = useMemo(
        () => ({
            rental: rental!,
            loading,
            onEdit,
            onDelete
        }),
        [rental, loading, onEdit, onDelete]
    );

    return (
        <RentalDetailsContext.Provider value={value}>
            {children}
        </RentalDetailsContext.Provider>
    );
};

export default RentalDetailsProvider;