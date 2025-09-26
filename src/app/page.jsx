"use client"

import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="space-x-4">
      <Link
        href="/upcomming"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upcoming card page
      </Link>
      <Link
        href="/ongoing"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ongoing card page
      </Link>
    </div>
  );
};

export default Page;
