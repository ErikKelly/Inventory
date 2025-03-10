"use client";

import InventoryTable from '../components/InventoryTable';

export default function PersonalCollectionGraded() {
  const SHEET_ID = "1gUdbhzWjdRmcet7CX592wJ25GN_CW-k1J08wERqzAGY";
  const SHEET_NAME = "PC-Graded";

  return (
    <InventoryTable
      sheetId={SHEET_ID}
      sheetName={SHEET_NAME}
      title="Personal Collection - Graded"
    />
  );
}