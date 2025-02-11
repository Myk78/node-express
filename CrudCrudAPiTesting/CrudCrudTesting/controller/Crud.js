const axios = require("axios");
const baseURL = "https://crudcrud.com/api/f13a4b099dfe41d38487cd84e1136cc3";

// Create a resource
module.exports.createUser = async function createUser() {
  const user = { name: "John Doe", job: "Developer" };
  try {
    const response = await axios.post(`${baseURL}/users`, user);
    console.log("Created:", response.data);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Read resources
module.exports.findUser = async function getUsers() {
  try {
    const response = await axios.get(`${baseURL}/users`);
    console.log("Users:", response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Update a resource
async function updateUser(userId) {
  const updatedUser = { name: "Jane Doe", job: "Senior Developer" };
  try {
    const response = await axios.put(`${baseURL}/users/${userId}`, updatedUser);
    console.log("Updated:", response.data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// Delete a resource
async function deleteUser(userId) {
  try {
    await axios.delete(`${baseURL}/users/${userId}`);
    console.log("User deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

async function getRandomJoke() {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    console.log("Random Joke:", response.data.value);
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

getRandomJoke();

async function sendWebhook() {
  const webhookURL =
    "https://webhook.site/3120c2ec-a331-412b-81a4-7f2111879047";
  const payload = { message: "Hello Webhook" };

  try {
    const response = await axios.post(webhookURL, payload);
    console.log("Webhook Sent:", response.status);
  } catch (error) {
    console.error("Error sending webhook:", error);
  }
}

sendWebhook();

async function createPet() {
  const pet = { id: 1, name: "Buddy", status: "available" };
  try {
    const response = await axios.post(
      "https://petstore.swagger.io/v2/pet",
      pet
    );
    console.log("Pet Created:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

createPet();

async function fetchGitHubUsers() {
  try {
    const response = await axios.get("https://api.github.com/users");
    console.log("GitHub Users:", response.data[1]);
  } catch (error) {
    console.error("Error:", error);
  }
}

// fetchGitHubUsers();

async function getUser(username) {
  try {
    // Replace 'username' with the desired GitHub username
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    // Display the user's data
    console.log(`Username: ${response.data.login}`);
    console.log(`Name: ${response.data.name}`);
    console.log(`Bio: ${response.data.bio}`);
    console.log(`Public Repos: ${response.data.public_repos}`);
    console.log(`Followers: ${response.data.followers}`);
    console.log(`Following: ${response.data.following}`);
  } catch (error) {
    // Handle errors (e.g., user not found)
    if (error.response && error.response.status === 404) {
      console.error("User not found!");
    } else {
      console.error("Error fetching user data:", error.message);
    }
  }
}

// Call the function with a specific username
getUser("Myk78");
// Test the functions
// createUser();
// getUsers();
