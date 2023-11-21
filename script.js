class GitHub {
    async getUserDetails(username) {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
  
      this.createUserCard(data);
    }
  
    createUserCard(user) {
      const cardHTML = `
        <div class="card">
          <div>
            <img src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div>
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
              <li>${user.followers} Followers</li>
              <li>${user.following} Following</li>
              <li>${user.public_repos} Repos</li>
            </ul>
            <div>${user.location || ''}</div>
            <div>${user.twitter_username || ''}</div>
          </div>
        </div>
      `;
  
      const main = document.getElementById('main');
      main.innerHTML = cardHTML;
    }
  }
  
  const form = document.getElementById('user-form');
  const search = document.getElementById('search');
  
  const gitHub = new GitHub();
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    gitHub.getUserDetails(search.value);
  });
  
  // Initialize with your own GitHub profile
  gitHub.getUserDetails('your-username');