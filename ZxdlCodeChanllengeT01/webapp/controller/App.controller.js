sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.customer.codeChanllenge.t01.controller.App", {

		onInit: function(){
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			
		},
		onRouteMatched: function(oEvent){
			var sRouteName = oEvent.getParameter("name");
			var oArguments = oEvent.getParameter("arguments");
			
			this.currentRouteName = sRouteName;
			this.currentIndex = oArguments.sIndex;
		},
		onStateChanged: function(oEvent){
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
			var sLayout = oEvent.getParameter("layout");
			
			if(bIsNavigationArrow){
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, sIndex: this.currentIndex}, true);
			}
		},
		onExit: function(){
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		}
	});
});