const axios = require("axios"); 
const cheerio = require("cheerio"); 
const fs = require("fs"); 

const urlToVisit = 'https://casino.verajohn.com';
const hrefToVisit = '/en/all-games';

const allGamesUrl = urlToVisit + hrefToVisit;


async function nextGamesPage(path, max,size,count,token) {

	const baseUrl = '/fragment/gamefilter';
	const response = await fetch(`${urlToVisit}${baseUrl}/ajax/${path}&size=${size}&offset=${count}`, {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (response.ok) {
		if (response.status === 204 || (max > 0 && count >= max)) {
			return null;
		}
	}

	return await response.text();
}

const getGameData = (element) => {
	return{
		iconURL: element.attr("icon-url"),
		name:element.attr('display-name'),
	}
}

const retrieveGames = async () => {

	const slug = categoriesPagesToVisit[i];
	const categoryPageHTML = await axios.get(urlToVisit + slug); 
	const category$ = cheerio.load(categoryPageHTML.data); 

	const token = page$('meta[http-equiv=Authorization]').attr('content');

	const categoryName = category$(".gff-game-grid__title").text();

	const games = [];

	category$("game-tile").each((index, element) => { 
		games.push(getGameData( category$$(element)));
	});

	const paginationClickValue = category$('.gff-game-pagination-button').attr('onclick');

	if(paginationClickValue){

		let extraGamesHTML = null;
		do{
			const loadMoreParamsString = paginationClickValue.match(/(\(|\,)\s?(\d|\w|\W)+/)[0];
			const params = loadMoreParamsString.replace(/[()']|\s/g,'').split(',');

			extraGamesHTML = await nextGamesPage(params[2],params[3],params[4],games.length,token);

			if(extraGamesHTML){
				const extraGames$ = cheerio.load(extraGamesHTML); 

				extraGames$("game-tile").each((index, element) => { 
					games.push(getGameData( extraGames$(element)));
				});
			}		
		}while(extraGamesHTML)
	}

	return {slug,categoryName,games}
}
const retrieveCategories = async () =>{
	const pageHTML = await axios.get(allGamesUrl); 
	const page$ = cheerio.load(pageHTML.data); 

	const categoriesPagesURLs = [];

	page$("a.gff-game-list__header__view-all").each((index, element) => { 
		const allCategoryGamesURL = page$(element).attr("href"); 

		if (allCategoryGamesURL) { 
			categoriesPagesURLs.push(allCategoryGamesURL); 
		} 
	});
	
	return categoriesPagesURLs;
}


const main = async () => { 

	let retrievedData = []; 
	const categoriesPagesToVisit = retrieveCategories();

	for(let i = 0;i < categoriesPagesToVisit.length - 1; i++){
		const {slug,games,categoryName} = await retrieveGames();

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

		const jsonString = JSON.stringify(result,null,2);

		fs.writeFileSync('../../casinoData.json',jsonString,() =>{})

		process.exit(0); 
	}) 
	.catch((e) => { 
		console.error(e); 

		process.exit(1); 
	});
