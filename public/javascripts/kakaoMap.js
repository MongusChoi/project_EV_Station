let curLatitude = 37.5665734;
let curLongitude = 126.978179;
let currentMarker = null;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        curLatitude = pos.coords.latitude;
	curLongitude = pos.coords.longitude;
    });
} else {
    console.log('geolocation을 사용할 수 없음.');
}

var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(curLatitude, curLongitude),
    level: 3
};

var map = new kakao.maps.Map(container, options);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
//var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
//map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// custom controll
function setCurLocation() {
    navigator.geolocation.getCurrentPosition ((pos) => {
        console.log('sucess');
    }, (error) => {
        console.log(error.message);
        curLatitude = pos.coords.latitude;
        curLongitude = pos.coords.longitude;
    });
    // 현재 좌표 객체 생성
    let curPosition = new kakao.maps.LatLng(curLatitude, curLongitude);
    setCurMarker(curPosition);
    map.panTo(curPosition);
}

function setCurMarker(position) {
    let imageSrc = 'image/marker.png',  // 마커 이미지 경로
        imageSize = new kakao.maps.Size(32, 34),    // 마커 이미지 사이즈
        imageOption = {offset: new kakao.maps.Point(27, 69)};   // 마커 이미지 옵션, 이미지 안에서의 좌표 설정
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); // 마커의 이미지정보를 가지고 있는 마커이미지를 생성

    // 현재 표시된 마커가 있을 땐 마커를 지도에서 지우고 마커 객체를 비움
    if(currentMarker !== null) {
        currentMarker.setMap(null);
        currentMarker = null;
    }
    // 마커 생성
    currentMarker = new kakao.maps.Marker({
        position: position, 
        image: markerImage // 마커이미지 설정 
        });
    // 마커를 지도에 표시
    currentMarker.setMap(map);
}

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// $('#curPos').click(function(){
//     navigator.geolocation.getCurrentPosition ((pos) => {
//         console.log('sucess');
//     }, (error) => {
//         console.log(error.message);
//         curLatitude = pos.coords.latitude;
//         curLongitude = pos.coords.longitude;
//     });
//     let moveLatLon = new kakao.maps.LatLng(curLatitude, curLongitude);
//     map.panTo(moveLatLon);
//     console.log('latitude : ' + curLatitude + ' , longitutde : ' + curLongitude);
// })
