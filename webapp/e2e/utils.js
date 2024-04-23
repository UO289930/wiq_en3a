async function registerUser(username, email, password, page) {
    await expect(page).toClick("button", { text: "Register" });
    await expect(page).toFill('input[id="Username"]', username);
    await expect(page).toFill('input[id="Email"]', email);
    await expect(page).toFill('input[id="password"]', password);
    await expect(page).toFill('input[id="confirmPassword"]', password);
    await expect(page).toClick('button', { text: 'Create account' });
    await expect(page).toMatchElement('label', { text: "has been registered" });
}
  
module.exports = { registerUser }
