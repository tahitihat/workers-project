# Isabel Tripp submission: Cloudflare Workers Internship Application (Full-Stack)

## Description

The deployed project can be found at https://workers-project.trippip.workers.dev/ .

This project was completed as a submission to the [2020 Full Stack Internship application project](https://github.com/cloudflare-internship-2020/internship-application-fullstack) at Cloudflare. The linked repo contains detailed information about project requirements. 

The script randomly sends a visiting user to one of two webpages. Additionally, the URL and copy on each of these webpages is customized (Extra Credit #1). 

## Tools 

To build this project, I used the Cloudflare Workers API, which allows developers to deploy serverless code on Cloudflare by utilizing javascript Service Workers (run on Cloudflare's edge instead of in the browser). I managed and developed the script using the command-line tool [Wrangler](https://github.com/cloudflare/wrangler) and Postman, and finally deployed it to the workers.dev deployment playground on Cloudflare. 

For extra credit, I used Cloudflare's [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/) API. 

At a high level, my script requests a list of URLs from the `app/variants` API built for this project. It then chooses one of the returned URLs, and makes a fetch request. The URL choice will be evenly distributed between the two options, as it is selected by a random number picker choosing between 0 and 1. Finally, the HTML response from that URL is parsed (to customize the copy) using HTMLRewritter. The copy associated with `title`, `h1#title`, `p#description`, and `a#url` have all been altered. 
