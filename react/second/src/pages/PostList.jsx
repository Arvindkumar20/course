import React, { useCallback, useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_REACT_APP_API_URL);
      const postData = await res.json();
      console.log(postData);
      setPosts(postData);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (isError) {
    return <p>Error to load posts</p>;
  }

  if (isLoading) {
    return <p>Loading....</p>;
  }
  
  if (posts.length <= 0) {
    return <p>Posts not found</p>;
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-2  gap-5">
        {/* {posts?.map((post) => (
        <PostCard post={post} />
      ))} */}
      {posts?.map((post) => {
        return (
          <div
            key={post.id}
            className="p-5"
            style={{
              background: post.id % 2 == 0 ? "green" : "gray",
              color: post.id % 2 == 0 ? "black" : "white",
            }}
          >
            
            <p>Post Id : {post.id}</p>
            <p>Author Id : {post.userId}</p>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}
