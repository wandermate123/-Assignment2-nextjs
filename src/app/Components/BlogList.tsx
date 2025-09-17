'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Link from 'next/link';
import Image from 'next/image';

// Define the Blog type
type Blog = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
};

const BlogList = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const blogsJSON = localStorage.getItem('myData');
    if (blogsJSON) {
      try {
        const blogs: Blog[] = JSON.parse(blogsJSON);
        setData(blogs);
      } catch (error) {
        console.error('Failed to parse blog data from localStorage:', error);
      }
    }
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredData = searchQuery.trim()
    ? data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: '5rem' }}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="row">
          {filteredData.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mb-3">
                <Image
                  src={item.imageUrl}
                  className="card-img-top"
                  alt="Blog"
                  width={400}
                  height={200}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {expandedId === item.id
                      ? item.description
                      : `${item.description.substring(0, 50)}...`}
                  </p>
                  <div className="d-flex justify-content-between align-items-center row">
                    <div>
                      <p className="m-0 small col">
                        Posted by {item.author}
                      </p>
                      <small className="text-muted">{item.date}</small>
                    </div>
                  </div>
                  <Link href={`/blog/${item.id}`}>
                    <button className="btn btn-primary" onClick={() => toggleExpanded(item.id)}>
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
