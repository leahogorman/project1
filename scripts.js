// Search Function
var searchBtn = document.getElementById("searchBtn");
var bookBox = document.getElementById("bookResults")
var jobBox = document.getElementById("jobResults")
var searchBox = document.getElementById("searchBox")
var header = document.getElementById("header")
var results = document.getElementById("results")


searchBtn.addEventListener('click', function(){
   console.log("hi there")
   searchBox.style.display = "none"
   results.style.display = "grid"
});

// Jobs Results Function
var userInput = "";

var apiID = "f79398ab";
var apiKey = "6f3c4d62b7cf24c28993c2b466b44ea6";

queryURL = "https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id="+ (apiID) + "&app_key="+ (apiKey) + "&results_per_page=5&what=carpenter&content-type=application/json"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (result){
      console.log(result);
 
      for(i=0; i<result.results.length; i++){
    //   document.querySelector("#jobtitle").innerHTML += result.results[i].title
    //   console.log(result.results[i].title)
    //   document.querySelector("#joblink").innerHTML += result.results[i].redirect_url
      //Job title
     let jobTitle = result.results[i].title;
     //Job posting
     let jobLink = result.results[i].redirect_url;
     $("#job-options").append(
      `<div class="card m-2" style="max-width:220px; min-width:220px;">
            <div class="card-body">
             <h5 class="card-title text-wrap">${jobTitle}</h5>
            <a href="${jobLink}" class="card-text text-wrap">Link to Posting</a>   
            </div>
        </div>`
     )
    }
    })


// Book Results Function
 function displayBooks( subject ) {
   let bookURL = `https://openlibrary.org/subjects/${subject}.json?published_in=2000-2020&limit=20`;
   $.ajax({
     url: bookURL,
     method: "GET"
   }).then(function(response) {
     let rDbg = response;
     console.log(rDbg);
 
     let newBookDiv;
     for (let idx=0; idx < response.works.length; idx++) {
       // Book title
       let title = response.works[idx].title;
       // Book authors
       let authors = response.works[idx].authors[0].name;
       // Add additional authors if any
       for (let jdx=1; jdx < response.works[idx].authors.length; jdx++) {
           authors += ` & ${response.works[idx].authors[jdx].name}`;
       }
       // Book image
       let olid = response.works[idx].cover_edition_key;
       if (olid == null) {
         console.log(`[displayBooks] No book image for ${title}. Skipping ...`);
       } else {
         let bookUrl = `https://openlibrary.org/books/${olid}`;
         let imgUrl = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
         // Add to html. 
         $('#book-rr').append(`<div id="bookResults" class="bookResults"></div> 
         <h5 class="bookTitle text-wrap">${title}</h5>
         <p class="authorName text-wrap">${authors}</p>
         <img src="${imgUrl}" class="img-thumbnail" alt="Book Image">
         </div>
         </div>`); 
       } 
     }
   });
 }
 
 displayBooks('javascript');
 