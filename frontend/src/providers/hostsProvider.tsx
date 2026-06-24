import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import useSnackbar from '../hooks/useSnackbar.ts';
import type {HostRequest, HostResponse} from "../api/types/host.ts";
import hostApi from "../api/hostApi.ts";
import HostsContext from "../context/hostsContext.ts";

const HostsProvider = ({ children }: { children: React.ReactNode }) => {
    const { showSnackbar } = useSnackbar();

    const [hosts, setHosts] = useState<HostResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await hostApi.findAll();
            setHosts(response.data);
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to load Hosts.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showSnackbar]);

    const onAdd = useCallback(async (data: HostRequest) => {
        try {
            await hostApi.add(data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to add Host.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onEdit = useCallback(async (id: number, data: HostRequest) => {
        try {
            await hostApi.edit(id.toString(), data);
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to edit Host.', 'error');
        }
    }, [fetch, showSnackbar]);

    const onDelete = useCallback(async (id: number) => {
        try {
            await hostApi.delete(id.toString());
            await fetch();
        } catch (err) {
            showSnackbar(err instanceof Error ? err.message : 'Failed to delete Host.', 'error');
        }
    }, [fetch, showSnackbar]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    const value = useMemo(
        () => ({ hosts, loading, onAdd, onEdit, onDelete }),
        [hosts, loading, onAdd, onEdit, onDelete]
    );

    return <HostsContext value={value}>{children}</HostsContext>;
};

export default HostsProvider;