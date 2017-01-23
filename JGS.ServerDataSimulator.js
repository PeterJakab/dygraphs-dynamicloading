(function (JGS, $, undefined) {
  "use strict";
  /**
   @class ServerDataSimulator
   @constructor
   */
  JGS.ServerDataSimulator = function (seriesName, minDelay, maxDelay) {
    this.seriesName = seriesName;

    this.onServerDataLoadCallbacks = $.Callbacks();
  };

  JGS.ServerDataSimulator.prototype.loadData = function (dataLoadReq) {
    console.log("loadData", dataLoadReq);

    // add timestamp to the request (instead of a string date representation)
    dataLoadReq.startDate = dataLoadReq.startDateTm.getTime();
    dataLoadReq.endDate = dataLoadReq.endDateTm.getTime();

	$.ajax({
		url: "ajax.php",
		type: "POST",
		dataType: "json",
		async: false,
		data: dataLoadReq,
        success: function(dataPoints) {
		    if (dataPoints) {
               console.log('response: '); console.log(dataPoints);
               setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 0.001); // TODO remove
		       // this doesn't work // this._onDataLoad(dataLoadReq, dataPoints);
		    }
        }
     });

    //Random delay for "_onDataLoad" callback to simulate loading data from real server
    // setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 0.001); // TODO remove
  };

  JGS.ServerDataSimulator.prototype._onDataLoad = function (dataLoadReq, dataPoints) {
    var dataLoadResp = {
      dataPoints: dataPoints
    };
    this.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
  };


}(window.JGS = window.JGS || {}, jQuery));
