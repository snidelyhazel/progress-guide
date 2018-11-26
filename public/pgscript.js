var inputs = document.querySelectorAll('input, textarea');
for(var i=0;i<inputs.length;i++) {
  inputs[i].addEventListener('blur', function(){
    if(!this.checkValidity()) {
      this.classList.add('has-error');
    } else {
      this.classList.remove('has-error');
    }
  });
}

document.getElementById("is-in-group").addEventListener("change", function() {
  document.getElementById("progressive-group-row").style.display = (this.value == "yes") ? "" : "none";
})

document.getElementById("is-in-union").addEventListener("change", function() {
  document.getElementById("union-row").style.display = (this.value == "yes") ? "" : "none";
})
