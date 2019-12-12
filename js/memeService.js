
let gMeme;
let gImgOnCanvas;
let gLastX, gLastY;
let gCtx;
let gWidth;
let gHeight;
let gCanvas;
let gMemeCurrTxts;

window.onresize = function () {
    gCanvas.style.width = '70%';;
}


function setVars() {
    gMemeCurrTxts = gMeme.txts[gMeme.selectedTxtIdx];
}

function moveLine(diff) {
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    let lineMaxHeight = gCtx.measureText('M').width;
    let boundTop = lineMaxHeight + 10;
    let boundBot = gHeight - lineMaxHeight + 20;
    let yPos = gMemeCurrTxts.y;
    if (yPos > boundTop && diff < 0) gMemeCurrTxts.y += diff
    else if (yPos < boundBot && diff > 0) gMemeCurrTxts.y += diff

}

function addLine() {
    gMeme.selectedTxtIdx = gMeme.txts.length;
    let texts = gMeme.txts;
    texts.push({ line: 'input text here', font: 'impact', size: 40, align: 'left', strokecolor: 'black', fillcolor: 'white', x: 25, y: gHeight / 2 });
}

function removeLine() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
}

function setLine(diff) {

    let lineIdx = gMeme.selectedTxtIdx;
    if (lineIdx + diff < gMeme.txts.length && lineIdx + diff >= 0) {
        gMeme.selectedTxtIdx += diff;
    }

}

function alignText(num) {
    let lineText = gMeme.txts[gMeme.selectedTxtIdx].line;
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    let lineWidth = gCtx.measureText(lineText).width;



    if (num === -1) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'left';
        gMeme.txts[gMeme.selectedTxtIdx].x = (gWidth * 5) / 100;
    }

    if (num === 0) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'center';
        gMeme.txts[gMeme.selectedTxtIdx].x = (gWidth - lineWidth) / 2;
    }
    if (num === 1) {
        gMeme.txts[gMeme.selectedTxtIdx].align = 'right';
        gMeme.txts[gMeme.selectedTxtIdx].x = gWidth - ((gWidth * 5) / 100) - lineWidth;
    }
}

function setFontSize(diff) {
    gMemeCurrTxts = gMeme.txts[gMeme.selectedTxtIdx];
    gMemeCurrTxts.size += diff;
}
function setCanvas(ctx, canvas) {
    gCtx = ctx;
    gCanvas = canvas;
    gCanvas.style.width = '85%'
}

function setMeme(imgId) {
    let meme = gMemes.find(function (meme) {
        return +(imgId) === +(meme.selectedImgId);
    })
    return gMeme = meme;
}

function setMemeImg() {
    let memeImage = getImgById(gMeme.selectedImgId);
    if (gImgOnCanvas != undefined && gImgOnCanvas.src === memeImage.url) {
        gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
        showText();
    } else {
        gImgOnCanvas = new Image()
        gImgOnCanvas.src = memeImage.url;
        gImgOnCanvas.onload = () => {
            gHeight = gImgOnCanvas.height;
            gWidth = gImgOnCanvas.width;
            gCanvas.height = gHeight;
            gCanvas.width = gWidth;
            gCtx.drawImage(gImgOnCanvas, 0, 0, gImgOnCanvas.width, gImgOnCanvas.height);
            setVars();
            showText();

        }
    }
}



function getImgById(imgId) {
    var image = gImgs.find(function (image) {
        return image.id === imgId;
    });
    return image;
}

function getImgIdx(imgId) {
    var index = gImgs.findIndex(function (image) {
        return image.id === imgId;
    });
    return index;
}

function changeFillColor(selFillColor) {
    gMeme.txts[gMeme.selectedTxtIdx].fillcolor = selFillColor;
}

function changeStrokeColor(selStrokeColor) {
    gMeme.txts[gMeme.selectedTxtIdx].strokecolor = selStrokeColor;
}

function drawText(txt, x, y) {
    gCtx.save();
    gCtx.fillStyle = gMeme.txts[gMeme.selectedTxtIdx].fillcolor;
    gCtx.strokeStyle = gMeme.txts[gMeme.selectedTxtIdx].strokecolor;
    gCtx.lineWidth = 2;
    let fontSize = gMeme.txts[gMeme.selectedTxtIdx].size;
    let fontStyle = gMeme.txts[gMeme.selectedTxtIdx].font;
    gCtx.font = fontSize + 'px' + ' ' + fontStyle;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore();
}

function getCurrLine() {
    return gMeme.txts[gMeme.selectedTxtIdx].line;
}


function showText() {
    let texts = gMeme.txts;
    let currSelectedTxt = gMeme.selectedTxtIdx;
    for (var i = 0; i < texts.length; i++) {
        gMeme.selectedTxtIdx = i;
        drawText(texts[i].line, texts[i].x, texts[i].y);
    }
    gMeme.selectedTxtIdx = currSelectedTxt;
}

function updateText(text) {
    let txt = gMeme.txts[gMeme.selectedTxtIdx]
    txt.line = text;
    showText();

}

function updateLineFont(selFont) {
    gMeme.txts[gMeme.selectedTxtIdx].font = selFont;
}



function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'mymeme.jpg'
}