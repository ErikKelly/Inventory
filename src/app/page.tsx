"use client";  // This is important for using React hooks

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface InventoryItem {
  [key: string]: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your actual spreadsheet ID
    const SHEET_ID = '1gUdbhzWjdRmcet7CX592wJ25GN_CW-k1J08wERqzAGY';
    const SHEET_NAME = 'CardInventory';

    // Public spreadsheet URL
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
    console.log(sheetUrl)
    fetch(sheetUrl)
      .then(response => response.text())
      .then(jsonText => {
        // Remove the extra wrapping that Google adds
        const jsonData = jsonText.substring(jsonText.indexOf('(') + 1, jsonText.lastIndexOf(')'));
        const data = JSON.parse(jsonData);

        // Extract headers from columns
        const headers = data.table.cols.map((col: any) => col.label);

        // Process rows into properly structured objects
        const items: InventoryItem[] = data.table.rows.map((row: any) => {
          const item: InventoryItem = {};
          headers.forEach((header: string, index: number) => {
            item[header] = row.c[index]?.v?.toString() || '';
          });
          return item;
        });

        setInventory(items);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading inventory...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // Get the headers once from the first item
  const headers = inventory.length > 0 ? Object.keys(inventory[0]) : [];

  const isImageUrl = (str: string): boolean => {
    // Make sure str is defined and is a string
    if (!str || typeof str !== 'string') {
      return false;
    }

    // Check if ends with an image extension or contains image in the URL
    const hasImageExtension = !!str.match(/\.(jpeg|jpg|gif|png|webp)$/i);
    const looksLikeImageUrl = str.startsWith('http') && str.includes('image');

    return hasImageExtension || looksLikeImageUrl;
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">HOME</h1>
    </div>
  );
}