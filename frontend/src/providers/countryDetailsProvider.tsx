import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type {CountryRequest, CountryResponse} from "../api/types/country.ts";
import countryApi from "../api/countryApi.ts";
import CountryDetailsContext from "../context/countryDetailsContext.ts";
import {useParams} from "react-router";

const CountryDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useSnackbar();

    const [country, setCountry] = useState<CountryResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCountry = useCallback(async () => {
        if (!id) return;
        setLoading(true);

        try {
            const response = await countryApi.findById(id);
            setCountry(response.data);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to load Country.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    }, [id, showSnackbar]);

    const onEdit = useCallback(
        async (id:number, data: CountryRequest) => {
            try {
                await countryApi.edit(id.toString(), data);
                await fetchCountry();
            } catch (err) {
                showSnackbar(
                    err instanceof Error ? err.message : 'Failed to edit Country.',
                    'error'
                );
            }
        },
        [fetchCountry, showSnackbar]
    );

    const onDelete = useCallback(async (id: number) => {
        try {
            await countryApi.delete(id.toString());
            setCountry(null);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to delete Country.',
                'error'
            );
        }
    }, [showSnackbar]);

    useEffect(() => {
        const load = async () => {
            await fetchCountry();
        };

        void load();
    }, [fetchCountry]);

    const value = useMemo(
        () => ({
            country: country!,
            loading,
            onEdit,
            onDelete
        }),
        [country, loading, onEdit, onDelete]
    );

    return (
        <CountryDetailsContext.Provider value={value}>
            {children}
        </CountryDetailsContext.Provider>
    );
};

export default CountryDetailsProvider;