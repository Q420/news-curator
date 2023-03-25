$(document).ready(function() {
	const apiKey = '6cbfde89fe0144408537178970ec411a';
	const defaultUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
	let apiUrl = defaultUrl;
	
	$('#search-form').submit(function(e) {
		e.preventDefault();
		const query = $('#search-input').val();
		if (query) {
			apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
		} else {
			apiUrl = defaultUrl;
		}
		fetchNews(apiUrl);
	});

	function fetchNews(url) {
		$('#news-container').empty();
		$.ajax({
			url: url,
			method: "GET",
			success: function(data) {
				if (data.totalResults === 0) {
					$('#news-container').html('<p class="not-found">No results found.</p>');
				} else {
					const articles = data.articles;
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						const newsCard = `
							<div class="news-card">
								<h2>${article.title}</h2>
								<p>${article.description}</p>
								<a href="${article.url}" target="_blank">Read more</a>
							</div>
						`;
						$('#news-container').append(newsCard);
					}
				}
			},
			error: function() {
				$('#news-container').html('<p class="not-found">An error occurred while fetching the news.</p>');
			}
		});
	}

	fetchNews(apiUrl);
});
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const searchTerm = document.querySelector('.search-input').value;
  const apiKey = "6cbfde89fe0144408537178970ec411a";
  const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const newsContainer = document.querySelector('.news-container');
      let newsHTML = '';

      if (data.articles.length > 0) {
        data.articles.forEach(article => {
          const articleHTML = `
            <div class="news-article">
              <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p>${article.description}</p>
              </a>
            </div>
          `;
          newsHTML += articleHTML;
        });
      } else {
        newsHTML = '<p class="not-found">No news articles found</p>';
      }

      newsContainer.innerHTML = newsHTML;
    })
    .catch(error => console.log(error));
});
