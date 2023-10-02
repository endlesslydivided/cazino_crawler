const axios = require("axios"); 
const cheerio = require("cheerio"); 

const urlToVisit = 'https://casino.verajohn.com';
const hrefToVisit = '/en/all-games';

const allGamesUrl = urlToVisit + hrefToVisit;

function getBaseUrl() {
    return (window.location.hostname === "localhost") ? '' : '/fragment/gamefilter';
}

async function nextGamesPage(buttonElement, path, max, size,count,token) {

	const response = await fetch(`${getBaseUrl()}/ajax/${path}&size=${size}&offset=${count}`, {
		headers: { Authorization: `Bearer ${meta.content}` }
	});

	if (response.ok) {
		if (response.status === 204) {
			buttonElement.classList.add("gff-game-pagination-button--hidden");
		}
	}

	return await response.text();
}


async function main() { 

	let retrievedData = []; 
	const pageHTML = await axios.get(allGamesUrl); 
	const page$ = cheerio.load(pageHTML.data); 

	const token = page$('meta[http-equiv=Authorization]').attr('content');

	const categoriesPagesToVisit = [];

	page$("a.gff-game-list__header__view-all").each((index, element) => { 
		const allCategoryGamesURL = page$(element).attr("href"); 

		if (allCategoryGamesURL) { 
			categoriesPagesToVisit.push(allCategoryGamesURL); 
		} 
	}); 

	for(let i = 0;i < categoriesPagesToVisit.length - 1; i++)
	{
		const slug = categoriesPagesToVisit[i];
		const categoryPageHTML = await axios.get(urlToVisit + slug); 
		const category$ = cheerio.load(categoryPageHTML.data); 

		const categoryName = category$(".gff-game-grid__title").text();

		const paginationClickValue = category$('.gff-game-pagination-button').attr('onclick');

		if(paginationClickValue)
		{
			const loadMoreParams = paginationClickValue.match(/^(\(|\,)\s?\w+$/);
		}

		const games = [];

		category$("game-tile").each((index, element) => { 

			const iconURL = category$(element).attr("icon-url"); 
			const name = category$(element).attr('display-name');
			
			games.push({
				iconURL,
				name
			})
		}); 



		retrievedData = [...retrievedData,{
			categoryName,
			slug,
			games
		}]
	}



	return retrievedData;

} 
 
main() 
	.then((result) => { 
		console.log(JSON.stringify(result,0,null));
		process.exit(0); 
	}) 
	.catch((e) => { 
		// logging the error message 
		console.error(e); 
 
		// unsuccessful ending 
		process.exit(1); 
	});