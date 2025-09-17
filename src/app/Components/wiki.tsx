'use client'
import React, { useEffect, useState } from 'react';

// Define the type for a single Wikipedia page
interface WikiPage {
  pageid: number;
  ns: number;
  title: string;
  index: number;
}

// Define the type for the Wikipedia API response
interface WikiResponse {
  batchcomplete?: string;
  continue?: any;
  query: {
    pages: {
      [key: string]: WikiPage;
    };
  };
}

const WikiComponent = () => {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWikipediaData = async () => {
    const url =
      'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=La%20Trobe%20University';

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data: WikiResponse = await response.json();
      const pagesArray = Object.values(data.query.pages);
      setPages(pagesArray);
    } catch (err: any) {
      setError(err.message);
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchWikipediaData();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Wikipedia Search Results for &quot;La Trobe University&quot;
      </h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.pageid} className="flex items-center">
            <a
              href={`https://en.wikipedia.org/?curid=${page.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WikiComponent;
