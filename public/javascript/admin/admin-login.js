const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.token) {
    document.cookie = `token=${data.token}; path=/;`;
    window.location.href = "/admin";
  } else {
    alert("Login failed: " + (data.message || "Invalid credentials"));
  }
});
