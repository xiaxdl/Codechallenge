sap.ui.define(["sap/ui/core/Control"], function(Control) {
	"use strict";
	return Control.extend("sap.customer.codeChanllenge.t01.control.CustomChatList", {
		"metadata": {
			"properties": {},
			"events": {},
			"aggregations":{
				"items":{
					"type":"sap.customer.codeChanllenge.t01.control.CustomChatListItem",
					"multiple":true,
					"singularName":"item"
				}
			}
		},
		init: function() {},
		renderer: function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("customlist");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("<ul");
			oRm.write(">");
			$.each(oControl.getItems(),function(key,value){
				oRm.renderControl(value);
			});
			oRm.write("</ul>");
			oRm.write("</div>");
		},
		onAfterRendering: function(evt) {}
	});
});