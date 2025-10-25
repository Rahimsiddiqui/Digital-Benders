const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok && data.token) {
    window.location.href = "/admin";
  } else {
    Swal.fire({
      title: "Error!",
      text: "Invalid Credentials",
      timer: 2500,
      icon: "error",
    });
  }
});
