let curLatitude = 37.5665734;
let curLongitude = 126.978179;

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
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

$('#curPos').click(function(){
    navigator.geolocation.getCurrentPosition ((pos) => {
        console.log('sucess');
    }, (error) => {
        console.log(error.message);
        curLatitude = pos.coords.latitude;
        curLongitude = pos.coords.longitude;
    });
    let moveLatLon = new kakao.maps.LatLng(curLatitude, curLongitude);
    map.panTo(moveLatLon);
    console.log('latitude : ' + curLatitude + ' , longitutde : ' + curLongitude);
})
