"use client";
import React from "react";
import useSWR from "swr";
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";

// Define the type for a violence update post.
interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface ViolenceUpdate {
  _id: string;
  user?: string; // Reference to the user who created the post
  desc: string;
  imageUrl?: string;
  location?: Location;
  date?: string;
  createdAt: string;
}

// A simple fetcher function for SWR.
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Feed() {
  const { data, error } = useSWR<ViolenceUpdate[]>("/api/violence-updates", fetcher, {
    refreshInterval: 5000,
  });

  if (error) return <div>Error loading posts.</div>;
  if (!data) return <div><PostSkeleton/></div>;

  return (
    <div className="flex flex-col gap-4">
      {data.map((update) => (
        <Post key={update._id} update={update} />
      ))}
    </div>
  );
}

export default Feed;
