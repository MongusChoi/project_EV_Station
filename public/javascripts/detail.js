let dataTable = document.getElementById('tb');
let statNameNode = document.getElementById('stationName');
let statAddrNode = document.getElementById('stationAddr');
let chargerType = document.getElementById('chrgerType');
let useTime = document.getElementById('useTime');

statNameNode.innerHTML = data[0].statNm[0];
statAddrNode.innerHTML = data[0].addrDoro[0];
chargerType.innerHTML = returnChargerType(data[0].chgerType[0]);
useTime.innerHTML = returnUseTime();

data.forEach((item, index) => {
    let row = dataTable.insertRow(dataTable.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `충전기 ${index} (${returnChargerType(item.chgerType[0])})  `;
    cell2.innerHTML = returnState(item);
});

console.log(data);

function returnChargerType(chargerType) {
    switch(chargerType){
        case '01':
                return 'DC 차데모';
            case '03':
                 return 'DC 차데모 + AC3상';
            case '04':
                return 'DC 콤보';
            case '05':
            case '06':
                return 'DC 차데모 + AC3상 + DC 콤보';
            default:
                return '정보 없음';
    }
}

function returnUseTime() {
    if(data[0].useTime === undefined) return '정보 없음';
    else return data[0].useTime[0];
}

function returnState(item) {
    switch(item.stat[0]) {
        case '1':
            return '통신 이상';
        case '2':
            return '충전 대기';
        case '3':
            return '충전 중';
        case '4':
            return '운영 중지';
        case '5':
            return '점검 중';
    }
}