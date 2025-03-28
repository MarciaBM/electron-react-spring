import React, { useContext, useEffect, useState } from 'react';
import { Item } from './types/Item';
import {InteropContext, LogContext} from "./keys.ts";

const MyComponent: React.FC = () => {
    const $interop = useContext(InteropContext);
    const $log = useContext(LogContext);

    const [items, setItems] = useState<Item[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState<string | string[] | undefined>();

    // Fetch items from API
    useEffect(() => {
        fetch('/api/items')
            .then(response => response.json())
            .then((data: Item[]) => {
                setItems(data);
                setIsFetching(false);
                $log?.info('Received items from server.');
            })
            .catch(err => {
                setError(err.message);
                setIsFetching(false);
                $log?.error('Failed to fetch items from server.');
            });
    }, [$log]);

    // Increase badge count
    const increase = () => {
        setCount(prev => {
            const newCount = prev + 1;
            $interop?.setBadgeCount(newCount);
            return newCount;
        });
    };

    // Decrease badge count
    const decrease = () => {
        setCount(prev => {
            if (prev > 0) {
                const newCount = prev - 1;
                $interop?.setBadgeCount(newCount);
                return newCount;
            }
            return prev;
        });
    };

    // Open file dialog
    const open = async () => {
        const result = await $interop?.showOpenDialog();
        setSelectedFile(result);
    };

    // Save file dialog
    const save = async () => {
        const result = await $interop?.showSaveDialog();
        setSelectedFile(result);
    };

    return (
        <div>
            <h1>Items from Server</h1>
            {isFetching ? <p>Fetching items...</p> :
                error ? <p>Failed to receive items. {error}</p> :
                    <ul>{items?.map(item => <li key={item.id}>{item.name}</li>)}</ul>
            }

            <h1>Set badge count (Mac Only)</h1>
            <p>Click buttons below to set app badge count (calling Electron via preload script)</p>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease} disabled={count <= 0}>Decrease</button>

            <h1>File dialog</h1>
            <button onClick={open}>Show Open Dialog</button>
            <button onClick={save}>Show Save Dialog</button>
            <p>
                <strong>Selected File(s)</strong>: {selectedFile?.toString() || 'None'}
            </p>
        </div>
    );
};

export default MyComponent;
