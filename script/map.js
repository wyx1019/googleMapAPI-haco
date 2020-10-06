function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
            lat: 35.2781915,
            lng: 139.5836735
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false,
        // streetViewControl: false,
    });
    var styleOptions = [{
            "featureType": "all",
            "stylers": [{
                    "hue": '#0077FF'
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 50
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [{
                "hue": '#FFF'
            }, ]
        },
        {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }, ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": '#b3ccc3'
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": '#a0b3bb'
            }]
        },
        {
            "featureType": "poi.school",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": '#dbcada'
            }]
        },

    ];
    setMarkers(map);
    var changeStyleType = new google.maps.StyledMapType(styleOptions);
    map.mapTypes.set('style', changeStyleType);
    map.setMapTypeId('style');
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
    ['一色海岸', 35.2631895, 139.57678, 6], //
    ['しおさい公園', 35.2643151, 139.5778135, 5], //
    ['葉山マリーナ', 35.28296, 139.5687083, 4], //
    ['仙元山', 35.277288, 139.582388, 3], //
    ['HAYAMA STATION', 35.2882356, 139.5956852, 2], //
    ['南郷上ノ山公園', 35.285309, 139.6026852, 1] //
];

var messages = [
    '<div id="infoWindow"><h3>一色海岸</h3><div class="imgInfo"><img src="./img/img06.JPG" alt=""></div><p>葉山を代表する海水浴場のひとつと言えば、日本の海水浴場88選にも選ばれた「一色海岸」です。一色海岸の特徴は、ビーチに砂ではなく、芝生が生えていること。そのため芝生の上にテントを張ったりレジャーシートを広げてピクニックと海水浴の両方を同時に楽しむことが出来ます。また一色海岸の裏手には神奈川県立近代美術館葉山館もあります。</p></div>',
    '<div id="infoWindow"><h3>しおさい公園</h3><div class="imgInfo"><img src="./img/img05.jpg" alt=""></div><p>葉山御用邸付属邸跡地に開設された公園です。大正天皇崩御・昭和天皇皇位継承の地として町の史跡にも指定されている由緒ある和風庭園で、園内には噴井（ふけい）の滝や葉山しおさい博物館などがあります。その名の通り、一色海岸のすぐそばにあることから、波の音を聞きながら紫陽花やツツジなど季節の花々を鑑賞することが出来ます。</p></div>',
    '<div id="infoWindow"><h3>葉山マリーナ</h3><div class="imgInfo"><img src="./img/img04.JPG" alt=""></div><p>地域のランドマークとして愛されている葉山マリーナでは、美しいロケーションの中で自然を満喫しながらクルージングを楽しんだり、レンタルボートでフィッシングや海水浴、船上パーティが出来たりと、マリンライフを存分に味わうことができます。レストランやショップを集めたマリーナプラザも併設されています。</p></div>',
    '<div id="infoWindow"><h3>仙元山</h3><div class="imgInfo"><img src="./img/img03.jpg" alt=""></div><p>葉山は海だけでなく、ハイキングコースが充実した山好きにも人気のエリアです。葉山のほぼ中心を歩く仙元山ハイキングコースは全長約3km。中腹にある見晴らしの丘公園の展望台からの展望が良い。頂上からは葉山の町と海を一望でき、四季折々の景色を楽しむことができます。</p></div>',
    '<div id="infoWindow"><h3>HAYAMA STATION</h3><div class="imgInfo"><img src="./img/img02.jpg" alt=""></div><p>食べる・買う・憩うの3つが叶う新たな観光拠点として、2016年にオープンしたばかりの新しいスポットです。中でも食品は地元・葉山がテーマの品が中心となったラインナップで、葉山ロールや葉山レモンチーズケーキ、葉山牛、葉山しらす、葉山蛸、葉山ひじきクッキーなど、葉山のグルメを食べたりお土産に買ったりすることが出来ます。</p></div>',
    '<div id="infoWindow"><h3>南郷上ノ山公園</h3><div class="imgInfo"><img src="./img/img01.JPG" alt=""></div><p>山に囲まれた緑豊かな公園です。公園内は「野球場」「テニスコート」、250メートルトラックを擁する「多目的グランド」があり、スポーツも楽しむことができます。きれいな芝生があるので、キャッチボールやピクニックにぴったりの公園です。また、ドッグヤードもあるので愛犬も家族と一緒に遊びに来ることができます。</p></div>'
];

function setMarkers(map) {
    var image = {
        url: "./img/icon_location.png",
        size: new google.maps.Size(30, 30),
    };
    var shape = {
        coords: [4, 4, 1, 10, 16, 28, 29, 10, 26, 4],
        type: 'poly'
    };
    for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        var marker = new google.maps.Marker({
            position: {
                lat: beach[1],
                lng: beach[2]
            },
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
        });
        attachMessage(marker, messages[i]);
    }
};


// const iwCloseBtn = document.getElementsByClassName('.gm-ui-hover-effect');
// // iwCloseBtn.classList.remove("gm-ui-hover-effect");
// iwCloseBtn.classList.add("closebtn")
// iwCloseBtn.removeChild(img);
// iwCloseBtn.innerHTML('<i class="far fa-times-circle" aria-hidden="true"></i>');


function attachMessage(marker, message) {
    var infowindow = new google.maps.InfoWindow({
        content: message
    });
    marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
        // const windowOpen = document.querySelector('infoWindow');
        // windowOpen.animate({
        //     opacity: [0, 1]
        // }, 1500)
    });
};

$(function () {
    marker.each(function () {
        $(this).click(function () {
            $('.gm-style-iw').fadeIn();
        });
    });

    $('.gm-ui-hover-effect').click(function () {
        $('.gm-style-iw').fadeOut();
    });
});