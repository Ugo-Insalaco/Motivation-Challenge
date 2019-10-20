var phone_data = [];
var phone0 = {nom : "Huawei P20", 
				prix : "325 €",
				dimension : "149.1 x 70.8 x 7.65 mm",
				poids : "165 g",
				diagonale_ecran : "5.8 pouces",
				definition_ecran : "2240 x 1080",
				DPI : "460",
				part_ecran : "80.81 %",
				processeur : "ARM Cortex-A72 et A73 - 2.36 GHz",
				nombre_coeurs : "8",
				RAM : "4 Go",
				memoire_interne : "128 Go",
				batterie : "3400 mAh",
				img_url : "images/tel1.jpg",
				buy_url : "https://www.amazon.fr/Huawei-P20-Smartphone-d%C3%A9bloqu%C3%A9-pouces/dp/B07BHDC33K?psc=1&SubscriptionId=AKIAJ2BX7QG7HCSMLDQA&tag=lmdn-api-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07BHDC33K"}

var phone1 = {nom : "Samsung Galaxy S10", 
				prix : "671.98 €",
				dimension : "149.9 x 70.4 x 7.8 mm",
				poids : "157 g",
				diagonale_ecran : "6.1 pouces",
				definition_ecran : "3040 x 1440",
				DPI : "550",
				part_ecran : "88.43 %",
				processeur : "4x Cortex-A55 + 2x Cortex A75 + 2x Custom - 2.73 GHz",
				nombre_coeurs : "8",
				RAM : "8 Go",
				memoire_interne : "128 Go",
				batterie : "3400 mAh",
				img_url : "images/tel2.png",
				buy_url : "https://www.amazon.fr/Samsung-Galaxy-S10-Smartphone-Europ%C3%A9enne/dp/B07NWYXXKQ?psc=1&SubscriptionId=AKIAJ2BX7QG7HCSMLDQA&tag=lmdn-api-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07NWYXXKQ"}

var phone2 = {nom : "iPhone 11 Pro", 
				prix : "1129 €",
				dimension : "144 x 71.4 x 8.1 mm",
				poids : "188 g",
				diagonale_ecran : "5.8 pouces",
				definition_ecran : "2436 x 1125",
				DPI : "458",
				part_ecran : "80.74 %",
				processeur : "2 x Lightning + 4 x Thunder - 2.65 GHz",
				nombre_coeurs : "6",
				RAM : "4 Go",
				memoire_interne : "512 Go",
				batterie : "3190 mAh",
				img_url : "images/tel3.png",
				buy_url : "https://www.amazon.fr/Apple-iPhone-11-Pro-64-Go/dp/B07XRRNS63?psc=1&SubscriptionId=AKIAJ2BX7QG7HCSMLDQA&tag=lmdn-api-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B07XRRNS63"}

phone_data.push(phone0);
phone_data.push(phone1);
phone_data.push(phone2);


$(document).ready(function(){
	load_data("1")
});

function load_data(phone_index){
	$(".active").removeClass("active")
	$("#" + phone_index).addClass("active");
	$("#phones").addClass("active");

	var phone = phone_data[phone_index - 1];
	$("#nom").html(phone['nom']);
	$("#prix").html("Prix : " + phone['prix']);
	$("#dimension").html("Dimension : " + phone['dimension']);
	$("#poids").html("Poids : " + phone['poids']);
	$("#diagonale_ecran").html("Diagonale d'écran : " + phone['diagonale_ecran']);
	$("#definition_ecran").html("Définition d'écran : " + phone['definition_ecran']);
	$("#DPI").html("DPI : " + phone['DPI']);
	$("#part_ecran").html("Part de l’écran en surface : " + phone['part_ecran']);
	$("#processeur").html("Processeur : " + phone['processeur']);
	$("#nombre_coeurs").html("Nombre de coeurs : " + phone['nombre_coeurs']);
	$("#RAM").html("Mémoire vive (RAM) : " + phone['RAM']);
	$("#memoire_interne").html("Mémoire interne : " + phone['memoire_interne']);
	$("#batterie").html("Capacité de la batterie : " + phone['batterie']);
	$("#phone_img").attr("src", phone["img_url"]);
	$("#buy_url").attr("href", phone["buy_url"]);



};