		if (! window.OfflineAudioContext) {
			if (! window.webkitOfflineAudioContext) {
				$('#output').append('Votre navigateur ne supporte pas la conversion. Merci d\'utiliser Chrome pour plus de simplicite');
			}
			window.OfflineAudioContext = window.webkitOfflineAudioContext;
		}
		
		processor = context.createScriptProcessor(fftSamples, 1, 1);
		processor.connect(context.destination);

		analyser = context.createAnalyser();
		analyser.smoothingTimeConstant = 0;
		analyser.fftSize = fftSamples;

		source = context.createBufferSource();
		splitter = context.createChannelSplitter();
		source.connect(splitter);
		splitter.connect(analyser,0,0);

		analyser.connect(processor);

		context.oncomplete = function(){
			$('#output').html('Waveform creee!').delay(2000).css({"opacity":"0"});
		}

		var request = new XMLHttpRequest();
		request.open('GET', "musique/"+ myData +"", true);
		request.responseType = 'arraybuffer';
		request.onload = function(){
			$('#output').append('<br />Waveform en cours de creation! ');
			context.decodeAudioData(request.response, function(buffer) {
				$('#output').append('...<br />');
				processor.onaudioprocess = function(e){
					var data =  new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteFrequencyData(data);
					average = getAverageVolume(data);
					max = Math.max.apply(Math, data);
					coord = Math.min(average*1.3,255);
					coord = Math.round((max+coord)/2);

					soundArr.push(coord); // on insere coord dans un tableau 
					
					// si i-1=i, alors on enleve la valeur, et on met sur undefined
					if (soundArr[i - 1] == soundArr[i])
						 soundArr.splice(soundArr[i],1);
					if(typeof soundArr[i] === 'undefined')
						console.log('undefined value');
					else{
						console.log('Sound Intensity: '+coord+' // '+i);
						var crea = '<div class="res" style="display: inline-block; margin-left: 2px; width: 2px; height:'+ (soundArr[i]/2) +'px; background: white; vertical-align: bottom"></div>';
						$('.wrapper').append(crea);
					}
					i++;
					$('.readyState').animate({opacity: 1},1500).html('PrÃªt Ã  jouer: '+myData);
					console.log('return Width-> '+$('.wrapper').width());
						return soundArr;
				} // end onaudioprocess	
				
				source.buffer = buffer;
				source.start(0);
				context.startRendering();
			}, onError);
		} // end onload
		request.send();
		function onError(e) {
			$('#output').append('<br>Verifier votre fichier, une erreur existe :(');
			console.log(e);
		}
		function getAverageVolume(array) {
			var values = 0;
			var average;
			var length = array.length;
			for (var k = 0; k < length; k++)
				values += array[k];
			
			average = values / length;
			return average;
		}
