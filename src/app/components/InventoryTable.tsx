"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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

  useEffect(() => {
    // Simple mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

          // Extract headers from columns with fallbacks (TypeScript-friendly version)
          const headers: string[] = data.table.cols.map((col: any, index: number) => {
            return (col.label && col.label.trim() !== '') ? col.label : (col.id || `Column_${index + 1}`);
          });

          // Process rows into properly structured objects
          const items: InventoryItem[] = data.table.rows.map((row: any) => {
            const item: InventoryItem = {};
            headers.forEach((header: string, index: number) => {
              const cellValue = row.c[index]?.v;
              // Convert null/undefined to empty string, otherwise convert to string
              item[header] = (cellValue === null || cellValue === undefined) ? '' : String(cellValue);
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
  // Update the isImageUrl function
  const isImageUrl = (str: string): boolean => {
    if (!str || typeof str !== 'string') {
      return false;
    }

    // Check for standard image extensions
    const hasImageExtension = !!str.match(/\.(jpeg|jpg|gif|png|webp)$/i);

    // Check for local images path (public/images or just /images)
    const isLocalImage = str.startsWith('./public/images/') ||
      str.startsWith('/public/images/') ||
      str.startsWith('/images/');

    // Other image services (excluding Google Drive)
    const isImageService =
      str.includes('imgur.com') ||
      str.includes('cloudinary.com') ||
      (str.startsWith('http') && str.includes('image'));

    return hasImageExtension || isLocalImage || isImageService;
  };

  // Update the getDirectImageUrl function
  const getDirectImageUrl = (url: string): string => {
    if (!url) return '';

    // Handle local images in public folder
    if (url.startsWith('./public/')) {
      // Remove the './public' part as Next.js serves from public directly
      return url.replace('./public', '');
    }

    // For other URLs, return as is
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
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${index === activeTabIndex
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
  <div className="w-24 h-24 flex items-center justify-center relative">
    <img 
      src={getDirectImageUrl(item[header])}
      alt={`Product image`}
      className="max-w-full max-h-full object-contain cursor-pointer" 
      width="96"  
      height="96"
      onClick={() => setPreviewImage(getDirectImageUrl(item[header]))}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        console.log("Image load error for URL:", item[header]);
        const target = e.currentTarget;
        const parent = target.parentNode as HTMLElement;
        if (parent) {
          parent.innerHTML = "<span class='text-sm text-gray-500'>Image unavailable</span>";
        }
      }}
    />
  </div>
) : (
  // Convert null to empty string
  item[header] === null ? '' : item[header]
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
      {/* Image Preview Modal */}
{/* Image Preview Modal */}
{previewImage && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
    onClick={() => setPreviewImage(null)}
  >
    <div 
      className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <button 
          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-200"
          onClick={() => setPreviewImage(null)}
          aria-label="Close preview"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <img 
          src={previewImage} 
          alt="Preview" 
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>
    </div>
  </div>
)}
    </div>
  );
}