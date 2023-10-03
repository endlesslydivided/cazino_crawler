const axios = require("axios"); 
const cheerio = require("cheerio"); 
const fs = require("fs"); 
const path = require("path"); 

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

	for(let i = 0;i < categoriesPagesToVisit.length - 1; i++){
		const slug = categoriesPagesToVisit[i];
		const categoryPageHTML = await axios.get(urlToVisit + slug); 
		const category$ = cheerio.load(categoryPageHTML.data); 

		const categoryName = category$(".gff-game-grid__title").text();

		const games = [];

		category$("game-tile").each((index, element) => { 

			const iconURL = category$(element).attr("icon-url"); 
			const name = category$(element).attr('display-name');
			
			games.push({
				iconURL,
				name
			})
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
		
						const iconURL = extraGames$(element).attr("icon-url"); 
						const name = extraGames$(element).attr('display-name');
						
						games.push({
							iconURL,
							name
						})
					});
				}		
			}while(extraGamesHTML)
		}

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
		console.log(jsonString);

		fs.writeFileSync('../../casinoData.json',jsonString,() =>{})

		process.exit(0); 
	}) 
	.catch((e) => { 
		console.error(e); 

		process.exit(1); 
	});
