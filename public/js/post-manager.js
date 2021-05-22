// Elements
const postTitle = document.querySelector("#title");
const postBody = document.querySelector("#content");

// Functions
const getPostID = () => document.location.toString().split("/").pop();

const editPostHandler = async () => {
  const title = postTitle.value.trim();
  const body = postBody.value.trim();

  if (!title || !body) return alert("Provide post title and body update post");

  const response = await fetch(`/api/posts/${getPostID()}`, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to update post");

  document.location.replace("/dashboard");
};

const deletePostHandler = async () => {
  const response = await fetch(`/api/posts/${getPostID()}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to delete post");

  document.location.replace("/dashboard");
};

// Event listeners
document
  .querySelector("#btn-post-update")
  .addEventListener("click", editPostHandler);
document
  .querySelector("#btn-post-delete")
  .addEventListener("click", deletePostHandler);