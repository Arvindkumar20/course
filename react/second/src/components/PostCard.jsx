import React from 'react'

export default function PostCard({post}) {
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
  )
}
