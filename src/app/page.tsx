"use client";

import InventoryTable from './/components/InventoryTable';
import { SHEET_ID, SHEET_TABS } from '@/config/siteConfig';

export default function PersonalCollection() {

  // Validate required props
  if (!SHEET_ID) {
    return <div className="p-4 text-red-500">Error: Sheet ID is not configured</div>;
  }
  
  if (!SHEET_TABS) {
    return <div className="p-4 text-red-500">Error: Sheet tab names are not configured</div>;
  }

  return (
    <InventoryTable
      sheetId={SHEET_ID}
      tabNames={SHEET_TABS}
    />
  );
}