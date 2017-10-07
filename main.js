const COST_SINGLE_PEOPLE = 15;
const TIME_NEW_PEOPLE = 180; //seconds

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
}

function Portion (resourse, last) {
  this.resourse = Number(resourse);
  this.last = last || false;
}

Portion.prototype.getMaxPeople = function() {
  let people = this.resourse / COST_SINGLE_PEOPLE;
  
  return this.last ? Math.ceil(people) : Math.floor(people);
}

Portion.prototype.getMaxTime = function() {
  return TIME_NEW_PEOPLE * this.getMaxPeople();
}

function getMaxEating(portion) {
  let portionEating = [];
  portionEating[0]= portion[0].getMaxPeople() * portion[1].getMaxTime() / 3600;
  portionEating[1]= portion[1].getMaxPeople() * portion[0].getMaxTime()  / 3600;

  return portionEating;
}

function $submit() {
  let cntCity = document.profit.cities.value;
  let storage = document.profit.storage.value;
  let minPeopleForNextCity = cntCity * cntCity * 100;
  let portion = [];
  let minResourceForPeopleForNextCity = minPeopleForNextCity * COST_SINGLE_PEOPLE;
  let differencePeople = null;
  let a = null;
  
  if (!isNumeric(storage)){
    document.getElementById("help").style.display = "block";
    document.getElementById("storage").style.borderColor = 'red';
    return null;
  }
  
  document.getElementById("help").style.display = 'none';
  document.getElementById("storage").style.borderColor = 'gainsboro';

  if (minResourceForPeopleForNextCity > storage) {
    differencePeople = minResourceForPeopleForNextCity - storage;
    portion[0] = new Portion(storage);
    //portion[0] = storage;
    portion[1] = new Portion(differencePeople, true);
    
    let a = getMaxEating(portion);
    
    let result;
    result = "За время, пока будет создаваться маленькая кучка, большая скушает: " + a[0] + "(За " + (portion[1].getMaxTime() / 3600) +" часов),<br>а малеькая, за время, пока будет создаваться большя кучка, скушает: " + a[1] + "(За " + (portion[0].getMaxTime() / 3600) +" часов)";
    
    return document.getElementById("result").innerHTML = '<p>' + result + '</p>';
    
  } else {
    let result = document.getElementById("result").innerHTML = "<p>Тебе выгоднее строить с первого раза</p>";
//    return result;
  }
      console.log(portion, a);
}

// Из кол-ва поселенцев и времени можно высчитать кол-во потребления еды
// Что выгоднее? большое потребление и мало времени ИЛИ маленькое потребление и много времени