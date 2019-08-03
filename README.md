## Artisan Wants Generator

Tired of using Google Docs as a way to manage the list of artisans you are looking for? Wishing there was a more mobile-friendly way to display said list? Use my site to generate a nicely-formatted, mobile-friendly list of artisans with the colors of your choice!

## How does it work?

GitHub is a cloud-based source control management provider that is used widely by software developers. GitHub has a nice feature built-in to allow users to host static websites from a specific subdomain of their website, provided that you name things in a specific way. Every account is allowed a repository in the format '{your username}.github.io', which, when HTML and CSS files are sent to this repository, are automatically deployed and hosted at a URL with the same format.

Through the GitHub API and some other tools which I will not go into too much detail about, we're able to dynamically build a static website and push to this special repository, so that the world can gaze in awe at the list of overpriced resin you'd like to get your hands on.

## How do I use it?

### Step 1: Go to the website

Currently, the site is located here:

[`https://artisan-wants-client.herokuapp.com`](https://artisan-wants-client.herokuapp.com)

### Step 2: Log in to GitHub

If you do not have an account, you can create one using the buttom that first shows up on the home page. Otherwise, you can click the 'log in' button, where you will be redirected to GitHub to authorize this application to access your account data. Once you accept, you will be redirected back to the site and can start configuring your list.

**`Note: This application requires 'public repository' permissions via your GitHub account in order to create the repository and make commits to it. There is not a more granular permission that I can request, so I recommend creating a new GitHub account for use with this application if you are at all concerned with giving an application access to all of your public repositories.`**

### Step 3: Configure your list

**Creating your layout**

The layout of your page is made up of a few different components: `Sections`, `Subsections`, 
and `Items`.

A `section` is a top-level representation. This would generally be the maker of the caps you are looking for, ie. Keyforge, Nightcaps, Brocaps, etc. Each section has a title and any number of subsections underneath it.

A `subsection` is the next tier underneath sections. This should be the sculpt that you are looking for, ie. Shishi, Fugthulu, Last Pilot, etc. Each one has a title and any number of items underneath it.

An `item` is the representation of a cap that you are looking for. It has an image as well as the name of the cap.

**Selecting your colors**

Color selection is straightforward, and the application of each color you select will show up in a preview pane at the bottom of the page. Currently, the section title color, section title background color, subsection title color, subsection title background color, item text color, and overall background color are supported as customization options, although this could change in the future if people would like more customization options.

**Exporting**

The final step is exporting everything to GitHub. The username field is simply used to generate the title for the webpage. Once you click export, the files for your website will be generated and uploaded to GitHub for your viewing pleasure.

## FAQ

### Where can I report issues or request features?

The source code for this application is available publicly at [`https://github.com/ampossardt/artisan-trade-list-generator`](https://github.com/ampossardt/artisan-trade-list-generator). If you run into an issue with generation, notice something doesn't look right, or simply would like to see some new feature implemented, go to the 'Issues' tab at the top of that page and open up an issue.

### Help, my website shows 404 when I go to it! (Or) my website didn't update when I made new changes!

GitHub recognizes when new files are sent to this specifically-named repository, but it still needs to do some work to make it accessible. You should generally see changes within 30 seconds of either creating a brand-new site, or making edits and redeploying to your existing site.

### 60kb max file size for images? What gives?

Images you add during the creation process are read as `Data URIs`, which is basically a textual-representation of the image. I'd like to keep file sizes reasonable when uploading all of this data to GitHub. If you disagree, or can think of a legitimate reason to increase the size limit, I am open to suggestions and you are free to [file an issue](https://github.com/ampossardt/artisan-trade-list-generator/issues) on the official repository.

I recommend keeping your images to a max size of 400px by 400px (width is most important here).

If decreasing the size is still not enough, there are a number of resources for 'minifying' images via compression:

* PNG - [https://tinypng.com](https://tinypng.com)
* JPG - [https://tinyjpg.com](https://tinyjpg.com)

A potential future improvement I can see being popular would be to implement this directly into image upload so that the user experience is seamless and doesn't require 'prepping' images for the site. If you'd like to see this feature, please go to the Github repository [issues section](https://github.com/ampossardt/artisan-trade-list-generator/issues) and either open an issue or vote on an existing issue.

### But your own site isn't mobile friendly! It's 2019 for god's sake!

The nature of this site doesn't translate well to mobile. I'm not sure there would be enough mobile use to justify making sure it functioned and displayed properly, however if you disagree, feel free to open up an issue about it.