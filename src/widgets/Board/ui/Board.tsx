import React from 'react';
import { List } from '@features/List';
import { AddInput } from '@shared/ui';

export default function Board() {
    return (
        <section className="w-full flex overflow-x-scroll pb-4">
            <List />
            <div className="min-w-80 ml-8">
                <AddInput
                    onChange={() => {}}
                    placeholder="Add List"
                    onSubmit={() => {
                        console.log('Submit!');
                    }}
                />
            </div>
        </section>
    );
}
