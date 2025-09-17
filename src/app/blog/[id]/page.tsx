'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../Components/Navbar';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Blog type
type Blog = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
};

const BlogDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;

    const storedData = localStorage.getItem('myData');
    if (storedData) {
      try {
        const blogs: Blog[] = JSON.parse(storedData);
        const selectedBlog = blogs.find(blog => blog.id === parseInt(id));
        if (selectedBlog) {
          setBlogDetail(selectedBlog);
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, [id]);

  if (!blogDetail) {
    return (
      <div>
        <Navbar />
        <div className="container bg-light" style={{ marginTop: '5rem' }}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: '5rem' }}>
        <div className="card mt-5">
        <Image
          src={blogDetail.imageUrl}
          style={{ maxWidth: '100%', maxHeight: '300px' }}
          className="card-img-top"
          alt="Blog"
          width={800}
          height={300}
        />
          <div className="card-body">
            <h1 className="card-title">{blogDetail.title}</h1>
            <p className="card-text">{blogDetail.description}</p>
            <p className="card-text">Author: {blogDetail.author}</p>
            <p className="card-text">Date: {blogDetail.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
