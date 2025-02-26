"use client";  // This is important for using React hooks

import React, { useState, useEffect } from 'react';

interface InventoryItem {
  [key: string]: string;
}

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome to My App</h1>
      <p className="mt-4">This is the homepage.</p>
    </div>
  );
}