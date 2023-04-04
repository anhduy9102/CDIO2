const accountIcon = document.getElementById('account-icon');
const accountForm = document.getElementById('account-form');

accountIcon.addEventListener('click', function() {
  accountForm.style.display = (accountForm.style.display === 'block') ? 'none' : 'block';
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", function() {
  // Chuyển hướng đến trang đăng nhập khi người dùng nhấp vào nút đăng xuất
  window.location.href = "login.html";
});
