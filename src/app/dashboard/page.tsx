import React from 'react'
import DriverManagment from "@/components/DriversData";
import DriverStatus from "@/components/DriverStatus";
import DrviverTable from "@/components/DrviverTable";
import UploadFile from '@/components/UploadFile';
import AddDriver from '@/components/AddDriver';

export default function page() {
  return (
    <main className=" min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-around p-24 ">
    <div className="flex justify-center gap-x-4">
      <DriverManagment />
      <DriverStatus />
      <div className='flex justify-around items-center gap-x-10'>
      <UploadFile/>
      <AddDriver/>
      </div>
    </div>
    <DrviverTable />
  </main>
  )
}
