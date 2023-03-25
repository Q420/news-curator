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
