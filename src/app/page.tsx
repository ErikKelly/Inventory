"use client";  // This is important for using React hooks

import React, { useState, useEffect } from 'react';

interface InventoryItem {
  [key: string]: string;
}

export default function Home() {

  const [backgroundColor, setBackgroundColor] = useState('rgb(253, 248, 241)');

  return (
    <div style={{ backgroundColor }} className="min-h-screen">

    <div className="relative py-5 pt-20">

        <div className="flex justify-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/VjLkP-xUwA8?si=qgjHizNSjDZS-Gbf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

    </div>
    </div>
  );
}