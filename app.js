function Upload(evt){
  var f = evt.target.files[0]; 
  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
        var contents = e.target.result;
        document.getElementById('textdata1').innerHTML=contents;
      }
    r.readAsText(f);
  }
}
document.getElementById('fileinput').addEventListener('change', Upload);

function Convert(){
  let json=document.getElementById("textdata1").value;
      var lines=json.split("\n");
      var result = [];
      var headers = lines[0].split(",");
    
      for(var i=1; i<lines.length; i++) {
        var obj = {};
    
        var row = lines[i],
          queryIdx = 0,
          startValueIdx = 0,
          idx = 0;
    
        if (row.trim() === '') { continue; }
    
        while (idx < row.length) {
          var c = row[idx];
    
          if (c === '"') {
            do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
          }
    
          if (c === ',' ||idx === row.length - 1) {
            var value = row.substr(startValueIdx, idx - startValueIdx).trim();
            if (value[0] === '"') { value = value.substr(1); }
            if (value[value.length - 1] === ',') { 
              value = value.substr(0, value.length - 1); 
            }
            if (value[value.length - 1] === '"') { 
              value = value.substr(0, value.length - 1);
            }
            var key = headers[queryIdx++];
            obj[key] = value;
            startValueIdx = idx + 1;
          }
          ++idx;
        }
          result.push(obj);
      }
      document.getElementById('textdata2').innerHTML=JSON.stringify(result,null,1);
    }