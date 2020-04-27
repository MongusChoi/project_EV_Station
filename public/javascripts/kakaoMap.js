let curLatitude = 37.5665734;
let curLongitude = 126.978179;
let currentMarker = null;
let stationMarkers = [];

let container = document.getElementById('map');
let options = {
    center: new kakao.maps.LatLng(curLatitude, curLongitude),
    level: 3
};
let stationArr = data;
let map = new kakao.maps.Map(container, options);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 충전소 마커 최초 생성
if(stationMarkers.length === 0) {
    initStationMarkers();
}

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
    // 현재 표시된 마커가 있을 땐 마커를 지도에서 지우고 마커 객체를 비움
    if(currentMarker !== null) {
        currentMarker.setMap(null);
        currentMarker = null;
    }
    // 마커 생성
    currentMarker = new kakao.maps.Marker({
        position: position
        });
    // 마커를 지도에 표시
    currentMarker.setMap(map);
}

// station 마커 최초 생성
function initStationMarkers(){
    stationArr.forEach((item) => {
        // 마커의 좌표객체 생성
        let markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        // 마커 객체 생성
        let marker = new kakao.maps.Marker({
            position : markerPosition,
            clickable : true,                // 마커의 클릭 이벤트 설정
            image : markerImage
        });
        marker.setMap(map);
        stationMarkers.push(marker);         // 마커를 컨트롤 할 수 있는 배열에 객체 삽입
        // 인포 윈도우 컨텐츠
        let iwContent = `
        <div style="padding:5px;">
            충전소 이름 : ${item.statNm}<br>
            충전소 주소 : ${item.statAddr}<br>
            충전기 타입 : ${item.chargerType}<br>
            운영 시간 : ${item.useTime}<br>
        </div>
        `;
        // 인포 윈도우 객체 생성
        let infoWindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : true        // x로 인포 윈도우를 닫을 수 있는지?
        });
        // 마커의 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
        });
    });
}

//마커의 가시성 설정
function setVisibleMarker(visibility) {
    let tempMap = (visibility ? map : null);
    stationMarkers.forEach((marker) => {
        marker.setMap(tempMap);
    })
}