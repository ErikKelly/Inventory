"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface InventoryItem {
  [key: string]: string;  
}

interface SortConfig {
  key: string | null;
  direction: 'ascending' | 'descending';
}

interface InventoryTableProps {
  sheetId: string;
  sheetName: string;
  title: string;
}

export default function InventoryTable({ sheetId, sheetName, title }: InventoryTableProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending'
  });
  
  useEffect(() => {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&tqx=out:json`;
    
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
  }, [sheetId, sheetName]);
  
  // Handle sorting when column header is clicked
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted data using useMemo for performance
  const filteredAndSortedInventory = useMemo(() => {
    // First filter the data
    let filteredItems = inventory;
    if (searchTerm) {
      filteredItems = inventory.filter(item => 
        Object.values(item).some(value => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Then sort the filtered data
    if (sortConfig.key) {
      filteredItems = [...filteredItems].sort((a, b) => {
        // Handle numeric sorting if values are numbers
        const valueA = a[sortConfig.key!];
        const valueB = b[sortConfig.key!];
        
        // Try to convert to numbers for numerical sorting
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortConfig.direction === 'ascending' 
            ? numA - numB 
            : numB - numA;
        }
        
        // Fall back to string comparison
        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredItems;
  }, [inventory, searchTerm, sortConfig]);
  
  if (loading) return <div className="p-4">Loading collection...</div>;
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
    <div className="relative py-5">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
        </div>
        
        {/* Results count */}
        <div className="text-sm text-gray-500 mb-2">
          Showing {filteredAndSortedInventory.length} of {inventory.length} items
        </div>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {headers.map((header) => (
                <th 
                  key={header} 
                  className="py-2 px-4 border-b border-gray-300 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(header)}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === header && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedInventory.length > 0 ? (
              filteredAndSortedInventory.map((item, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="py-4 px-4 text-center text-gray-500">
                  No matching items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}