import React from "react";
import { DollarSign, Zap, Moon, Filter } from "lucide-react";

export function Services() {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
          <p className="text-xs font-semibold tracking-widest text-black uppercase">
            Nalco Care
          </p>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Welcome to Nalco Care,
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          your comprehensive solution for managing hospital appointments with
          ease. At Nalco Care, we understand the importance of timely and
          efficient healthcare services, and our appointment system is designed
          to streamline the entire process for both patients and healthcare
          providers.
        </p>
      </div>
      <div className="grid grid-cols-1 mt-12 text-center gap-y-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
            <DollarSign className="text-gray-700 h-9 w-9" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Automated Reminders{" "}
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            We understand the importance of keeping track of your appointments.
            Nalco Care sends automated reminders to ensure you never miss an
            appointment, helping you prioritize your health.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
            <Zap className="text-gray-700 h-9 w-9" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Secure Electronic Health Records
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Your health records are important. Nalco Care employs top-notch
            security measures to store and manage electronic health records,
            providing a secure and accessible way for healthcare providers to
            track your medical history.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
            <Moon className="text-gray-700 h-9 w-9" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Comprehensive Facility Information
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Get detailed information about the hospitals and clinics in our
            network, including services offered, medical staff, and facilities
            available. Make informed decisions about your healthcare providers.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-100 rounded-full">
            <Filter className="text-gray-700 h-9 w-9" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Easy Appointment Scheduling
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Nalco Care provides a user-friendly interface that allows patients
            to book appointments seamlessly. Whether it's a routine checkup or a
            specialist consultation, scheduling is just a few clicks away.
          </p>
        </div>
      </div>
    </div>
  );
}
