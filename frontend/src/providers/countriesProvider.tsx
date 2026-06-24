import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type {CountryRequest, CountryResponse} from "../api/types/country.ts";
import countryApi from "../api/countryApi.ts";
import CountriesContext from "../context/countriesContext.ts";

const CountriesProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [countries, setCountries] = useState<CountryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await countryApi.findAll();
            setCountries(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load Countries.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onAdd = useCallback(async (data: CountryRequest) => {
        try {
            await countryApi.add(data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to add Country.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onEdit = useCallback(async (id: number, data: CountryRequest) => {
        try {
            await countryApi.edit(id.toString(), data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit Country.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await countryApi.delete(id.toString());
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete Country.', 'error');
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        const load = async () => {
            await fetch();
        };

        void load();
    }, [fetch]);

    const value = useMemo(
        () => ({ countries, loading, onAdd, onEdit, onDelete }),
        [countries, loading, onAdd, onEdit, onDelete]
    );

    return <CountriesContext value={value}>{children}</CountriesContext>;
};

export default CountriesProvider;