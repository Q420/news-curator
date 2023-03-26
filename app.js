$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    const searchTerm = $("#searchInput").val();
    const apiKey = "6cbfde89fe0144408537178970ec411a";
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;

    $.get(url)
      .done(function (data) {
        let output = "<h2>Search results:</h2>";
        if (data.totalResults > 0) {
          data.articles.forEach(function (article) {
            output += `
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description}</p>
                  <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
              </div>
            `;
          });
        } else {
          output += "<p>No news articles found</p>";
        }

        $("#results").html(output);
      })
      .fail(function () {
        alert("An error occurred while fetching news");
      });
  });
});

