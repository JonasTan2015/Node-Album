var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope) {
    
    
});

app.directive('upload', function () {
        function link(scope,element,attr){
            
			
			
            scope.fileNameChanged=function(files){
				var formData=new FormData();
				for (var i = 0; i < files.length; i++) {
					var file = files[i];

				    // add the files to formData object for the data payload
				    formData.append('uploads[]', file, file.name);
				}
				
				
				var xhr = new XMLHttpRequest();
				var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBob3RvVVJMcyI6Im1vZGlmeSIsIl9pZCI6ImRlZmF1bHQiLCJlbWFpbCI6Im1vZGlmeSIsInBhc3N3b3JkIjoibW9kaWZ5In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7Il9pZCI6dHJ1ZX0sImluaXQiOnt9LCJtb2RpZnkiOnsiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJwaG90b1VSTHMiOnRydWV9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6dHJ1ZSwiX2RvYyI6eyJwaG90b1VSTHMiOltdLCJfaWQiOiI1ODZhYzhkMjMyMjlhNjI0YTQ3ZTJmZGIiLCJlbWFpbCI6IjEyM0A0NTYuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF0sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbbnVsbF0sIiRfX29yaWdpbmFsX3JlbW92ZSI6W251bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W10sIiRfX29yaWdpbmFsX3JlbW92ZSI6W119LCJpYXQiOjE0ODMzOTMyMzR9.9iqZ8l8L7Z1ZWRlulC6ttcI3Pj9j_63LTp08WVlGKXM';
				
				xhr.upload.addEventListener('progress', function(evt) {
				  if (evt.lengthComputable) {
					// calculate the percentage of upload completed
					var percentComplete = evt.loaded / evt.total;
					percentComplete = parseInt(percentComplete * 100);

					// update the Bootstrap progress bar with the new percentage
					$('.progress-bar').text(percentComplete + '%');
					$('.progress-bar').width(percentComplete + '%');

					// once the upload reaches 100%, set the progress bar text to done
					if (percentComplete === 100) {
					  $('.progress-bar').html('Done');
					}

				  }

				}, false);
				xhr.open('POST','/upload');
				xhr.setRequestHeader('authorization',token);
				xhr.send(formData);
			}
            
			
        }
        return {
            restrict:'AE',
            scope:{},
            templateUrl: 'template.html',
            link:link
        };
    });
	
	
app.directive('interactiveBtn',function($window){
	function link(scope,element,attributes){
		/*element.bind('mouseenter',function(){
			//element[0].innerHTML="mouseenter";
			console.log(element.context.childNodes);
			//element.context.childNodes[0].bind()
		});
		element.bind('mouseleave',function(){
			//element[0].innerHTML="mouseleave";
		});
		
		element.bind()
		/*element.context.childNodes[0].bind('onchange',function(){
			var 
			console.log("File selected");
		});*/

			/*scope.onProgress=function(progressEvent){
			if(progressEvent.lengthComputable){
				var percentComplete = progressEvent.loaded / progressEvent.total;
				percentComplete = parseInt(percentComplete * 100);
			}
			$('.progress-bar').text(percentComplete + '%');
			$('.progress-bar').width(percentComplete + '%');

			// once the upload reaches 100%, set the progress bar text to done
			if (percentComplete === 100) {
					$('.progress-bar').html('Done');
			}
		};*/
		var formData;		
		scope.onFileSelected=function(files){
			formData=new FormData();
			//console.log(files);
			for(var i=0;i<files.length;i++){
				formData.append('uploads[]', files[i], files[i].name);
			}
		};
		
		scope.onUpload=function(){
			
			if(!formData){$window.alert("Please select at least 1 file");}
			else{
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.addEventListener("progress",function(evt) {
				  if (evt.lengthComputable) {
					// calculate the percentage of upload completed
					var percentComplete = evt.loaded / evt.total;
					percentComplete = parseInt(percentComplete * 100);

					// update the Bootstrap progress bar with the new percentage
					$('.progress-bar').text(percentComplete + '%');
					$('.progress-bar').width(percentComplete + '%');

					// once the upload reaches 100%, set the progress bar text to done
					if (percentComplete === 100) {
					  $('.progress-bar').html('Done');
					}

				  }

				},false);
				
				xmlhttp.onreadystatechange = function()
				{
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
					{
						console.log(xmlhttp.responseText); // Another callback here
						$('.progress-bar').text('0%');
						$('.progress-bar').width('0%');
						var input=$('#upload-input');
						input.replaceWith(input.val('').clone(true));
						
						
					}
				};
				
				
				xmlhttp.open('POST','/upload');
				xmlhttp.send(formData);
			}
			
		};		
	}
	return{
		restrict:"A",
		scope:{},
		//template:'<input type="file" name="uploads[]" multiple="multiple"  onchange="angular.element(this).scope().onFileSelected(this.files)"><div class="progress"><div class="progress-bar" role="progressbar"></div></div><br/><a class="btn btn-default" onclick="angular.element(this).scope().onUpload()">Upload</a>',
		templateUrl:'template2.html',
		link:link,
	};
});	
	
	
	
	
	
	
	
	
	
	
	
	