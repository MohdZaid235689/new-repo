import React from 'react'
import AppLayout from './AppLayout'
import { Toaster } from 'react-hot-toast';

const Mainapp = () => {
    return (
        <div>
            <AppLayout>
                <Toaster
                    position="top-right"
                    gutter={8}
                />
                <div className="flex flex-col items-center w-full pt-10">
                    <img src="./image/welcome.svg" className="w-5/12" alt="" />
                    <h1 className="text-lg text-gray-600">Select or create new project</h1>
                </div>
            </AppLayout>
        </div>
    )
}

export default Mainapp
