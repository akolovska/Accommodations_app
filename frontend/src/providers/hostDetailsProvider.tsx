import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type {HostRequest, HostResponse} from "../api/types/host.ts";
import hostApi from "../api/hostApi.ts";
import HostDetailsContext from "../context/hostDetailsContext.ts";
import {useParams} from "react-router";

const HostDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useSnackbar();

    const [host, setHost] = useState<HostResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchHost = useCallback(async () => {
        if (!id)
            return;
        setLoading(true);

        try {
            const response = await hostApi.findById(id.toString());
            setHost(response.data);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to load Host.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    }, [id, showSnackbar]);

    const onEdit = useCallback(
        async (id:number, data: HostRequest) => {
            try {
                await hostApi.edit(id.toString(), data);
                await fetchHost();
            } catch (err) {
                showSnackbar(
                    err instanceof Error ? err.message : 'Failed to edit Host.',
                    'error'
                );
            }
        },
        [fetchHost, showSnackbar]
    );

    const onDelete = useCallback(async (id: number) => {
        try {
            await hostApi.delete(id.toString());
            setHost(null);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : 'Failed to delete Host.',
                'error'
            );
        }
    }, [showSnackbar]);

    useEffect(() => {
        void fetchHost();
    }, [fetchHost]);

    const value = useMemo(
        () => ({
            host: host!,
            loading,
            onEdit,
            onDelete
        }),
        [host, loading, onEdit, onDelete]
    );

    return (
        <HostDetailsContext value={value}>
            {children}
        </HostDetailsContext>
    );
};

export default HostDetailsProvider;