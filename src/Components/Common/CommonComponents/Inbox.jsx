import React from 'react';
import Button from './Button';
import Table from './Table';

const Inbox = ({title = 'Inbox', fields = [], tableData = [], hasActions = false, actions = [], handleCancel, actionButtonLabel = 'Send Email', actionButtonFunction}) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 w-1/2 h-3/4 max-w-4xl max-h-screen overflow-y-auto rounded-lg flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl text-center">{title}</h1>
                    <Table
                        fields={fields}
                        tableData={tableData}
                        hasActions={hasActions}
                        actions={actions}
                    />
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <Button
                        label="Back"
                        handleFunction={handleCancel}
                    />
                    <Button
                        label={actionButtonLabel}
                        handleFunction={actionButtonFunction}
                    />
                </div>
            </div>
        </div>
    );
};

export default Inbox;