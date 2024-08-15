<script>
    var checkboxinputs = document.querySelectorAll(".checklist-progressbar input[type='checkbox']");
    var progressbar = document.querySelector('.checklist-progressbar .progressbar-inner');
    var progressbarvalue = document.querySelector('.checklist-progressbar .progressbar-value');
    var progresspercentageNum = 0;
    var progresspercentage = "0%";

    for ( var i = 0, len = checkboxinputs.length; i < len; i++ ) {
    
        var box = checkboxinputs[i];
        if (box.hasAttribute("id")) {
            setupLocalStorage(box);
        }
        
        checkboxinputs[i].addEventListener('click', function(e) {    
            checkNumberofChecked();
            updateProgressbar();
        });
    };
    
    function checkNumberofChecked() {
        var checkedboxes = 0;
        for ( var i = 0, len = checkboxinputs.length; i < len; i++ ) {
            if (checkboxinputs[i].checked) {
            checkedboxes++;
            }; 
        };
        progresspercentageNum = ((checkedboxes / checkboxinputs.length) * 100);
        progresspercentage = ((checkedboxes / checkboxinputs.length) * 100) + "%";
    };
    
    function updateProgressbar() {
        if (progresspercentageNum < 100) {
            progressbar.style.backgroundColor = "blue";
        }
        else {
            progressbar.style.backgroundColor = "green";
        };
        progressbar.style.width = progresspercentage;
        progressbarvalue.innerHTML = Math.round(progresspercentageNum) + "%";
    };
    
    function setupLocalStorage(box) {
        var storageId = box.getAttribute("id");
        var oldVal    = localStorage.getItem(storageId);
        
        if (oldVal == "true") {
            box.checked = true;
        } else {
            box.checked = false;
        };     
        
        box.addEventListener("change", function() {
            localStorage.setItem(storageId, this.checked);
            console.log(this);
    
            fetch(url="https://webhook.site/32b310fc-ac36-4220-b405-65d11928f8d8", {
                method: "POST",
                body: JSON.stringify({"id": this.id, "checked": this.checked})
            })
        });
    };
    
    checkNumberofChecked();
    updateProgressbar();
</script>
