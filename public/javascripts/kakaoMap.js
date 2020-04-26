let curLatitude = 37.5665734;
let curLongitude = 126.978179;
let currentMarker = null;
let stationMarkers = [];

var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(curLatitude, curLongitude),
    level: 3
};

var map = new kakao.maps.Map(container, options);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// // 충전소 마커 최초 생성
// if(stationMarkers.length === 0) {
//     initStationMarkers();
// }

// custom controll
function setCurLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition ((pos) => {
            curLatitude = pos.coords.latitude;
            curLongitude = pos.coords.longitude;
        });
    } else {
        console.log('geolocation 사용 불가');
    }
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

// station 마커 최초 생성
function initStationMarkers(){
    mapArr.forEach((item) => {
        let markerPosition = new kakao.maps.LatLng(item.dataValues.lat, item.dataValues.lng);
        let marker = new kakao.maps.Marker({
            position : markerPosition
        });
        marker.setMap(map);
        stationMarkers.push(marker);
    });
}

//마커의 가시성 설정
function setVisibleMarker(visibility) {
    let tempMap = (visibility ? map : null);
    stationMarkers.forEach((marker) => {
        marker.setMap(tempMap);
    })
}