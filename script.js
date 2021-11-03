const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
// var redHatBold = new FontFace('RedHatDisplay', 'url(./RedHatDisplay-Bold.ttf)');

const downloadBtn = document.getElementById('download-btn')

let description = " desctiption of course Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
let names = "Weber Xxxxx Xxxxxxxxxx Dubois"
let course_name = "NFT Minting"
let course_number = "101"
let course_name_number = course_name + " " + course_number

const image = new Image()
image.src = 'certificate.png'
image.onload = function () {
	canvas.width = image.width;
	canvas.height = image.height;
	drawImage()
}

function drawImage() {

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
	ctx.font = 'bolder 80px RedHatDisplay'

	ctx.textAlign = "center"
	ctx.fillText(names, 1550, 580)

	ctx.fillText(course_name, 1550, 750)

	ctx.font = ' 40px RedHatDisplay'
	let descriptionLines = getLines(description, 75);

	descriptionLines.forEach((element, index) => {
		ctx.textAlign = "center"
		ctx.fillText(element, 1600, 850 + (70 * index))

	});

	ctx.font = ' 30px RedHatDisplay'

	ctx.fillText(course_name_number, 1070, 1287)
	const date = new Date()
	ctx.fillText(date.toISOString().split('T')[0], 1010, 1330)

	const a = document.createElement("a");
	document.body.appendChild(a);
	a.href = canvas.toDataURL('image/jpg')
	a.download = names + ".png";
	a.click();
}

function getLines(text, maxWidth) {
	var words = text.split(" ");
	var lines = [];
	var currentLine = words[0];

	for (var i = 1; i < words.length; i++) {
		var word = words[i];
		var width = (currentLine + " " + word).length;

		if (width < maxWidth) {
			currentLine += " " + word;


		} else {
			lines.push(currentLine);
			currentLine = word;
		}

	}
	lines.push(currentLine);

	return lines;
}

