module.exports = function CDis(){
  var Decimal = require('decimal');
  var cdis = {};

  cdis.numberOfItems = 100;
  cdis.runningTotal = 0;
  cdis.targetValue = 161;
  cdis.items = [];

  var random = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  };

  var round = function(value, decimals){
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  };


  cdis.calculate = function(){
    cdis.items = [];
    cdis.runningTotal = 0;
    for(var i = 0; i < cdis.numberOfItems; i++){
      var dollar = random(1, Math.floor(cdis.targetValue / cdis.numberOfItems));
      var cents = random(1, 99) * 0.01;
      var ammount = Decimal(dollar).add(Decimal(cents)).toNumber();
      cdis.items.push(ammount);
    }

    var difference = Decimal(cdis.targetValue).sub(cdis.calcuteRunningTotal()).toNumber();
    console.log("difference", difference);

    var diffSplit = round(difference / cdis.numberOfItems, 2);

    for(var i = 0; i < cdis.items.length; i++){
      cdis.items[i] = Decimal(cdis.items[i]).add(diffSplit).toNumber();
    }

    var finalDifference = Decimal(cdis.targetValue).sub(cdis.calcuteRunningTotal()).toNumber();
    console.log("FINAL", finalDifference, cdis.items.join(" "));

    if(finalDifference < 0) {
      console.log("LESS THAN ZERO");
      cdis.items[0] = Decimal(cdis.items[0]).add(finalDifference).toNumber();

    } else if(finalDifference > 0){
      cdis.items[0] = Decimal(cdis.items[0]).add(finalDifference).toNumber();
    }
    return cdis.items;

  };

  cdis.calcAlt = function(){
    cdis.runningTotal = 0;
    cdis.items = [];

    for(var i = 0; i < cdis.numberOfItems; i++){
      var item = 0;
      var dollar = random(1, Math.floor(cdis.targetValue / cdis.numberOfItems) );
      var cents = random(1, 99) * 0.01;

        item = Decimal(dollar).add(Decimal(cents)).toNumber();
        cdis.items.push(item);
      /*
        var runningTotal = cdis.calcuteRunningTotal();
        var difference = Decimal(cdis.targetValue).sub(runningTotal).toNumber();
        cdis.items.push(difference);
      */
    }
    var runningTotal = cdis.calcuteRunningTotal();
    var difference = Decimal(cdis.targetValue).sub(runningTotal).toNumber();
    var diffSplit = round(difference / cdis.numberOfItems, 2);
    for(var i = 0; i < cdis.numberOfItems; i++){
      if(i !== cdis.numberOfItems - 1){
        cdis.items[i] = Decimal(cdis.items[i]).add(diffSplit).toNumber();
      } else {
        var runningTotal = cdis.calcuteRunningTotal();
        var difference = Decimal(cdis.targetValue).sub(runningTotal).toNumber();
        if(isNaN(difference)){
          difference = Decimal(runningTotal).sub(cdis.targetValue).toNumber();
          cdis.items[i] = Decimal(cdis.items[i]).sub(difference).toNumber();
        } else {
          cdis.items[i] = Decimal(cdis.items[i]).add(difference).toNumber();
        }
      }
    }

    console.log(cdis.items.join(" "), cdis.calcuteRunningTotal());
  };

  cdis.calcuteRunningTotal = function(){
    var total = 0;
    for(var item in cdis.items){
      item = cdis.items[item];
      total = Decimal(total).add(item).toNumber();
    }
    //console.log(cdis.items, total);
    return total;
  };

  cdis.run_micro = function(numberOfItems, targetValue, callback){
    callback = callback || function(){};
    cdis.numberOfItems = numberOfItems;
    cdis.targetValue = targetValue;
    callback(cdis.calculate());
  };


  return cdis;
};
