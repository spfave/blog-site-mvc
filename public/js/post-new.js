// Elements
const postTitle = document.querySelector("#title");
const postBody = document.querySelector("#content");

// Functions
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = postTitle.value.trim();
  const body = postBody.value.trim();

  if (!title || !body) return alert("Provide post title and body to post");

  const response = await fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return alert("Failed to publish post");

  document.location.replace("/dashboard");
};

// Event listeners
document.querySelector("#form-post").addEventListener("submit", newPostHandler);
