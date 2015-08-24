/*
 * Host View controller
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HostViewCtrl',['$scope','$state','$ionicPopup','$stateParams','$ionicLoading','DatabaseService','UtilService','RequestService','Chart',
function($scope,$state,$ionicPopup,$stateParams,$ionicLoading,DatabaseService,UtilService,RequestService,Chart){

	$scope.id = $stateParams.id;
	$scope.model = {}; 
	$scope.result = undefined;

	$scope.load = function(){
		DatabaseService.get($scope.id,function(item){
			$scope.model = item;

			if(item.execution !== undefined){
				$scope.result = item.execution;			
				$scope.chard();
			}
		});
	};
	
	$scope.parse = UtilService.parseStorage;

	$scope.edit = function(){
		$state.go('app.hostEdit',{id:$scope.id});
	};

	$scope.getTime = function(timeStamp){
		return new Date(timeStamp).toGMTString();
	};

	$scope.getTimeSegs = function(segs){
		return UtilService.getTimeFromSegs(segs);
	};

	$scope.execute = function(){

		var target = $scope.model.target;
		var user = $scope.model.credentials.user || '';
		var password = $scope.model.credentials.password || '';

		$ionicLoading.show({
			template:'Making request...'
		});

		RequestService.execute(target,user,password)
		.then(function(result){
			
			//save execution 
			DatabaseService.saveExecution($scope.id,result);

			$scope.result = result;
			$scope.chard();

			//hide loading modal
			$ionicLoading.hide();
		},function(error){
			$ionicPopup.alert({
		       title: 'Error',
		       template: JSON.stringify(error)
			});

			$ionicLoading.hide();
		});
	};

	$scope.delete = function(id){
	    var confirmPopup = $ionicPopup.confirm({
	       title: 'Delete Host',
	       template: 'Are you sure you want to delete this host?'
	    });

	    confirmPopup.then(function(res) {
	        if(res) {
	       		DatabaseService.removeHost(id,function(){
		           	$ionicPopup.alert({
				       title: 'Info',
				       template: 'Host deleted'
	  			    });
		           	$state.go('app.host');
	       		});
	        }
	    });
	};
	
	$scope.chard = function(){
		
		var data = [];

		data.push({
			value: $scope.result.monit.free_mem,
			label:'Free Memory (' + $scope.parse($scope.result.monit.free_mem).label + ')',
			color:'#46BFBD',
			highlight: UtilService.highlight('#46BFBD'),
		});

		var restMemory = $scope.result.monit.total_mem - $scope.result.monit.free_mem;

		for(var i=0;i<$scope.result.processes.length;i++){

			var item = $scope.result.processes[i];
			var itemColor = UtilService.getColor(Math.ceil( ( Math.random() * 435)));

			data.push({
				value: item.monit.memory,
				label:item.name + '( ' + $scope.parse( item.monit.memory ).label + ' )',
				color:itemColor,
				highlight: UtilService.highlight(itemColor),
			});			

			restMemory = restMemory - item.monit.memory;
		}

		data.push({
			value: restMemory,
			label:'Other Process (' + $scope.parse(restMemory).label + ' ) ',
			color:'#EE9A49', 
			highlight: UtilService.highlight('#EE9A49'),
		});

		var options = {

		    // Whether we should show a stroke on each segment
		    segmentShowStroke : true,
		
		    // The colour of each segment stroke
		    segmentStrokeColor : '#fff',
		
		    // The width of each segment stroke
		    segmentStrokeWidth : 2,
		
		    // The percentage of the chart that we cut out of the middle
		    percentageInnerCutout : 50, // This is 0 for Pie charts

			// Whether we animate the rotation of the Doughnut
		    animateRotate : false,

		    // Whether we animate scaling the Doughnut from the centre
		    animateScale : false,

		    // A legend template
		    legendTemplate : '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%>'+
			    					'<li><span style=\"background-color:<%=segments[i].fillColor%>\">'+
			    						'</span><%if(segments[i].label){%><%=segments[i].label%><%}%>'+
			    					'</li><%}%>'+
		    					'</ul>',

		    // Template string for single tooltips
    		tooltipTemplate: '<%if (label){%><%=label%><%}%>',
		};
		
		var helpers = Chart.helpers;
		var canvas = document.getElementById('memoryChart');
		var ctx = canvas.getContext('2d');
		
		var memoryChart = new Chart(ctx).Doughnut(data,options);
		
		var legendHolder = document.getElementById('legent_container');
		
		legendHolder.innerHTML = memoryChart.generateLegend();

		helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
			helpers.addEvent(legendNode, 'click', function(){
		
				var activeSegment = memoryChart.segments[index];
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				memoryChart.showTooltip([activeSegment]);
				activeSegment.restore();
			});
		});
	};
}]);