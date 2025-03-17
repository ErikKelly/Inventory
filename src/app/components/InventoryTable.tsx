"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { PRIMARY_COLOR } from '@/config/siteConfig';

interface InventoryItem {
  [key: string]: string;  
}

interface SortConfig {
  key: string | null;
  direction: 'ascending' | 'descending';
}

interface InventoryTableProps {
  sheetId: string;
  tabNames: string | string[];
}

export default function InventoryTable({ sheetId, tabNames }: InventoryTableProps) {
  const [sheets, setSheets] = useState<{ name: string; items: InventoryItem[] }[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending'
  });
  
  // Parse tabNames if it's provided as a comma-separated string
  const parsedTabNames = useMemo(() => {
    if (!tabNames) return [];
    if (typeof tabNames === 'string') {
      return tabNames.split(',').map(name => name.trim());
    }
    return tabNames;
  }, [tabNames]);
  
  // Check for required props
  useEffect(() => {
    if (!sheetId) {
      setError("Missing required prop: sheetId");
      setLoading(false);
      return;
    }
    
    if (!tabNames || (Array.isArray(parsedTabNames) && parsedTabNames.length === 0)) {
      setError("Missing required prop: tabNames");
      setLoading(false);
      return;
    }
    
    // Continue with data loading if we have all required props
    loadSheets();
  }, [sheetId, parsedTabNames]);
  
  const loadSheets = async () => {
    try {
      const loadedSheets = [];
      
      for (const sheetName of parsedTabNames) {
        try {
          const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=out:json`;
          const response = await fetch(sheetUrl);
          const jsonText = await response.text();
          
          // Check if we got a valid response
          if (!jsonText.includes('table')) {
            console.warn(`Sheet "${sheetName}" not found or empty`);
            continue;
          }
          
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
          
          loadedSheets.push({ name: sheetName, items });
        } catch (e) {
          console.error(`Error loading sheet ${sheetName}:`, e);
        }
      }
      
      if (loadedSheets.length === 0) {
        setError("No sheets could be loaded. Check your sheet ID and tab names.");
      } else {
        setSheets(loadedSheets);
      }
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  // Get the current active sheet
  const activeSheet = sheets[activeTabIndex] || { name: '', items: [] };
  
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
    let filteredItems = activeSheet.items;
    if (searchTerm) {
      filteredItems = activeSheet.items.filter(item => 
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
  }, [activeSheet.items, searchTerm, sortConfig]);
  
  if (loading) return <div className="p-4">Loading collections...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (sheets.length === 0) return <div className="p-4">No data found</div>;

  // Get the headers from the active sheet's first item
  const headers = activeSheet.items.length > 0 ? Object.keys(activeSheet.items[0]) : [];

// Check if a string is an image URL
const isImageUrl = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  
  // Standard image extensions
  const hasImageExtension = !!str.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  
  // Google Drive detection
  const isGoogleDriveUrl = str.includes('drive.google.com');
  
  // Other image services
  const isImageService = 
    str.includes('imgur.com') || 
    str.includes('cloudinary.com') ||
    (str.startsWith('http') && str.includes('image'));
  
  return hasImageExtension || isGoogleDriveUrl || isImageService;
};

const getDirectImageUrl = (url: string): string => {
  // Handle Google Drive file URLs
  if (url.includes('drive.google.com/file/d/')) {
    try {
      // Extract the file ID from the URL
      const fileId = url.match(/\/file\/d\/([^\/]+)/)?.[1];
      if (fileId) {
        // Return the direct access URL
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    } catch (e) {
      console.error("Error parsing Google Drive URL:", e);
    }
  }
  
  return url;
};
  
  return (
    <div className="relative pt-2 pb-8">
      {/* Tab Navigation - only show if we have multiple sheets */}
      {sheets.length > 1 && (
        <div className="border-b border-gray-200 mb-4 mx-4">
          <ul className="flex flex-wrap -mb-px">
            {sheets.map((sheet, index) => (
              <li key={sheet.name} className="mr-2">
                <button 
                  onClick={() => {
                    setActiveTabIndex(index);
                    setSearchTerm('');
                    setSortConfig({ key: null, direction: 'ascending' });
                  }}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    index === activeTabIndex 
                      ? 'border-nav-bg text-nav-bg' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {sheet.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4">
       { /*
       <h1 className="text-2xl font-bold mb-4">{activeSheet.name}</h1>
        */ }
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search ${activeSheet.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
        </div>
        
        {/* Results count */}
        <div className="text-sm text-gray-500 mb-2">
          Showing {filteredAndSortedInventory.length} of {activeSheet.items.length} items
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
  <div className="w-24 h-24 flex items-center justify-center">
    <Image 
      src={getDirectImageUrl(item[header])}
      alt={`Product image`}
      className="max-w-full max-h-full object-contain" 
      width={96}  
      height={96}
      onError={(e) => {
        const parent = e.currentTarget.parentNode;
        // Type check to ensure parent is an HTMLElement
        if (parent && parent instanceof HTMLElement) {
          parent.innerHTML = "<span class='text-sm text-gray-500'>Image unavailable</span>";
        }
      }}
    />
  </div>
) : (
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