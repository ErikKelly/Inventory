"use client";  // This is important for using React hooks

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <div className="relative">
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Inventory Items</h1>
      <div className="mt-4">
        To inquire about any cards on this list, please contact mail@somemail.com
      </div>
        </div>

      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 border-b border-gray-300 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {inventory.map((item, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      {headers.map((header) => (
        <td key={header} className="py-2 px-4 border-b border-gray-300">
          {isImageUrl(item[header]) ? (
            // If the value looks like an image URL, render as an image
<Image 
              src={item[header]} 
              alt={`Product image`}
              className="w-24 h-24 object-contain" 
              width={96} 
              height={96} 
            />
          ) : (
            // Otherwise render as text
            item[header]
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}