var civil = require('./index')();

civil.run_micro(25, 100, function(items){
  console.log(items);
});
