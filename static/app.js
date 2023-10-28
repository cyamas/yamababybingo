const rows = 5;
const cols = 5;

const gameItems = [
    {
        "name": "INFANT LOUNGER",
        "img": "static/gameImages/lounger.png",
        "link": "https://snugglemeorganic.com/products/infant-lounger-gingerbread"

    },
    {
        "name": "HIGHLAND COO ONESIE",
        "img": "static/gameImages/highlandCoo.png",
        "link": "https://milkbarnkids.com/product/highland-cow-bamboo-short-sleeve-one-piece/"
    },
    {
        "name": "BLACK AND TAN MOCCASIN",
        "img": "static/gameImages/blackTanMocc.png",
        "link": "https://birdrockbaby.com/collections/fringeless-moccasins/products/black-and-tan-fringeless-moccasins?variant=12536620056654"
    },
    {
        "name": "UPPABABY MINU V2 STROLLER",
        "img": "static/gameImages/stroller.png",
        "link": "https://www.babylist.com/gp/uppababy-minu-v2-stroller/25173/1158319?is_group_gift=true&reg_item_id=472468524&registry_id=7596939"
    },
    {
        "name": "FRIDABABY SOFT SINK BABY BATH",
        "img": "static/gameImages/babyBath.png",
        "link": "https://www.babylist.com/gp/fridababy-soft-sink-baby-bath/22930/923581?reg_item_id=472464751&registry_id=7596939"
    },
    {
        "name": "LOULOU SILICONE BIB",
        "img": "static/gameImages/bib.png",
        "link": "https://www.amazon.com/dp/B087KVBYXG?psc=1&tag=babyli-20&th=1"
    },
    {
        "name": "GRACO PACK N' PLAY PLAYARD",
        "img": "static/gameImages/playard.png",
        "link": "https://www.babylist.com/gp/graco-pack-n-play-portable-playard/15345/1111850?reg_item_id=473068041&registry_id=7596939"
    },
    {
        "name": "STOKKE TRIP TRAP HIGH CHAIR",
        "img": "static/gameImages/highchair.png",
        "link": "https://www.babylist.com/gp/stokke-tripp-trapp-highchair/14772/455819?is_group_gift=true&reg_item_id=472021790&registry_id=7596939"
    },
    {
        "name": "OMNI 360 BABY CARRIER",
        "img": "static/gameImages/babyBackpack.png",
        "link": "https://www.babylist.com/gp/ergobaby-omni-360-baby-carrier/13423/20735?reg_item_id=472015176&registry_id=7596939"
    },
    {
        "name": "NUNA RAVA CONVERTIBLE CARSEAT",
        "img": "static/gameImages/carseat.png",
        "link": "https://www.babylist.com/gp/nuna-2019-rava-convertible-car-seat/14782/121425?is_group_gift=true&reg_item_id=472013357&registry_id=7596939"
    },
    {
        "name": "LIFE AQUATIC BUCKET HAT",
        "img": "static/gameImages/bucketHat.png",
        "link": "https://pehr.com/collections/clothing/products/bucket-hat?variant=39853583892568"
    },
    {
        "name": "AVANCHY FEEDING SET",
        "img": "static/gameImages/feedingSet.png",
        "link": "https://www.babylist.com/gp/avanchy-avanchy-x-babylist-bamboo-complete-feeding-gift-set/25649/1192317?reg_item_id=472015536&registry_id=7596939"
    },
    {
        "name": "TWO-PIECE SNUGGLE SET",
        "img": "static/gameImages/twoPieceJogger.png",
        "link": "https://coloredorganics.com/products/organic-baby-2-piece-snuggle-set?variant=39757673824352"
    },
    {
        "name": "DEKOR DIAPER PAIL IN SOFT MINT",
        "img": "static/gameImages/diaperCan.png",
        "link": "https://www.amazon.com/dp/B01JZD32PW?psc=1&tag=blvisitor-20&th=1"
    },
    {
        "name": "BABYLETTO CHANGING TRAY",
        "img": "static/gameImages/changingTray.png",
        "link": "https://babyletto.com/collections/dressers/products/universal-removable-changing-tray?variant=8835241738294"
    },
    {
        "name": "BABYLETTO CHANGING PAD",
        "img": "static/gameImages/changingPad.png",
        "link": "https://babyletto.com/collections/dressers/products/pure-31-inch-contour-changing-pad?variant=39412482408502"
    },
    {
        "name": "BABYLETTO CHANGING COVER: TERRACOTTA",
        "img": "static/gameImages/padCoverTerracotta.png",
        "link": "https://babyletto.com/collections/changing-pad-covers/products/quilted-changing-pad-cover-in-gots-certified-organic-muslin-cotton?variant=40560021635126"
    },
    {
        "name": "LOULOU TEETHER RATTLE",
        "img": "static/gameImages/loulouTeether.png",
        "link": "https://www.babylist.com/gp/loulou-lollipop-bubble-silicone-wood-teether/13757/30245?reg_item_id=472019202&registry_id=7596939"
    },
    {
        "name": "JACK CARDIGAN",
        "img": "static/gameImages/jackCardigan.png",
        "link": "https://jamiekay.com/products/jack-cardigan-soft-lake-marle?variant=40370270961745",
        "size": "130px"
    },
    {
        "name": "GINGERSNAP MOCCASINS",
        "img": "static/gameImages/gingersnapMoccs.png",
        "link": "https://birdrockbaby.com/collections/fringeless-moccasins/products/gingersnap-fringeless-sherpa-moccasins?variant=43569872273628"
    },
    {
        "name": "KIMONO OUTFIT BUNDLE",
        "img": "static/gameImages/kimonoBundle.png",
        "link": "https://coloredorganics.com/products/organic-cotton-baby-meadow-ribbed-outfit-set?variant=39632366731360"
    },
    {
        "name": "JACK MODAL SLING",
        "img": "static/gameImages/jackModalSling.png",
        "link": "https://wildbird.co/products/jack-modal-sling?irclickid=W05QqQ3PUxyPRjuydqQVyUGPUkFTU4wpw0BXRE0&utm_source=impact&utm_medium=affiliate&utm_campaign=BabyList%20Inc&utm_content=65668&utm_term=&irgwc=1"
    },
    {
        "name": "BABYLETTO CHANGING COVER: OAT STRIPE",
        "img": "static/gameImages/padCoverOatStripe.png",
        "link": "https://babyletto.com/collections/changing-pad-covers/products/quilted-changing-pad-cover-in-gots-certified-organic-muslin-cotton?variant=40560200876086"
    },
    {
        "name": "SOLLY BABY WRAP CARRIER",
        "img": "static/gameImages/wrapCarrier.png",
        "link": "https://www.babylist.com/gp/solly-baby-wrap-carrier/14574/1163903?reg_item_id=472018793&registry_id=7596939"
    },
    {
        "name": "BURT'S BEES BURP CLOTHS",
        "img": "static/gameImages/burpCloths.png",
        "link": "https://www.babylist.com/gp/burt-s-bees-baby-organic-burp-cloth-5-pack/14442/1268943?reg_item_id=465390662&registry_id=7596939"
    },
    {
        "name": "TRIP TRAP FEEDING TRAY",
        "img": "static/gameImages/feedingTray.png",
        "link": "https://www.babylist.com/gp/stokke-tray/14549/31544?reg_item_id=472022295&registry_id=7596939"
    },
    {
        "name": "BURT'S BEES ONESIES: 5-PACK",
        "img": "static/gameImages/onesiesFivePack.png",
        "link": "https://www.babylist.com/gp/burt-s-bees-baby-organic-short-sleeve-bodysuit-5-pack/14427/30958?reg_item_id=473083436&registry_id=7596939"
    },
    {
        "name": "BALLOON ONESIE",
        "img": "static/gameImages/balloonOnesie.png",
        "link": "https://milkbarnkids.com/product/vintage-balloons-organic-cotton-short-sleeve-one-piece/"
    },
    {
        "name": "DEER AND FOX LEGGINGS",
        "img": "static/gameImages/deerFoxLeggings.png",
        "link": "https://www.winterwaterfactory.com/collections/baby-leggings/products/baby-leggings-deer-foxes-dark-green?variant=42831395848363&sscid=a1k7_gj5n3&"
    },
    {
        "name": "CLASSIC SHORT-SLEEVE ONESIE 3 PACK",
        "img": "static/gameImages/classicshortOnesieThreePack.png",
        "link": "https://coloredorganics.com/products/3-pack-classic-short-sleeve-bodysuits?variant=39476811759712"
    },
    {
        "name": "HOODIE AND PANT SET",
        "img": "static/gameImages/hoodiePantsSet.png",
        "link": "https://coloredorganics.com/products/organic-cotton-baby-and-kids-aw23-hoodie-and-pant-set?variant=39757673037920"
    },
    {
        "name": "KIMONO GOWN IN HARBOR",
        "img": "static/gameImages/kimonoGown.png",
        "link": "https://coloredorganics.com/collections/baby-0-to-24-months/products/organic-cotton-baby-layette-indy-kimono-gown-95005-23?variant=39755874861152"
    },
    {
        "name": "CAR BABY MIRROR",
        "img": "static/gameImages/mirror.png",
        "link": "https://www.babylist.com/gp/brica-360-baby-in-sight-pivot-mirror/21458/697850?reg_item_id=472768340&registry_id=7596939"
    },
    {
        "name": "DRAGONS LOVE TACOS",
        "img": "static/gameImages/dragonsLoveTacos.png",
        "link": "https://www.babylist.com/gp/ingram-dragons-love-tacos/14115/23214?reg_item_id=473403512&registry_id=7596939"
    },
    {
        "name": "BOWIE MUSLIN ROMPER",
        "img": "static/gameImages/bubbleRomper.png",
        "link": "https://coloredorganics.com/collections/organic-baby-rompers/products/organic-cotton-baby-meadow-bowie-muslin-bubble-romper-31200-22?variant=39629088325728"
    },
    {
        "name": "LOVABLE SLEEPER SET",
        "img": "static/gameImages/lovableSleeperSet.png",
        "link": "https://coloredorganics.com/collections/organic-baby-sleepers/products/lovable-sleeper-set?variant=39412329381984"
    },
    {
        "name": "CRUZ JOGGER PANTS",
        "img": "static/gameImages/joggerPants.png",
        "link": "https://coloredorganics.com/collections/organic-baby-and-kids-joggers-and-sweatpants/products/organic-baby-and-kids-classic-cruz-jogger-85801-18?variant=19877490786400"
    },
    {
        "name": "SENECA APPLES LEGGINGS",
        "img": "static/gameImages/applesLeggings.png",
        "link": "https://jamiekay.com/products/organic-cotton-legging-apples-seneca-rock?variant=40370294915153"
    },
    {
        "name": "HATCHLING BUNNY KIMONO",
        "img": "static/gameImages/bunnyKimono.png",
        "link": "https://pehr.com/collections/clothing/products/3-piece-set?variant=33713055989848"
    },
    {
        "name": "TURTLE ONESIE",
        "img": "static/gameImages/turtleOnesie.png",
        "link": "https://pehr.com/collections/clothing/products/classic-one-piece?variant=40216269389912"
    },
    {
        "name": "ELEPHANT ONESIE",
        "img": "static/gameImages/elephantOnesie.png",
        "link": "https://pehr.com/collections/clothing/products/short-sleeve-shoulder-snap-one-piece?variant=39879043219544"
    },
    {
        "name": "MOO, BAA, LA LA LA!",
        "img": "static/gameImages/mooBaaLaLaLa.png",
        "link": "https://bookshop.org/p/books/moo-baa-la-la-la-sandra-boynton/10359066?ean=9780671449018&sscid=a1k7_gk76i&utm_source=ShareASale&utm_medium=Affiliate&utm_campaign=389818&utm_term=1535322"
    },
    {
        "name": "PENGUIN TEETHER",
        "img": "/static/gameImages/penguinTeether.png",
        "link":"https://weegallery.com/collections/teethers/products/organic-teether-penguin"
    },
    {
        "name": "SHORT SLEEVE ONESIES 5-PACK",
        "img": "/static/gameImages/shortSleeveOnesiesFivePack.png",
        "link":"https://www.babylist.com/gp/burt-s-bees-baby-organic-short-sleeve-bodysuit-5-pack/14427/30951?reg_item_id=473083281&registry_id=7596939"
    }

]

//Requests new bingo item every second
setInterval(getItem, 1000);


//Generates 5x5 square bingo game board
//idx is an array of integers that correlate to a specific bingo item image to be displayed on each player's board
//xes is an array of 0's and 1's indicating if a bingo square has been selected by the player or not
function displayBoard(idx, xes) {

    const board = document.getElementById("board");
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = i.toString();
        square.innerText += 'X';
        square.style.justifyContent = 'center';
        square.style.alignItems = 'center';
        square.style.textAlign = 'center';
        square.style.fontFamily = 'Gill Sans';
        square.style.fontSize = '130px';
        square.style.padding = 'none';
        square.style.backgroundImage = 'url(../' + gameItems[idx[i]]["img"] + ')';
        square.style.backgroundPosition = 'center';
        square.style.backgroundRepeat = 'no-repeat';
        square.onclick = function() {postX(square)};

        if(xes[i] === 0) {
            square.style.color = 'transparent';
        }
        else{
            square.style.color = 'red';
        }
        
        board.append(square)
    }

    return
}

//marks or unmarks a bingo square with a red x when clicked and sends to flask server to be updated in session data
function postX(square) {
    if (square.style.color === 'red') {
        square.style.color = 'transparent';
        $.ajax({
            type: "POST",
            url: "{{ url_for('play') }}",
            data: {'id': square.id, 'x': 0}
        })
    } else {
        square.style.color = 'red';
        $.ajax({
            type: "POST",
            url: "{{ url_for('play') }}",
            data: {'id': square.id, 'x': 1}
        })
    }
    return
}

function toggleForm(elem) {
    elem.style.display = 'flex';
    return
}


function startGame() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('game-selections').style.display = "block";

    return
}

//requests the current item and previous item pulled during the round
function getItem() {
    console.log('this works');
    $.get("/game", function(data, elem) {
        $("#selected").css("background-image", "url(../" + gameItems[data[0]]["img"] + ")");
        $("#registry").css("background-image", "url(../" + gameItems[data[1]]["img"] + ")");
        console.log(data);
    })
    return
}



function connectPlayer() {
    const socket = io({autoconnect: false});
    socket.connect()
    return
}

