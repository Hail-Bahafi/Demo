"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function DriverTable() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Ensure you are using the correct Ngrok URL and path
        const response = await axios.get(
          "https://da71-38-183-76-12.ngrok-free.app/drivers"
        );

        if (Array.isArray(response.data)) {
          setDrivers(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setDrivers([]); 
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const toggleRow = (id: number) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Driver name</TableHead>
          <TableHead>Last check in</TableHead>
          <TableHead>Last check out</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => {
          const drivingLicenseDetails = driver.documents.find(
            (doc: any) => doc.type === "DRIVING_LICENSE"
          )?.details?.data;

          const moreDetails = {
            Adhaarno:
              driver.documents.find((doc: any) => doc.type === "AADHAR_CARD")
                ?.id || "N/A",
            DrivingLicense: drivingLicenseDetails?.license_no || "N/A",
            DOB: drivingLicenseDetails?.dob || "N/A",
            Address: drivingLicenseDetails?.address || "N/A",
          };

          return (
            <React.Fragment key={driver.id}>
              <Collapsible
                open={openRow === driver.id}
                onOpenChange={() => toggleRow(driver.id)}
                asChild
              >
                <React.Fragment>
                  <TableRow className="cursor-pointer hover:bg-gray-50">
                    <CollapsibleTrigger asChild>
                      <TableCell className="flex items-center gap-2 font-medium">
                        {driver.user.name}
                        {openRow === driver.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </TableCell>
                    </CollapsibleTrigger>
                    <TableCell>{driver.checkInTime || "00:00:00"}</TableCell>
                    <TableCell>{driver.checkOutTime || "00:00:00"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-x-6">
                        <Pencil className="cursor-pointer" />
                        <Trash2 className="cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                  {openRow === driver.id && (
                    <TableRow className="bg-gray-100">
                      <TableCell colSpan={4}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <strong>Adhaar no:</strong> {moreDetails.Adhaarno}
                          </div>
                          <div>
                            <strong>Driving License:</strong>{" "}
                            {moreDetails.DrivingLicense}
                          </div>
                          <div>
                            <strong>DOB:</strong> {moreDetails.DOB}
                          </div>
                          <div>
                            <strong>Address:</strong> {moreDetails.Address}
                          </div>
                          <br />
                          <div className=" w-full flex flex-col gap-y-2 mt-6 ">
                            <p className="text-xs">
                              Once the driver is created, you can also upload
                              driver documents here.
                            </p>
                            <Button variant="outline" className="max-w-xs">
                              Upload the document
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              </Collapsible>
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
