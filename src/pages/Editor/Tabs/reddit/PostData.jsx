import React from "react";
import InputText from "../../../../components/InputText";
import { IconTrash } from "@tabler/icons-react";
import TextArea from "../../../../components/TextArea";

const PostData = ({ redditPost, setRedditPost }) => {
  // Unified handler for updating title, content, and comments
  const handleInput = (field, value) => {
    // Update the redditPost state with the new value for the specified field
    setRedditPost((prev) => ({
      ...prev, // Retain previous state
      [field]: value, // Update the specific field in the post object
    }));
  };

  // Handler for updating a specific comment based on its id
  const handleCommentChange = (id, value) => {
    setRedditPost((prev) => {
      // Create a new comments array with the updated comment
      const updatedComments = prev.comments.map((comment) =>
        comment.id === id ? { ...comment, comment: value } : comment // Update the comment if the id matches
      );
      return { ...prev, comments: updatedComments }; // Return the updated post object
    });
  };

  // Handler for deleting a comment based on its id
  const handleCommentDelete = (id) => {
    setRedditPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== id), // Filter out the deleted comment
    }));
  };

  return (
    <div>
      <p className='font-extrabold text-white text-lg mb-3'>Post</p>

      {/* Input for post title */}
      <InputText
        value={redditPost.title} // Set the current value from the redditPost state
        name='post-title' // Unique name for the input field
        placeholder='Post Title' // Placeholder text for the input field
        size='w-full h-9' // Width and height styles
        onChange={(e) => handleInput("title", e.target.value)} // Call handler to update title
      />
      <div className='py-2' /> {/* Spacer */}

      {/* Input for post content */}
      <TextArea
        value={redditPost.content} // Set the current value from the redditPost state
        height='min-h-24' // Set the height of the textarea
        onChange={(e) => handleInput("content", e.target.value)} // Call handler to update content
      />

      {/* Comments section header */}
      <div className='mt-4'>
        <span className='flex flex-wrap items-center gap-3 my-4'>
          <p className='font-extrabold text-white text-lg'>Comments</p>
          <p className='text-dimGray-4'>Edit or delete comments for your video</p>
        </span>
        {/* Mapping through comments to render each one */}
        {redditPost.comments.map((comment) => (
          <div key={comment.id} className='flex flex-col items-start md:flex-row md:items-end gap-6 mb-4'>
            <span>{comment.id}.</span> {/* Display comment ID */}
            <div className='w-full flex flex-col gap-1'>
              {/* Display username */}
              <p className='font-bold text-md'>{comment.username}</p>
              {/* TextArea for editing the comment */}
              <TextArea
                name={`comment-${comment.id}`} // Unique name for the comment input
                id={`comment-${comment.id}`} // Unique id for the comment input
                value={comment.comment} // Set the current value from the comment object
                height='min-h-10' // Set the height of the textarea
                onChange={(e) => handleCommentChange(comment.id, e.target.value)} // Call handler to update comment
              />
            </div>
            {/* Delete Comment Icon */}
            <IconTrash
              size={20} // Icon size
              className='cursor-pointer' // Cursor change on hover
              onClick={() => handleCommentDelete(comment.id)} // Call handler to delete comment
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostData;