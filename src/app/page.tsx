"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { stories, Story } from '../app/data/stories';
import { useSearchParams } from 'next/navigation';

const Stories = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const [filteredStories, setFilteredStories] = useState<Story[]>([]);

  useEffect(() => {
    let filtered = stories;

    // Filter by category
    if (category) {
      filtered = filtered.filter(story => story.category.toLowerCase() === category.toLowerCase());
    }

    // Search by title
    if (search) {
      filtered = filtered.filter(story => story.title.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by date or title
    if (sort === 'date') {
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredStories(filtered);
  }, [category, search, sort]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stories</h1>

      <div className="mb-4">
        <label className="block mb-2">
          Search:
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => {
              const value = e.target.value;
              const params = new URLSearchParams(window.location.search);
              params.set('search', value);
              window.history.pushState({}, '', `${window.location.pathname}?${params}`);
            }}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Search by title..."
          />
        </label>

        <label className="block mb-2">
          Category:
          <select
            defaultValue={category}
            onChange={(e) => {
              const value = e.target.value;
              const params = new URLSearchParams(window.location.search);
              if (value) {
                params.set('category', value);
              } else {
                params.delete('category');
              }
              window.history.pushState({}, '', `${window.location.pathname}?${params}`);
            }}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">All</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
          </select>
        </label>

        <label className="block mb-2">
          Sort By:
          <select
            defaultValue={sort}
            onChange={(e) => {
              const value = e.target.value;
              const params = new URLSearchParams(window.location.search);
              if (value) {
                params.set('sort', value);
              } else {
                params.delete('sort');
              }
              window.history.pushState({}, '', `${window.location.pathname}?${params}`);
            }}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">None</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <ul className="space-y-4">
        {filteredStories.map(story => (
          <li key={story.id} className="p-4 border border-gray-300 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-600">{story.author} - {story.category} - {story.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Stories />
  </Suspense>
);

export default Page;