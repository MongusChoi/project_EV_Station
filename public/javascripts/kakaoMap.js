let curLatitude;// = 37.5665734;
let curLongitude;// = 126.978179;
let currentMarker = null;
let dcChademos = [];
let dcCombos = [];
let ac3s = [];
let stationOverlays = [];
let map, zoomControl;

initMap();

// if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition ((pos) => {
//         curLatitude = pos.coords.latitude;
//         curLongitude = pos.coords.longitude;
//     });
// } else {
//     console.log('geolocation 사용 불가');
// }

// let container = document.getElementById('map');
// let options = {
//     center: new kakao.maps.LatLng(curLatitude, curLongitude),
//     level: 3
// };
// let stationArr = data;
// let map = new kakao.maps.Map(container, options);

// // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
// let zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// // 충전소 마커 최초 생성
// if(dcChademos.length === 0 && dcCombos.length === 0 && ac3s.length === 0) {
//     initStationMarkers();
// }

async function initMap() {
    let position = await getLocation();
    let container = document.getElementById('map');
    let options = {
        center: position,
        level: 3
    };
    //let stationArr = await data;
    map = new kakao.maps.Map(container, options);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setCurMarker(position);
}

function getLocation(){
    return new Promise(async (resolve, reject) => {
        try{
            await initGeoLocation();
            return resolve(new kakao.maps.LatLng(curLatitude, curLongitude));
        } catch(err) {
            return reject(err);
        }
    })
}

function initGeoLocation(){
    return new Promise((resolve, reject) => {
        try{
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition ((pos) => {
                    console.log(pos);
                    curLatitude = pos.coords.latitude;
                    curLongitude = pos.coords.longitude;
                    return resolve();
                });
            } else {
                return reject(console.log('geolocation 사용불가'));
            }
        } catch(err) {
            return reject(err);
        }
    });
}

// 지도의 커스텀 컨트롤 클릭 이벤트
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
    stationArr.forEach((item, index) => {
        // 마커의 좌표객체 생성
        let markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let textChargerType;
        // 마커 객체 생성
        let marker = new kakao.maps.Marker({
            position : markerPosition,
            clickable : true,                // 마커의 클릭 이벤트 설정
            image : markerImage
        });
        marker.setMap(map);
        // 충전기 커넥터 타입에 따른 네이밍 분류 및 배열 추가
        switch(item.chargerType) {
            case '01':
                textChargerType = 'DC 차데모';
                dcChademos.push(marker);
                break;
            case '03':
                textChargerType = 'DC 차데모 + AC3상';
                dcChademos.push(marker);
                ac3s.push(marker);
                break;
            case '04':
                textChargerType = 'DC 콤보';
                dcCombos.push(marker);
                break;
            case '05':
            case '06':
                textChargerType = 'DC 차데모 + AC3상 + DC 콤보';
                dcChademos.push(marker);
                ac3s.push(marker);
                dcCombos.push(marker);
                break;
            default:
                textChargerType = '정보 없음';
                console.log('이름 : ' + item.statNm + ' 타입 : ' + item.chargerType);
                break;
        }
        // 커스텀 오버레이의 컨텐츠
        let content = `
<style>
.wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}
</style>
<div class="wrap">
    <div class="info">
        <div class="title">
            ${item.statNm}
            <div class="close" onclick="closeOverlay(${index})" title="닫기"></div>
        </div>
        <div class="body">
            <div class="desc">
                <div class="ellipsis">${item.statAddr}</div>
                <div class="ellipsis">${textChargerType}</div>
                <div class="jibun ellipsis">${item.useTime}</div>
                <div><a href="/Map/detail?id=${item.statID}"> 더 보기</a></div>
            </div>
        </div>
    </div>
</div>
        `;
        // 커스텀 오버레이 생성
        let overlay = new kakao.maps.CustomOverlay({
            content : content,
            map : map,
            position : marker.getPosition()
        });
        stationOverlays.push(overlay);
        // 마커의 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
            history.pushState({}, '', `?id=${item.statID}`);
            overlay.setMap(map);
            map.panTo(marker.getPosition());        // 마커 클릭 시 클릭한 위치를 중심으로 지도 이동
        });
        overlay.setMap(null);       // 오버레이의 기본설정은 나오지 않게 설정
    });
}

// //마커의 가시성 설정
// function setVisibleMarker(visibility) {
//     let tempMap = (visibility ? map : null);
//     stationMarkers.forEach((marker) => {
//         marker.setMap(tempMap);
//     })
// }

// 커스텀 오버레이 가시성 설정
function closeOverlay(overlayIndex) {
    stationOverlays[overlayIndex].setMap(null);
}