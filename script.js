class GitHub {
    constructor() {
      this.main = document.getElementById('main');
    }
    
    showCard() {
        this.main.style.display = 'block';
    }

    async getUserDetails(username) {
        this.main.style.display = 'none'; 
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(response.status === 404 ? 'User not found' : 'Error fetching data');
            }
            const data = await response.json();
            this.createUserCard(data);
            this.showCard();
        } catch (error) {
            this.showError(error.message);
        }
    }
  
    createUserCard(user) {
      const cardHTML = `
        <div class="card">
          <div>
            <img src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div>
            <h2>${user.name}</h2>
            <p>${user.bio ? user.bio : 'No bio available'}</p>
            <ul>
              <li>${user.followers} Followers</li>
              <li>${user.following} Following</li>
              <li>${user.public_repos} Repos</li>
            </ul>
            <div>${user.location ? `Location: ${user.location}` : ''}</div>
            <div>${user.twitter_username ? `Twitter: @${user.twitter_username}` : ''}</div>
          </div>
        </div>
      `;
      this.main.innerHTML = cardHTML;
    }
  
    showError(message) {
      const errorHTML = `<p>${message}</p>`;
      this.main.innerHTML = errorHTML;
    }
  }
  
  const form = document.getElementById('user-form');
  const search = document.getElementById('search');
  const gitHub = new GitHub();
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    gitHub.getUserDetails(search.value.trim());
  });
  
  // Don't display the card initially
  gitHub.main.style.display = 'none';